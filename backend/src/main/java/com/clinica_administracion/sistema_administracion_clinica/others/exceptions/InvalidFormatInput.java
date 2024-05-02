package com.clinica_administracion.sistema_administracion_clinica.others.exceptions;

public class InvalidFormatInput extends RuntimeException {
  public InvalidFormatInput(String fieldName, Object stringValue, String expected) {
    super(String.format(
      "El campo %s tiene un formato no válido. '%s' debería tener el formato: %s",
      fieldName, stringValue, expected
    ));
  }
}
