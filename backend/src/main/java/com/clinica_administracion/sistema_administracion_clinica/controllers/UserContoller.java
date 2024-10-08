package com.clinica_administracion.sistema_administracion_clinica.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clinica_administracion.sistema_administracion_clinica.DTOs.UserEditDTO;
import com.clinica_administracion.sistema_administracion_clinica.DTOs.UserFrontDTO;
import com.clinica_administracion.sistema_administracion_clinica.DTOs.UserRegistrationDTO;
import com.clinica_administracion.sistema_administracion_clinica.entities.UserEntity;
import com.clinica_administracion.sistema_administracion_clinica.others.UtilitiesMethods;
import com.clinica_administracion.sistema_administracion_clinica.others.enums.MessageTypes;
import com.clinica_administracion.sistema_administracion_clinica.others.enums.Roles;
import com.clinica_administracion.sistema_administracion_clinica.others.responseDTOs.GetResponseDTO;
import com.clinica_administracion.sistema_administracion_clinica.others.responseDTOs.ResponseDTO;
import com.clinica_administracion.sistema_administracion_clinica.others.responseDTOs.ReturnResponseDTO;
import com.clinica_administracion.sistema_administracion_clinica.services.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/user")
public class UserContoller {
  private final UserService userService;

  public UserContoller(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("/csrf-token")
  public CsrfToken csrf(HttpServletRequest servlet) {
    CsrfToken token = (CsrfToken) servlet.getAttribute("_csrf");
    System.out.println("CSRF Token: " + token.getToken());
    return token;
  }

  @GetMapping("/session")
  public ResponseEntity<UserFrontDTO> session(HttpSession session) throws Exception {
    UserEntity user = (UserEntity) session.getAttribute("loggedUser");
    if (user == null) return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
    
    UserFrontDTO returnUser = userService.getByUsername(user.getUsername());
    return new ResponseEntity<>(returnUser, HttpStatus.OK);
  }

  @GetMapping("")
  public ResponseEntity<ResponseDTO> getAll() {
    GetResponseDTO response = new GetResponseDTO();
    response.setResults(userService.getAll());

    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  @GetMapping("/{username}")
  public ResponseEntity<ResponseDTO> getByUsername(@PathVariable String username) throws Exception {
    GetResponseDTO response = new GetResponseDTO();
    List<UserFrontDTO> list = new ArrayList<>();
    list.add(userService.getByUsername(username));
    response.setResults(list);

    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  @GetMapping("/role/{role}")
  public ResponseEntity<ResponseDTO> getByRole(@PathVariable Roles role) throws Exception {
    GetResponseDTO response = new GetResponseDTO();
    response.setResults(userService.getByRole(role));

    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  @PostMapping("")
  public ResponseEntity<ResponseDTO> create(@RequestBody UserRegistrationDTO user) throws Exception {
    ReturnResponseDTO response = new ReturnResponseDTO();
    response.setReturnValue(userService.create(user));
    response.setMessage(UtilitiesMethods.messageCreator("Usuario registrado exitosamente", MessageTypes.ok));

    return new ResponseEntity<>(response, HttpStatus.CREATED);
  }

  @PutMapping("")
  public ResponseEntity<ResponseDTO> update(@RequestBody UserEditDTO user) throws Exception {
    ReturnResponseDTO response = new ReturnResponseDTO();
    response.setReturnValue(userService.update(user));
    response.setMessage(UtilitiesMethods.messageCreator("Usuario actualizado exitosamente", MessageTypes.ok));

    return new ResponseEntity<>(response, HttpStatus.OK);
  }
}
