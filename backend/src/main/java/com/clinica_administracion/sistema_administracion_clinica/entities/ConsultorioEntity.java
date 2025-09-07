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
public class ConsultorioEntity {
  @Id
  @GeneratedValue
  private UUID id;
  @Column(unique = true, nullable = false)
  private Integer numeroConsultorio;

  public ConsultorioEntity(Integer numero) {
    this.numeroConsultorio = numero;
  }
}
