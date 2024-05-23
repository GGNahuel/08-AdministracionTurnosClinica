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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.clinica_administracion.sistema_administracion_clinica.DTOs.ConsultorioDTO;
import com.clinica_administracion.sistema_administracion_clinica.others.UtilitiesMethods;
import com.clinica_administracion.sistema_administracion_clinica.others.enums.MessageTypes;
import com.clinica_administracion.sistema_administracion_clinica.others.responseDTOs.GetResponseDTO;
import com.clinica_administracion.sistema_administracion_clinica.others.responseDTOs.MessageResponseDTO;
import com.clinica_administracion.sistema_administracion_clinica.others.responseDTOs.ResponseDTO;
import com.clinica_administracion.sistema_administracion_clinica.others.responseDTOs.ReturnResponseDTO;
import com.clinica_administracion.sistema_administracion_clinica.services.ConsultorioService;

@RestController
@RequestMapping("/api/consultorio")
public class ConsultorioController {
  @Autowired
  ConsultorioService consultorioService;

  @GetMapping("")
  public ResponseEntity<ResponseDTO> getAllConsultorios() {
    List<ConsultorioDTO> results = consultorioService.getAll();
    GetResponseDTO response = new GetResponseDTO();
    response.setResults(results);

    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  @GetMapping("/{number}")
  public ResponseEntity<ResponseDTO> getConsultorioByNumber(@PathVariable Integer number) throws Exception {
    ConsultorioDTO consultorio = consultorioService.getByNumber(number);
    GetResponseDTO response = new GetResponseDTO();
    List<ConsultorioDTO> list = new ArrayList<ConsultorioDTO>();
    list.add(consultorio);
    response.setResults(list);
  
    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  @PostMapping("")
  public ResponseEntity<ResponseDTO> createConsultorio(@RequestParam Integer number) throws Exception {
    ConsultorioDTO consultorio = consultorioService.create(number);
    ReturnResponseDTO respuesta = new ReturnResponseDTO();
    respuesta.setReturnValue(consultorio);
    respuesta.setMessage(UtilitiesMethods.messageCreator("Consultorio creado exitosamente", MessageTypes.ok));

    return new ResponseEntity<>(respuesta, HttpStatus.CREATED);
  }

  @PutMapping("")
  public ResponseEntity<ResponseDTO> updateConsultorio(@RequestParam UUID id, @RequestParam Integer number) throws Exception {
    ConsultorioDTO consultorio = consultorioService.update(id, number);
    ReturnResponseDTO respuesta = new ReturnResponseDTO();
    respuesta.setReturnValue(consultorio);
    respuesta.setMessage(UtilitiesMethods.messageCreator("Consultorio actualizado exitosamente", MessageTypes.ok));

    return new ResponseEntity<>(respuesta, HttpStatus.OK);
  }

  @DeleteMapping("")
  public ResponseEntity<ResponseDTO> deleteConsultorio(@RequestParam UUID id) throws Exception {
    consultorioService.delete(id);
    MessageResponseDTO response = new MessageResponseDTO();
    response.setMessage(UtilitiesMethods.messageCreator("Consultorio eliminado", MessageTypes.ok));

    return new ResponseEntity<>(response, HttpStatus.OK);
  }
}
