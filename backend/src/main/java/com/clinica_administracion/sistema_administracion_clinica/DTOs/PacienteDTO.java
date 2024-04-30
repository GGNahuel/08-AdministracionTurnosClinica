package com.clinica_administracion.sistema_administracion_clinica.DTOs;

import java.util.List;
import java.util.UUID;

import lombok.Data;

@Data
public class PacienteDTO {
  private UUID id;
  private String nombreCompleto;
  private String dni;
  private Long numeroContacto;
  private String obraSocial;
  private List<UUID> turnos;
}
