package com.clinica_administracion.sistema_administracion_clinica.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clinica_administracion.sistema_administracion_clinica.DTOs.ProfesionalMedDTO;
import com.clinica_administracion.sistema_administracion_clinica.others.ResponseDTO;
import com.clinica_administracion.sistema_administracion_clinica.others.UtilitiesMethods;
import com.clinica_administracion.sistema_administracion_clinica.others.enums.MessageTypes;
import com.clinica_administracion.sistema_administracion_clinica.services.ProfesionalMedService;



@RestController
@RequestMapping("/api/profesional")
public class ProfesionalMedController {
  @Autowired ProfesionalMedService profesionalMedService;

  @GetMapping("")
  public ResponseEntity<ResponseDTO> getAll() {
    ResponseDTO response = new ResponseDTO();
    response.setResults(profesionalMedService.getAll());
    return new ResponseEntity<ResponseDTO>(response, HttpStatus.OK);
  }

  @GetMapping("/id/{id}")
  public ResponseEntity<ResponseDTO> getById(UUID id) throws Exception {
    ResponseDTO response = new ResponseDTO();
    List<ProfesionalMedDTO> list = new ArrayList<>();
    ProfesionalMedDTO profesional = profesionalMedService.getById(id);
    list.add(profesional);
    response.setResults(list);

    return new ResponseEntity<ResponseDTO>(response, HttpStatus.OK);
  }
  
  @GetMapping("/{dni}")
  public ResponseEntity<ResponseDTO> getByDni(String dni) throws Exception {
    ResponseDTO response = new ResponseDTO();
    List<ProfesionalMedDTO> list = new ArrayList<>();
    ProfesionalMedDTO profesional = profesionalMedService.getByDni(dni);
    list.add(profesional);
    response.setResults(list);

    return new ResponseEntity<ResponseDTO>(response, HttpStatus.OK);
  }

  @PostMapping("")
  public ResponseEntity<ResponseDTO> create(@RequestBody ProfesionalMedDTO profesional) throws Exception {
    ResponseDTO response = new ResponseDTO();
    response.setReturnValue(profesionalMedService.create(profesional));
    response.setMessage(UtilitiesMethods.messageCreator("Profesional médico creado exitosamente", MessageTypes.ok));

    return new ResponseEntity<ResponseDTO>(response, HttpStatus.CREATED);
  }

  @PutMapping("path/{id}")
  public ResponseEntity<ResponseDTO> update(@RequestBody ProfesionalMedDTO profesional) throws Exception {
    ResponseDTO response = new ResponseDTO();
    response.setReturnValue(profesionalMedService.update(profesional));
    response.setMessage(UtilitiesMethods.messageCreator("Profesional médico actualizado exitosamente", MessageTypes.ok));

    return new ResponseEntity<ResponseDTO>(response, HttpStatus.OK);
  }
}
