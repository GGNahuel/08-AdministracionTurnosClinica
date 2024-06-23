package com.clinica_administracion.sistema_administracion_clinica.entities;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PacienteEntity {
  @Id
  @GeneratedValue
  private UUID id;
  @Column(nullable = false)
  private String nombreCompleto;
  @Column(nullable = false, unique = true)
  private String dni;
  @Column(nullable = false)
  private Long numeroContacto;
  private String obraSocial;
  @OneToMany(mappedBy = "paciente", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private List<TurnoEntity> turnos;
}
