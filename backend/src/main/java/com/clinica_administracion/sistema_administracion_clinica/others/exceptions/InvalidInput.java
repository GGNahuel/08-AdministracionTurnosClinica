package com.clinica_administracion.sistema_administracion_clinica.others.exceptions;

public class InvalidInput extends RuntimeException {
  public InvalidInput(String fieldName, Object stringValue, String expected) {
    super("El campo '%s' no es válido. '%s' debería %s".formatted(
            fieldName, stringValue, expected
    ));
  }
  public InvalidInput(String fieldname) {
    super("El campo '" + fieldname + "' no es válido");
  }
}
