package com.clinica_administracion.sistema_administracion_clinica.others.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE)
public class NotNullFieldIsNull extends RuntimeException{
  public NotNullFieldIsNull(String fieldName) {
    super(String.format("El campo '%s' no puede estar vacío o ser nulo", fieldName));
  }
}
