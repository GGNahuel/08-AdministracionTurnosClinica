package com.clinica_administracion.sistema_administracion_clinica.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.clinica_administracion.sistema_administracion_clinica.DTOs.ConsultorioDTO;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.EntityAlreadyExists;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.ResourceNotFound;
import com.clinica_administracion.sistema_administracion_clinica.services.ConsultorioService;





@RestController
@RequestMapping("/api/consultorio")
public class ConsultorioController {
  @Autowired ConsultorioService consultorioService;

  @GetMapping("")
  public ResponseEntity<Map<String,Object>> getAllConsultorios() {
    Map<String, Object> mapa = new HashMap<>();
    try {
      List<ConsultorioDTO> results = consultorioService.getAllConsultorios();
      mapa.put("results", results);
      return new ResponseEntity<Map<String,Object>>(mapa, HttpStatus.OK);
    } catch (Exception e) {
      mapa.put("message", e.getMessage());
      return new ResponseEntity<Map<String,Object>>(mapa, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/{number}")
  public Map<String, Object> getConsultorioByNumber(@PathVariable Integer number) {
    Map<String, Object> mapa = new HashMap<>();
    try {
      ConsultorioDTO consultorio = consultorioService.getConsultorioByNumber(number);
      mapa.put("results", consultorio);
    } catch (Exception e) {
      mapa.put("message", e.getMessage());
    }
    return mapa;
  }
  
  @PostMapping("/{number}")
  public ResponseEntity<Map<String,Object>> createConsultorio(@PathVariable Integer number) {
    Map<String, Object> mapa = new HashMap<>();
    try {
      ConsultorioDTO consultorio = consultorioService.createConsultorio(number);
      mapa.put("returnValue", consultorio);
      mapa.put("message", "Consultorio creado exitosamente");
      return new ResponseEntity<Map<String,Object>>(mapa, HttpStatus.CREATED);
    } catch (EntityAlreadyExists e) {
      mapa.put("message", e.getMessage());
      return new ResponseEntity<Map<String,Object>>(mapa, HttpStatus.BAD_REQUEST);
    } catch (Exception e) {
      mapa.put("message", e.getMessage());
      return new ResponseEntity<Map<String,Object>>(mapa, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @PutMapping("/edit")
  public ResponseEntity<Map<String,Object>> updateConsultorio(@RequestParam UUID id, @RequestParam Integer number) {
    Map<String, Object> mapa = new HashMap<>();
    try {
      mapa.put("returnValue", consultorioService.updateConsultorio(id, number));
      mapa.put("messaje", "Consultorio actualizado exitosamente");
      return new ResponseEntity<Map<String,Object>>(mapa, HttpStatus.OK);
    } catch (ResourceNotFound e) {
      mapa.put("message", e.getMessage());
      return new ResponseEntity<Map<String,Object>>(mapa, HttpStatus.NOT_FOUND);
    } catch (Exception e) {
      mapa.put("message", e.getMessage());
      return new ResponseEntity<Map<String,Object>>(mapa, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("")
  public ResponseEntity<Map<String, Object>> deleteConsultorio(@RequestParam UUID id) {
    Map<String, Object> mapa = new HashMap<>();
    try {
      consultorioService.deleteConsultorio(id);
      mapa.put("message", "Consultorio eliminado");
      return new ResponseEntity<Map<String,Object>>(mapa, HttpStatus.OK);
    } catch (ResourceNotFound e) {
      mapa.put("message", e.getMessage());
      return new ResponseEntity<Map<String,Object>>(mapa, HttpStatus.NOT_FOUND);
    } catch (Exception e) {
      mapa.put("message", e.getMessage());
      return new ResponseEntity<Map<String,Object>>(mapa, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
