package com.clinica_administracion.sistema_administracion_clinica.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.clinica_administracion.sistema_administracion_clinica.DTOs.TurnoDTO;
import com.clinica_administracion.sistema_administracion_clinica.others.UtilitiesMethods;
import com.clinica_administracion.sistema_administracion_clinica.others.enums.MessageTypes;
import com.clinica_administracion.sistema_administracion_clinica.others.responseDTOs.ResponseDTO;
import com.clinica_administracion.sistema_administracion_clinica.services.TurnoService;


@RestController
@RequestMapping("/api/turno")
public class TurnoController {
  @Autowired TurnoService turnoService;

  @GetMapping("")
  public ResponseEntity<ResponseDTO> getAllTurnos () {
    ResponseDTO response = new ResponseDTO();
    response.setResults(turnoService.getAll());

    return new ResponseEntity<ResponseDTO>(response, HttpStatus.OK);
  }

  @GetMapping("/{fecha}")
  public ResponseEntity<ResponseDTO> getTurnosByFecha(@PathVariable String fecha) throws Exception {
    ResponseDTO response = new ResponseDTO();
    response.setResults(turnoService.getByDate(fecha));
    return new ResponseEntity<ResponseDTO>(response, HttpStatus.OK);
  }

  @GetMapping("/paciente/{dni}")
  public ResponseEntity<ResponseDTO> getTurnosByPacienteDni(@PathVariable String dni) throws Exception {
    ResponseDTO response = new ResponseDTO();
    response.setResults(turnoService.getByPacienteDni(dni));  
    
    return new ResponseEntity<ResponseDTO>(response, HttpStatus.OK);
  }
    
  @GetMapping("/profesional/{dni}")
  public ResponseEntity<ResponseDTO> getTurnosByProfesionalDni(@PathVariable String dni) throws Exception {
    ResponseDTO response = new ResponseDTO();
    response.setResults(turnoService.getByProfesionalDni(dni));  
    
    return new ResponseEntity<ResponseDTO>(response, HttpStatus.OK);
  }

  @GetMapping("/profesional")
  public ResponseEntity<ResponseDTO> getTurnosByProfesional(String nombre) throws Exception {
    ResponseDTO response = new ResponseDTO();
    response.setResults(turnoService.getByProfesional(nombre));  
    
    return new ResponseEntity<ResponseDTO>(response, HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<ResponseDTO> getTurnoById(@PathVariable UUID id) throws Exception {
    ResponseDTO response = new ResponseDTO();
    List<TurnoDTO> list = new ArrayList<>();
    list.add(turnoService.getById(id));
    response.setResults(list);
      
    return new ResponseEntity<>(response, HttpStatus.OK);
  }
  
  @PostMapping("")
  public ResponseEntity<ResponseDTO> createTurno(@RequestBody TurnoDTO turno) throws Exception {
    ResponseDTO response = new ResponseDTO();
    response.setReturnValue(turnoService.create(turno));
    response.setMessage(UtilitiesMethods.messageCreator("El turno fue creado exitosamente", MessageTypes.ok));
    
    return new ResponseEntity<ResponseDTO>(response, HttpStatus.CREATED);
  }
  
  @PutMapping("")
  public ResponseEntity<ResponseDTO> updateTurno(@RequestBody TurnoDTO turno) throws Exception {
    ResponseDTO response = new ResponseDTO();
    response.setReturnValue(turnoService.update(turno));
    response.setMessage(UtilitiesMethods.messageCreator("El turno fue modificado exitosamente", MessageTypes.ok));
    
    return new ResponseEntity<ResponseDTO>(response, HttpStatus.OK);
  }

  @DeleteMapping("")
  public ResponseEntity<ResponseDTO> deleteOldTurnos(@RequestParam String fecha) throws Exception {
    ResponseDTO response = new ResponseDTO();
    turnoService.deleteAlreadyPassed(fecha);
    response.setMessage(UtilitiesMethods.messageCreator("Las entidades han sido borrradas exitosamente", MessageTypes.ok));

    return new ResponseEntity<ResponseDTO>(response, HttpStatus.OK);
  }
}
