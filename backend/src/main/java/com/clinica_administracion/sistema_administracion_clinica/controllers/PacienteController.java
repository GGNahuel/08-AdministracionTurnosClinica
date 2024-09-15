package com.clinica_administracion.sistema_administracion_clinica.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.clinica_administracion.sistema_administracion_clinica.DTOs.PacienteDTO;
import com.clinica_administracion.sistema_administracion_clinica.others.UtilitiesMethods;
import com.clinica_administracion.sistema_administracion_clinica.others.enums.MessageTypes;
import com.clinica_administracion.sistema_administracion_clinica.others.responseDTOs.GetResponseDTO;
import com.clinica_administracion.sistema_administracion_clinica.others.responseDTOs.ResponseDTO;
import com.clinica_administracion.sistema_administracion_clinica.others.responseDTOs.ReturnResponseDTO;
import com.clinica_administracion.sistema_administracion_clinica.services.PacienteService;

@RestController
@RequestMapping("/api/paciente")
public class PacienteController {
  private final PacienteService pacienteService;

  public PacienteController(PacienteService pacienteService) {
    this.pacienteService = pacienteService;
  }

  @GetMapping("")
  public ResponseEntity<ResponseDTO> getAllPacientes () {
    GetResponseDTO response = new GetResponseDTO();
    response.setResults(pacienteService.getAll());
    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  @GetMapping("/search")
  public ResponseEntity<ResponseDTO> searchPacientes (@RequestParam String busqueda, @RequestParam String obraSocial) {
    GetResponseDTO response = new GetResponseDTO();
    response.setResults(pacienteService.searchPacientes(busqueda, obraSocial));

    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  @GetMapping("/nombre/{nombre}")
  public ResponseEntity<ResponseDTO> getPacientesByNombre (@PathVariable String nombre) throws Exception {
    GetResponseDTO response = new GetResponseDTO();
    response.setResults(pacienteService.getByNombreLike(nombre));
    return new ResponseEntity<>(response, HttpStatus.OK);
  }
  
  @GetMapping("/{dni}")
  public ResponseEntity<ResponseDTO> getPacienteByDni(@PathVariable String dni) throws Exception {
    GetResponseDTO response = new GetResponseDTO();
    List<PacienteDTO> list = new ArrayList<>();
    list.add(pacienteService.getByDni(dni));
    response.setResults(list);
    
    return new ResponseEntity<>(response, HttpStatus.OK);
  }
  
  @GetMapping("/id/{id}")
  public ResponseEntity<ResponseDTO> getPaciente(@PathVariable String id) throws Exception {
    GetResponseDTO response = new GetResponseDTO();
    List<PacienteDTO> list = new ArrayList<>();
    list.add(pacienteService.getById(UUID.fromString(id)));
    response.setResults(list);

    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  @PostMapping("")
  public ResponseEntity<ResponseDTO> createPaciente(@RequestBody PacienteDTO paciente) throws Exception {
    ReturnResponseDTO response = new ReturnResponseDTO();
    response.setReturnValue(pacienteService.create(paciente));
    response.setMessage(UtilitiesMethods.messageCreator("Paciente creado exitosamente", MessageTypes.ok));
    return new ResponseEntity<>(response, HttpStatus.CREATED);
  }
  
  @PutMapping("")
  public ResponseEntity<ResponseDTO> updatePaciente(@RequestBody PacienteDTO paciente) throws Exception{
    ReturnResponseDTO response = new ReturnResponseDTO();
    response.setReturnValue(pacienteService.update(paciente));
    response.setMessage(UtilitiesMethods.messageCreator("Paciente actualizado exitosamente", MessageTypes.ok));
    return new ResponseEntity<>(response, HttpStatus.OK);
  }
}
