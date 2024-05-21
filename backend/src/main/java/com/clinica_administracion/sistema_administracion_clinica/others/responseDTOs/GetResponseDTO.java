package com.clinica_administracion.sistema_administracion_clinica.others.responseDTOs;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetResponseDTO extends ResponseDTO {
  private MessagesDTO message;
  private List<?> results;
}