package com.clinica_administracion.sistema_administracion_clinica;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

import com.clinica_administracion.sistema_administracion_clinica.others.UtilitiesMethods;

@Configuration
@EnableWebSecurity
public class Security {
  @Bean
  SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      .csrf(csrf -> csrf
        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
      )
      .authorizeHttpRequests(
        (authorize) -> authorize
          .requestMatchers("/dashboard").hasAnyRole("ADMIN")
          .anyRequest().permitAll()
      )
      .formLogin(
        (form) -> form
          .loginPage("/login")
          .loginProcessingUrl("/logincheck")
          .usernameParameter("username")
          .passwordParameter("contrasena")
          .defaultSuccessUrl("/", true)
          .permitAll()
      )
      .logout(
        (logout) -> logout
          .logoutUrl("/logout")
          .logoutSuccessUrl("/login")
          .permitAll()
      )
      .rememberMe(
        (remember) -> remember
          .key(UtilitiesMethods.generateKey(16))
          .tokenValiditySeconds(43200)
      );
    return http.build();
  }

  @Bean
  BCryptPasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}

