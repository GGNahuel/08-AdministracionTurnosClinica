package com.clinica_administracion.sistema_administracion_clinica.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clinica_administracion.sistema_administracion_clinica.DTOs.PacienteDTO;
import com.clinica_administracion.sistema_administracion_clinica.others.UtilitiesMethods;
import com.clinica_administracion.sistema_administracion_clinica.others.enums.MessageTypes;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.EntityAlreadyExists;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.ResourceNotFound;
import com.clinica_administracion.sistema_administracion_clinica.services.PacienteService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequestMapping("/api/paciente")
public class PacienteController {
  private Map<String, Object> mapa = new HashMap<>();
  @Autowired PacienteService pacienteService;

  @GetMapping("")
  public ResponseEntity<Map<String, Object>> getAllPacientes () {
    mapa.clear();
    try {
      mapa.put("results", pacienteService.getAllPacientes());
      return new ResponseEntity<>(mapa, HttpStatus.OK);
    } catch (Exception e) {
      UtilitiesMethods.messageCreatorResponse(mapa, e.getMessage(), MessageTypes.error);
      return new ResponseEntity<>(mapa, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @GetMapping("/{dni}")
  public ResponseEntity<Map<String, Object>> getPacienteByDni(@PathVariable String dni) {
    mapa.clear();
    try {
      mapa.put("results", pacienteService.getPacienteByDNI(dni));
      return new ResponseEntity<>(mapa, HttpStatus.OK);
    } catch (ResourceNotFound e) {
      UtilitiesMethods.messageCreatorResponse(mapa, e.getMessage(), MessageTypes.error);
      return new ResponseEntity<>(mapa, HttpStatus.NOT_FOUND);
    } catch (Exception e) {
      UtilitiesMethods.messageCreatorResponse(mapa, e.getMessage(), MessageTypes.error);
      return new ResponseEntity<>(mapa, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/id/{id}")
  public ResponseEntity<Map<String, Object>> getPaciente(@PathVariable UUID id) {
    mapa.clear();
    try {
      mapa.put("results", pacienteService.getPaciente(id));
      return new ResponseEntity<>(mapa, HttpStatus.OK);
    } catch (ResourceNotFound e) {
      UtilitiesMethods.messageCreatorResponse(mapa, e.getMessage(), MessageTypes.error);
      return new ResponseEntity<>(mapa, HttpStatus.NOT_FOUND);
    } catch (Exception e) {
      UtilitiesMethods.messageCreatorResponse(mapa, e.getMessage(), MessageTypes.error);
      return new ResponseEntity<>(mapa, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping("")
  public ResponseEntity<Map<String, Object>> createPaciente(@RequestBody PacienteDTO paciente) throws Exception {
    mapa.clear();
    try {
      mapa.put("returnValue", pacienteService.createPaciente(paciente));
      UtilitiesMethods.messageCreatorResponse(mapa, "Paciente creado exitosamente", MessageTypes.ok);
      return new ResponseEntity<>(mapa, HttpStatus.CREATED);
    } catch (EntityAlreadyExists e) {
      mapa.put("returnValue", pacienteService.getPacienteByDNI(paciente.getDni()));
      UtilitiesMethods.messageCreatorResponse(mapa, e.getMessage(), MessageTypes.error);
      return new ResponseEntity<>(mapa, HttpStatus.NOT_FOUND);
    } catch (Exception e) {
      UtilitiesMethods.messageCreatorResponse(mapa, e.getMessage(), MessageTypes.error);
      return new ResponseEntity<>(mapa, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @PutMapping("")
  public ResponseEntity<Map<String, Object>> putMethodName(@RequestBody PacienteDTO paciente) {
    mapa.clear();
    try {
      mapa.put("returnValue", pacienteService.updatePaciente(paciente));
      UtilitiesMethods.messageCreatorResponse(mapa, "Paciente actualizado exitosamente", MessageTypes.ok);
      return new ResponseEntity<>(mapa, HttpStatus.OK);
    } catch (ResourceNotFound e) {
      UtilitiesMethods.messageCreatorResponse(mapa, e.getMessage(), MessageTypes.error);
      return new ResponseEntity<>(mapa, HttpStatus.NOT_FOUND);
    } catch (Exception e) {
      UtilitiesMethods.messageCreatorResponse(mapa, e.getMessage(), MessageTypes.error);
      return new ResponseEntity<>(mapa, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
