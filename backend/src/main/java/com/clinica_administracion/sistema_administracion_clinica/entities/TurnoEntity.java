package com.clinica_administracion.sistema_administracion_clinica.entities;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

import org.springframework.format.annotation.DateTimeFormat;

import com.clinica_administracion.sistema_administracion_clinica.others.enums.EstadoPago;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TurnoEntity {
  @Id @GeneratedValue
  private UUID id;
  @ManyToOne
  private PacienteEntity paciente;
  @Temporal(value = TemporalType.DATE) @Column(nullable = false) @DateTimeFormat(pattern = "dd/MM/yyyy")
    private LocalDate fecha;
  @Temporal(value = TemporalType.TIME) @Column(nullable = false)
    private LocalTime horario;
  @ManyToOne @JoinColumn(nullable = false)
    private AreaEntity areaProfesional;
  private String metodoDeAbono;
  private String obraSocial;
  @Enumerated(EnumType.STRING)
  private EstadoPago estadoPago;
  private String comentario;
  @ManyToOne @JoinColumn(nullable = false)
    private ConsultorioEntity consultorio;
  @ManyToOne @JoinColumn(nullable = false)
    private ProfesionalMedEntity profesional;
  private Boolean activo;
}
