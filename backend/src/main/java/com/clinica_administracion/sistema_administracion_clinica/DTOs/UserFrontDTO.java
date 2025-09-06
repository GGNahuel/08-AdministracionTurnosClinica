package com.clinica_administracion.sistema_administracion_clinica.dtos;

import java.util.UUID;

import com.clinica_administracion.sistema_administracion_clinica.others.enums.Roles;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserFrontDTO {
  private UUID id;
  private String username;
  private Roles role;
  private String email;
  private String proffesionalDni;
}

