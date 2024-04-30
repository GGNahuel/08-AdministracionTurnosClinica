package com.clinica_administracion.sistema_administracion_clinica.entities;

import java.util.Date;
import java.util.UUID;

import com.clinica_administracion.sistema_administracion_clinica.others.enums.AreaProfesional;
import com.clinica_administracion.sistema_administracion_clinica.others.enums.EstadoPago;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Entity
@Data
public class TurnoEntity {
  @Id @GeneratedValue
  private UUID id;
  @ManyToOne
  private PacienteEntity paciente;
  @Temporal(value = TemporalType.DATE) @Column(nullable = false)
  private Date fecha;
  @Temporal(value = TemporalType.TIME) @Column(nullable = false)
  private Date horario;
  @Enumerated(EnumType.STRING) @Column(nullable = false)
  private AreaProfesional areaProfesional;
  private String metodoDeAbono;
  private String obraSocial;
  @Enumerated(EnumType.STRING)
  private EstadoPago estadoPago;
  private String comentario;
  @OneToOne @JoinColumn(nullable = false)
  private ConsultorioEntity consultorio;
  @OneToOne @JoinColumn(nullable = false)
  private ProfesionalMedEntity profesional;
  private Boolean activo;
}
