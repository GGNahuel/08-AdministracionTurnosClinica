package com.clinica_administracion.sistema_administracion_clinica.entities;

import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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
  @Column(nullable = false)
    private Long numeroContacto;
  @ManyToMany(fetch = FetchType.EAGER) @JoinTable(
    name = "profesional_area", 
    joinColumns = @JoinColumn(referencedColumnName = "id"),
    inverseJoinColumns = @JoinColumn(referencedColumnName = "id")
  )
    private List<AreaEntity> areas;
  @Column(nullable = false, unique = true)
    private Integer numMatricula;
  @Temporal(TemporalType.TIME)
    private List<LocalTime> horarios;
  @OneToOne
    private ConsultorioEntity consultorio;
}
