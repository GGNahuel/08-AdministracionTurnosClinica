package com.clinica_administracion.sistema_administracion_clinica.services.interfaces;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.clinica_administracion.sistema_administracion_clinica.DTOs.UserDTO;
import com.clinica_administracion.sistema_administracion_clinica.others.enums.Roles;

public interface IUserService extends UserDetailsService {
  public List<UserDTO> getAll();
  public List<UserDTO> getByRole(Roles role) throws Exception;
  public UserDTO getByUsername(String username) throws Exception;
  public UserDTO create(UserDTO user) throws Exception;
  public UserDTO update(UserDTO user) throws Exception;
}
