package com.clinica_administracion.sistema_administracion_clinica.services.interfaces;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.clinica_administracion.sistema_administracion_clinica.DTOs.UserEditDTO;
import com.clinica_administracion.sistema_administracion_clinica.DTOs.UserFrontDTO;
import com.clinica_administracion.sistema_administracion_clinica.DTOs.UserRegistrationDTO;
import com.clinica_administracion.sistema_administracion_clinica.others.enums.Roles;

public interface IUserService extends UserDetailsService {
  public List<UserFrontDTO> getAll();
  public List<UserFrontDTO> getByRole(Roles role) throws Exception;
  public UserFrontDTO getByUsername(String username) throws Exception;
  public UserFrontDTO create(UserRegistrationDTO user) throws Exception;
  public UserFrontDTO update(UserEditDTO user) throws Exception;
  void changePassword(UserRegistrationDTO user) throws Exception;
}
