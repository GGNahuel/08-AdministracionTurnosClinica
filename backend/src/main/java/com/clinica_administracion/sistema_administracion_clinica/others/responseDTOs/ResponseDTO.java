package com.clinica_administracion.sistema_administracion_clinica.others.responseDTOs;

import java.util.List;

import lombok.Data;

@Data
public class ResponseDTO {
  private MessagesDTO message;
  private List<?> results;
  private Object returnValue;
}
