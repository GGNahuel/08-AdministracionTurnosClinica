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
  @Column(nullable = false)
    private Long numeroContacto;
  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
    private AreaProfesional areaProfesional;
  @Column(nullable = false)
    private Integer numMatricula;
    private List<String> horarios;
  @OneToOne
    private ConsultorioEntity consultorio;
}
