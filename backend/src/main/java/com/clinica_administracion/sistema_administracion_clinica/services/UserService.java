package com.clinica_administracion.sistema_administracion_clinica.services;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.clinica_administracion.sistema_administracion_clinica.DTOs.UserDTO;
import com.clinica_administracion.sistema_administracion_clinica.entities.UserEntity;
import com.clinica_administracion.sistema_administracion_clinica.others.UtilitiesMethods;
import com.clinica_administracion.sistema_administracion_clinica.others.enums.Roles;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.EntityAlreadyExists;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.ResourceNotFound;
import com.clinica_administracion.sistema_administracion_clinica.repositories.ProfesionalMedRepository;
import com.clinica_administracion.sistema_administracion_clinica.repositories.UserRepository;
import com.clinica_administracion.sistema_administracion_clinica.services.interfaces.IUserService;

import jakarta.servlet.http.HttpSession;

@Service
public class UserService implements IUserService {
  private UserRepository userRepo;
  private ProfesionalMedRepository profesionalRepo;
  private ModelMapper modelMapper;

  public UserService(UserRepository userRepo, ProfesionalMedRepository profesionalRepo, ModelMapper modelMapper) {
    this.userRepo = userRepo;
    this.profesionalRepo = profesionalRepo;
    this.modelMapper = modelMapper;
  }

  @Transactional(readOnly = true) @Override
  public List<UserDTO> getAll() {
    return userRepo.findAll().stream().map(
      user -> modelMapper.map(user, UserDTO.class)
    ).toList();
  }

  @Transactional(readOnly = true) @Override
  public List<UserDTO> getByRole(Roles role) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"rol"}, role);

    return userRepo.findByRole(role).stream().map(
      user -> modelMapper.map(user, UserDTO.class)
    ).toList();
  }

  @Transactional(readOnly = true) @Override
  public UserDTO getByUsername(String username) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"usuario"}, username);

    UserEntity user = userRepo.findByUsername(username).orElseThrow(
      () -> new ResourceNotFound("usuario", "nombre de usuario", username)
    );

    return modelMapper.map(user, UserDTO.class);
  }

  @Transactional @Override
  public UserDTO create(UserDTO user) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(
      new String[]{"nombre de usuario", "contraseña", "rol"}, user.getUsername(), user.getPassword(), user.getRole()
    );
    if (userRepo.findByUsername(user.getUsername()).isPresent())
      throw new EntityAlreadyExists("Nombre de usuario ya ocupado", user.getUsername());
    
    UserEntity userEntity = modelMapper.map(user, UserEntity.class);
    userEntity.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));

    // hacer la relación con el profesional en caso de que el rol sea del profesional
    // tendrá que recibir en parametro el id del profesional

    return modelMapper.map(userRepo.save(userEntity), UserDTO.class);
  }

  @Transactional @Override
  public UserDTO update(UserDTO user) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(
      new String[]{"nombre de usuario", "contraseña", "rol"}, user.getUsername(), user.getPassword(), user.getRole()
    );
    userRepo.findById(user.getId()).orElseThrow(
      () -> new ResourceNotFound("usuario", "id", user.getId().toString())
    );
    if (userRepo.findByUsername(user.getUsername()).isPresent())
      throw new EntityAlreadyExists("Nombre de usuario ya ocupado", user.getUsername());
    
    UserEntity userEntity = modelMapper.map(user, UserEntity.class);
    userEntity.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));

    // hacer la relación con el profesional en caso de que el rol sea del profesional
    // tendrá que recibir en parametro el id del profesional

    return modelMapper.map(userRepo.save(userEntity), UserDTO.class);
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    UserEntity user = userRepo.findByUsername(username).orElseThrow(
      () -> new ResourceNotFound("usuario", "nombre de usuario", username)
    );

    List<GrantedAuthority> permissions = new ArrayList<GrantedAuthority>();
    GrantedAuthority rolePermission = new SimpleGrantedAuthority("ROLE_" + user.getRole().toString());
    permissions.add(rolePermission);

    ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
    HttpSession session = attr.getRequest().getSession();
    session.setAttribute("loggedUser", user);

    return new User(user.getUsername(), user.getPassword(), permissions);
  }
}
