package com.clinica_administracion.sistema_administracion_clinica.entities;

import java.util.UUID;

import com.clinica_administracion.sistema_administracion_clinica.others.enums.Roles;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserEntity {
  @Id @GeneratedValue
  public UUID id;
  @Column(unique = true)
  public String username;
  public String password;
  @Enumerated(EnumType.STRING)
  public Roles role;
}
