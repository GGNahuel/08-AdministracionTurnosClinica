package com.clinica_administracion.sistema_administracion_clinica.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clinica_administracion.sistema_administracion_clinica.DTOs.TurnoDTO;
import com.clinica_administracion.sistema_administracion_clinica.others.ResponseDTO;
import com.clinica_administracion.sistema_administracion_clinica.others.UtilitiesMethods;
import com.clinica_administracion.sistema_administracion_clinica.others.enums.MessageTypes;
import com.clinica_administracion.sistema_administracion_clinica.services.TurnoService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/turno")
public class TurnoController {
  @Autowired TurnoService turnoService;

  @GetMapping("")
  public ResponseEntity<ResponseDTO> getAllTurnos () {
    ResponseDTO response = new ResponseDTO();
    response.setResults(turnoService.getAllTurnos());

    return new ResponseEntity<ResponseDTO>(response, HttpStatus.OK);
  }
  
  @PostMapping("")
  public ResponseEntity<ResponseDTO> createTurno(@RequestBody TurnoDTO turno) throws Exception {
    ResponseDTO response = new ResponseDTO();
    response.setReturnValue(turnoService.createTurno(turno));
    response.setMessage(UtilitiesMethods.messageCreator("El turno fue creado exitosamente", MessageTypes.ok));
    
    return new ResponseEntity<ResponseDTO>(response, HttpStatus.CREATED);
  }
  
}
