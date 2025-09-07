package com.clinica_administracion.sistema_administracion_clinica.others.exceptions;

// @ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFound extends RuntimeException{
  public ResourceNotFound(String objectName, String fieldname, String fieldValue) {
    super("El/la %s con el %s ingresado no se ha encontrado. Valor ingresado: %s".formatted(objectName, fieldname, fieldValue));
  }
}
