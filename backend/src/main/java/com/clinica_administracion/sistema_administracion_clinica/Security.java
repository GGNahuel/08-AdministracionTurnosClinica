package com.clinica_administracion.sistema_administracion_clinica;

import java.io.IOException;
import java.util.function.Supplier;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.security.web.csrf.CsrfTokenRequestHandler;
import org.springframework.security.web.csrf.XorCsrfTokenRequestAttributeHandler;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.clinica_administracion.sistema_administracion_clinica.others.CustomAuthEntryPoint;
import com.clinica_administracion.sistema_administracion_clinica.others.UtilitiesMethods;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class Security {
  @Bean
  SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      .authorizeHttpRequests(
        (authorize) -> authorize
        //.requestMatchers("/api/admin/**").hasAnyRole("ADMIN")
          .requestMatchers(HttpMethod.GET).permitAll()
          .requestMatchers("/logincheck", "/api/user").permitAll()
          .requestMatchers("/api/turno/search").permitAll()
          .requestMatchers("/api/**").authenticated()
          .anyRequest().permitAll()
      )
      .csrf(csrf -> csrf
        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
        .csrfTokenRequestHandler(new SpaCsrfTokenRequestHandler())
      )
      .addFilterAfter(new CsrfCookieFilter(), BasicAuthenticationFilter.class)
      .formLogin(
        (form) -> form
          .loginProcessingUrl("/logincheck")
          .usernameParameter("username")
          .passwordParameter("contrasena")
          .successHandler((request, response, authentication) -> {
            response.setStatus(HttpServletResponse.SC_OK);
          })
          .permitAll()
      )
      .logout(
        (logout) -> logout
          .logoutUrl("/logout")
          .logoutSuccessHandler((request, response, asd) -> {
            response.setStatus(HttpServletResponse.SC_OK);
          })
          .permitAll()
      )
      .rememberMe(
        (remember) -> remember
          .key(UtilitiesMethods.generateKey(16))
          .tokenValiditySeconds(43200)
      )
      .exceptionHandling(
        exceptionHandling -> exceptionHandling
          .authenticationEntryPoint(new CustomAuthEntryPoint())
      );
    return http.build();
  }

  @Bean
  BCryptPasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}

// font: Official spring security docs reference https://docs.spring.io/spring-security/reference/servlet/exploits/csrf.html
final class SpaCsrfTokenRequestHandler extends CsrfTokenRequestAttributeHandler {
	private final CsrfTokenRequestHandler delegate = new XorCsrfTokenRequestAttributeHandler();

  @Override
	public void handle(HttpServletRequest request, HttpServletResponse response, Supplier<CsrfToken> csrfToken) {
		/*
		 * Always use XorCsrfTokenRequestAttributeHandler to provide BREACH protection of
		 * the CsrfToken when it is rendered in the response body.
		 */
		this.delegate.handle(request, response, csrfToken);
	}

	@Override
	public String resolveCsrfTokenValue(HttpServletRequest request, CsrfToken csrfToken) {
		/*
		 * If the request contains a request header, use CsrfTokenRequestAttributeHandler
		 * to resolve the CsrfToken. This applies when a single-page application includes
		 * the header value automatically, which was obtained via a cookie containing the
		 * raw CsrfToken.
		 */
		if (StringUtils.hasText(request.getHeader(csrfToken.getHeaderName()))) {
			return super.resolveCsrfTokenValue(request, csrfToken);
		}
		/*
		 * In all other cases (e.g. if the request contains a request parameter), use
		 * XorCsrfTokenRequestAttributeHandler to resolve the CsrfToken. This applies
		 * when a server-side rendered form includes the _csrf request parameter as a
		 * hidden input.
		 */
		return this.delegate.resolveCsrfTokenValue(request, csrfToken);
	}
}

final class CsrfCookieFilter extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		CsrfToken csrfToken = (CsrfToken) request.getAttribute("_csrf");
		// Render the token value to a cookie by causing the deferred token to be loaded
		csrfToken.getToken();

		filterChain.doFilter(request, response);
	}
}