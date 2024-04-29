package com.clinica_administracion.sistema_administracion_clinica.DTOs;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConsultorioDTO {
  private UUID id;
  private Integer numeroConsultorio;
}
