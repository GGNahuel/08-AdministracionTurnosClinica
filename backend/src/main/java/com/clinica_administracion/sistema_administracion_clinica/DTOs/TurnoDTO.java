package com.clinica_administracion.sistema_administracion_clinica.DTOs;

import java.util.UUID;

import com.clinica_administracion.sistema_administracion_clinica.others.enums.EstadoPago;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TurnoDTO {
  private UUID id;
  private PacienteDTO pacienteDto;
  private String fecha;
  private String horario;
  private String areaProfesional;
  private String metodoDeAbono;
  private String obraSocial;
  private EstadoPago estadoPago;
  private String comentario;
  private Integer consultorio;
  private ProfesionalMedDTO profesionalDto;
  private Boolean active;
}
