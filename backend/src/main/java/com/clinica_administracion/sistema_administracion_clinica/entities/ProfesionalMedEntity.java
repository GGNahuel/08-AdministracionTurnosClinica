package com.clinica_administracion.sistema_administracion_clinica.entities;

import java.util.List;
import java.util.UUID;

import com.clinica_administracion.sistema_administracion_clinica.others.enums.AreaProfesional;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Entity
@Data
public class ProfesionalMedEntity {
  @Id
  @GeneratedValue
    private UUID id;
  @Column(nullable = false)
    private String nombreCompleto;
  @Column(nullable = false, unique = true)
    private String dni;
    private Long numeroContacto;
  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
    private AreaProfesional areaProfesional;
  @Column(nullable = false)
    private Integer numMatricula;
  @Temporal(TemporalType.TIME) //revisar esto
    private List<Double> horarios;
  @OneToOne
    private ConsultorioEntity consultorio;
}
