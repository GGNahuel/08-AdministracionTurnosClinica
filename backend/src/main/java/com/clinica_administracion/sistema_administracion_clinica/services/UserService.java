package com.clinica_administracion.sistema_administracion_clinica.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

import com.clinica_administracion.sistema_administracion_clinica.dtos.UserEditDTO;
import com.clinica_administracion.sistema_administracion_clinica.dtos.UserFrontDTO;
import com.clinica_administracion.sistema_administracion_clinica.dtos.UserRegistrationDTO;
import com.clinica_administracion.sistema_administracion_clinica.entities.ProfesionalMedEntity;
import com.clinica_administracion.sistema_administracion_clinica.entities.UserEntity;
import com.clinica_administracion.sistema_administracion_clinica.others.UtilitiesMethods;
import com.clinica_administracion.sistema_administracion_clinica.others.enums.Roles;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.EntityAlreadyExists;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.InvalidInput;
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
  public List<UserFrontDTO> getAll() {
    return userRepo.findAll().stream().map(
      user -> modelMapper.map(user, UserFrontDTO.class)
    ).toList();
  }

  @Transactional(readOnly = true) @Override
  public List<UserFrontDTO> getByRole(Roles role) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"rol"}, role);

    return userRepo.findByRole(role).stream().map(
      user -> modelMapper.map(user, UserFrontDTO.class)
    ).toList();
  }

  @Transactional(readOnly = true) @Override
  public UserFrontDTO getByUsername(String username) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"usuario"}, username);

    UserEntity user = userRepo.findByUsername(username).orElseThrow(
      () -> new ResourceNotFound("usuario", "nombre de usuario", username)
    );

    return modelMapper.map(user, UserFrontDTO.class);
  }

  @Transactional @Override
  public UserFrontDTO create(UserRegistrationDTO user) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(
      new String[]{"nombre de usuario", "contraseña", "repetición de contraseña", "rol", "email", "es profesional"}, 
      user.getUsername(), user.getPassword(), user.getPassword2(), user.getRole(), user.getEmail(), user.getIsProffesional()
    );
    if (userRepo.findByUsername(user.getUsername()).isPresent())
      throw new EntityAlreadyExists("Nombre de usuario ya ocupado", user.getUsername());
    if (!user.getPassword().equals(user.getPassword2()))
      throw new InvalidInput("repetición de contraseña");
    ProfesionalMedEntity profesional = null;
    if (user.getIsProffesional()) {
      profesional = profesionalRepo.findByDni(user.getProffesionalDni()).orElseThrow(
        () -> new ResourceNotFound("profesional", "dni", user.getProffesionalDni())
      );
    }
    
    UserEntity userEntity = modelMapper.map(user, UserEntity.class);
    userEntity.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
    userEntity.setProfesionalId(profesional);

    return modelMapper.map(userRepo.save(userEntity), UserFrontDTO.class);
  }

  @Transactional @Override
  public UserFrontDTO update(UserEditDTO user) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(
      new String[]{"nombre de usuario", "rol", "email", "'Es profesional de salud'"}, user.getUsername(), user.getRole(), user.getEmail(), user.getIsProffesional()
    );
    
    Optional<UserEntity> checkUsername = userRepo.findByUsername(user.getUsername());
    if (checkUsername.isPresent() && checkUsername.get().getId() == user.getId())
      throw new EntityAlreadyExists("Nombre de usuario ya ocupado", user.getUsername());

    ProfesionalMedEntity profesional = null;
    if (user.getIsProffesional()) {
      profesional = profesionalRepo.findByDni(user.getProffesionalDni()).orElseThrow(
        () -> new ResourceNotFound("profesional", "dni", user.getProffesionalDni())
      );
    }

    UserEntity userEntity = userRepo.findById(user.getId()).orElseThrow(
      () -> new ResourceNotFound("usuario", "id", user.getId().toString())
    );
    userEntity.setUsername(user.getUsername());
    userEntity.setEmail(user.getEmail());
    userEntity.setRole(user.getRole());
    userEntity.setProfesionalId(profesional);
    
    userRepo.save(userEntity);
    loadUserByUsername(userEntity.getUsername());

    return modelMapper.map(userEntity, UserFrontDTO.class);
  }

  @Transactional @Override
  public void changePassword(UserRegistrationDTO user) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(
      new String[]{"nombre de usuario", "nueva contraseña", "repetición de contraseña"},
      user.getUsername(), user.getPassword(), user.getPassword2()
    );
    if (!user.getPassword().equals(user.getPassword2()))
      throw new InvalidInput("repetición de contraseña");

    UserEntity registeredUser = userRepo.findByUsername(user.getUsername()).orElseThrow(
      () -> new ResourceNotFound("usuario", "nombre de usuario", user.getUsername())
    );
    registeredUser.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
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
