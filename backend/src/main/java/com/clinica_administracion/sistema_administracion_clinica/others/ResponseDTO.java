package com.clinica_administracion.sistema_administracion_clinica.others;

import java.util.List;

import lombok.Data;

@Data
public class ResponseDTO {
  private MessagesDTO message;
  private List<Object> results;
  private Object returnValue;
}
