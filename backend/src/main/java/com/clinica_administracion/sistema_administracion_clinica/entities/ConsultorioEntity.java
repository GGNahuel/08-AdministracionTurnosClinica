package com.clinica_administracion.sistema_administracion_clinica.entities;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class ConsultorioEntity {
  @Id
  @GeneratedValue
  private UUID id;
  @Column(unique = true)
  private Integer numeroConsultorio;
}
