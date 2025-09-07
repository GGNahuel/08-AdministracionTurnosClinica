package com.clinica_administracion.sistema_administracion_clinica.others.exceptions;

// @ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE)
public class NotNullFieldIsNull extends RuntimeException{
  public NotNullFieldIsNull(String fieldName) {
    super("El campo '%s' no puede estar vacío o ser nulo".formatted(fieldName));
  }
}
