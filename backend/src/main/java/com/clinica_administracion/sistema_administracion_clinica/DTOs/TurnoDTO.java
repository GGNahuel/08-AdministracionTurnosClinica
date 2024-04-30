package com.clinica_administracion.sistema_administracion_clinica.DTOs;

import java.util.Date;
import java.util.UUID;

import com.clinica_administracion.sistema_administracion_clinica.others.enums.AreaProfesional;
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
  private Date fecha;
  private Date horario;
  private AreaProfesional areaProfesional;
  private String metodoDeAbono;
  private String obraSocial;
  private EstadoPago estadoPago;
  private String comentario;
  private UUID consultorio;
  private UUID profesional;
  private Boolean activo;
}
