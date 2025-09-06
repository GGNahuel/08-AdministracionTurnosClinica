package com.clinica_administracion.sistema_administracion_clinica.dtos;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConsultorioDTO {
  private UUID id;
  private Integer numeroConsultorio;
}
