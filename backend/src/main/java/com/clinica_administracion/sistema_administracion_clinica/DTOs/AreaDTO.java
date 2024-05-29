package com.clinica_administracion.sistema_administracion_clinica.DTOs;

import java.util.UUID;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AreaDTO {
  private UUID id;
  private String nombre;
  private Boolean activa;
  private Boolean necesitaTurno;
}
