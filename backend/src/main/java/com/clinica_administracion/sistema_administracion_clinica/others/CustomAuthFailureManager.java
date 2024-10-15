package com.clinica_administracion.sistema_administracion_clinica.others;

import java.io.IOException;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import com.clinica_administracion.sistema_administracion_clinica.others.enums.MessageTypes;
import com.clinica_administracion.sistema_administracion_clinica.others.responseDTOs.MessageResponseDTO;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomAuthFailureManager implements AuthenticationFailureHandler {
  @Override
  public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,AuthenticationException exception) 
  throws IOException, ServletException {
    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");

    MessageResponseDTO responseDTO = new MessageResponseDTO();
    responseDTO.setMessage(UtilitiesMethods.messageCreator(exception.getMessage(), MessageTypes.error));

    response.getWriter().write(new ObjectMapper().writeValueAsString(responseDTO));;
    response.getWriter().flush();
  }
}
