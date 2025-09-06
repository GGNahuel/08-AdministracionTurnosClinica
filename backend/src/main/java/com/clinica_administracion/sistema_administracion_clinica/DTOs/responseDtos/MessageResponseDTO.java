package com.clinica_administracion.sistema_administracion_clinica.dtos.responseDtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageResponseDTO extends ResponseDTO {
  private MessagesDTO message;
}
