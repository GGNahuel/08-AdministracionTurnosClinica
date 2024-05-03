package com.clinica_administracion.sistema_administracion_clinica.DTOs;

import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfesionalMedDTO {
  private UUID id;
  private String nombreCompleto;
  private String dni;
  private Long numeroContacto;
  private List<UUID> areas;
  private Integer numMatricula;
  private List<String> horarios;
  private Integer consultorio;
}
