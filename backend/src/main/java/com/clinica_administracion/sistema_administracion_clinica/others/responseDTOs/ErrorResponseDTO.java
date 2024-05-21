package com.clinica_administracion.sistema_administracion_clinica.others.responseDTOs;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ErrorResponseDTO extends ResponseDTO {
  private MessagesDTO message;
}
