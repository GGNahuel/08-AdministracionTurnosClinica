package com.clinica_administracion.sistema_administracion_clinica.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clinica_administracion.sistema_administracion_clinica.DTOs.PacienteDTO;
import com.clinica_administracion.sistema_administracion_clinica.others.ResponseDTO;
import com.clinica_administracion.sistema_administracion_clinica.others.UtilitiesMethods;
import com.clinica_administracion.sistema_administracion_clinica.others.enums.MessageTypes;
import com.clinica_administracion.sistema_administracion_clinica.services.PacienteService;



@RestController
@RequestMapping("/api/paciente")
public class PacienteController {
  @Autowired PacienteService pacienteService;

  @GetMapping("")
  public ResponseEntity<ResponseDTO> getAllPacientes () {
    ResponseDTO response = new ResponseDTO();
    response.setResults(pacienteService.getAllPacientes());
    return new ResponseEntity<>(response, HttpStatus.OK);
  }
  
  @GetMapping("/{dni}")
  public ResponseEntity<ResponseDTO> getPacienteByDni(@PathVariable String dni) throws Exception {
    ResponseDTO response = new ResponseDTO();
    List<PacienteDTO> list = new ArrayList<>();
    list.add(pacienteService.getPacienteByDNI(dni));
    response.setResults(list);
    
    return new ResponseEntity<>(response, HttpStatus.OK);
  }
  
  @GetMapping("/id/{id}")
  public ResponseEntity<ResponseDTO> getPaciente(@PathVariable UUID id) throws Exception {
    ResponseDTO response = new ResponseDTO();
    List<PacienteDTO> list = new ArrayList<>();
    list.add(pacienteService.getPaciente(id));
    response.setResults(list);

    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  @PostMapping("")
  public ResponseEntity<ResponseDTO> createPaciente(@RequestBody PacienteDTO paciente) throws Exception {
    ResponseDTO response = new ResponseDTO();
    response.setReturnValue(pacienteService.createPaciente(paciente));
    response.setMessage(UtilitiesMethods.messageCreator("Paciente creado exitosamente", MessageTypes.ok));
    return new ResponseEntity<>(response, HttpStatus.CREATED);
  }
  
  @PutMapping("")
  public ResponseEntity<ResponseDTO> putMethodName(@RequestBody PacienteDTO paciente) throws Exception{
    ResponseDTO response = new ResponseDTO();
    response.setReturnValue(pacienteService.updatePaciente(paciente));
    response.setMessage(UtilitiesMethods.messageCreator("Paciente actualizado exitosamente", MessageTypes.ok));
    return new ResponseEntity<>(response, HttpStatus.OK);
  }
}
