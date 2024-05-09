package com.clinica_administracion.sistema_administracion_clinica.DTOs;

import java.time.LocalTime;
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
  private List<String> areas;
  private Integer numMatricula;
  private List<LocalTime> horarios;
  private Integer consultorio;
}
