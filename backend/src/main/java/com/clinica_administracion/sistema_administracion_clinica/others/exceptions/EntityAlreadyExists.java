package com.clinica_administracion.sistema_administracion_clinica.others.exceptions;

// @ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class EntityAlreadyExists extends RuntimeException {
  public EntityAlreadyExists(String message) {
    super(message);
  }
}
