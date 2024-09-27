package com.clinica_administracion.sistema_administracion_clinica.DTOs;

import java.util.UUID;

import com.clinica_administracion.sistema_administracion_clinica.others.enums.Roles;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRegistrationDTO {
  private UUID id;
  private String username;
  private String password;
  private String password2;
  private Roles role;
  private String email;
  private Boolean isProffesional;
  private String proffesionalDni;
}
