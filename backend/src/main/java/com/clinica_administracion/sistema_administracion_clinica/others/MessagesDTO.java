package com.clinica_administracion.sistema_administracion_clinica.others;

import com.clinica_administracion.sistema_administracion_clinica.others.enums.MessageTypes;

import lombok.Data;

@Data
public class MessagesDTO {
  private String text;
  private MessageTypes type;
  private String exceptionCause;
}
