package com.clinica_administracion.sistema_administracion_clinica.entities;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AreaEntity {
  @Id @GeneratedValue
  private UUID id;
  @Column(nullable = false, unique = true)
  private String nombre;
  private String searchName;
  private Boolean necesitaTurno;
  private Boolean active;
}
