package com.clinica_administracion.sistema_administracion_clinica.others.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class EntityAlreadyExists extends RuntimeException {
  // private String message;

  public EntityAlreadyExists(String message) {
    super(message);
  }
}
