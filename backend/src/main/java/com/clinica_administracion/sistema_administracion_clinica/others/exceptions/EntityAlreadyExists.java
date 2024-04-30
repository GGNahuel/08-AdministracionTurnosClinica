package com.clinica_administracion.sistema_administracion_clinica.others.exceptions;

import lombok.Getter;

// @ResponseStatus(value = HttpStatus.BAD_REQUEST)
@Getter
public class EntityAlreadyExists extends RuntimeException {
  private Object existingEntity;

  public EntityAlreadyExists(String message, Object entity) {
    super(message);
    this.existingEntity = entity;
  }
}
