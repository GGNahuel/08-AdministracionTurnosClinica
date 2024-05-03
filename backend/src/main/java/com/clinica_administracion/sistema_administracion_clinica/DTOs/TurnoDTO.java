package com.clinica_administracion.sistema_administracion_clinica.DTOs;

import java.util.UUID;

import com.clinica_administracion.sistema_administracion_clinica.others.enums.EstadoPago;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TurnoDTO {
  private UUID id;
  private UUID paciente;
  private String fecha;
  private String horario;
  private UUID areaProfesional;
  private String metodoDeAbono;
  private String obraSocial;
  private EstadoPago estadoPago;
  private String comentario;
  private Integer consultorio;
  private UUID profesional;
  private Boolean activo;
}
