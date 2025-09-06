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
public class AreaDTO {
  private UUID id;
  private String nombre;
  private Boolean active;
  private Boolean necesitaTurno;
}
