package com.clinica_administracion.sistema_administracion_clinica.dtos;

import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfesionalMedDTO {
  private UUID id;
  private String nombreCompleto;
  private String dni;
  private long numeroContacto;
  private List<String> areas;
  private long numMatricula;
  private List<String> horarios;
  private Integer consultorio;
  private Boolean active;
}
