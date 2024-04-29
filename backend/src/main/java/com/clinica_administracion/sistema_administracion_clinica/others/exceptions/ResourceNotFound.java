package com.clinica_administracion.sistema_administracion_clinica.others.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFound extends RuntimeException{
  public ResourceNotFound(String objectName, String fieldname, String fieldValue) {
    super(String.format("El/la %s con el %s ingresado no se ha encontrado. Valor ingresado: %s", objectName, fieldname, fieldValue));
  }
}
