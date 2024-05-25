package com.clinica_administracion.sistema_administracion_clinica.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.clinica_administracion.sistema_administracion_clinica.DTOs.AreaDTO;
import com.clinica_administracion.sistema_administracion_clinica.others.UtilitiesMethods;
import com.clinica_administracion.sistema_administracion_clinica.others.enums.MessageTypes;
import com.clinica_administracion.sistema_administracion_clinica.others.responseDTOs.GetResponseDTO;
import com.clinica_administracion.sistema_administracion_clinica.others.responseDTOs.ResponseDTO;
import com.clinica_administracion.sistema_administracion_clinica.others.responseDTOs.ReturnResponseDTO;
import com.clinica_administracion.sistema_administracion_clinica.services.AreaService;


@RestController
@RequestMapping("/api/area")
public class AreaController {
  private final AreaService areaService;

  public AreaController(AreaService areaService) {
    this.areaService = areaService;
  }

  @GetMapping("")
  public ResponseEntity<ResponseDTO> getAll() {
    GetResponseDTO response = new GetResponseDTO();
    response.setResults(areaService.getAll());
    return new ResponseEntity<ResponseDTO>(response, HttpStatus.OK);
  }
  
  @GetMapping("/actives")
  public ResponseEntity<ResponseDTO> getByActiveStatus(@RequestParam Boolean valor) throws Exception {
    GetResponseDTO response = new GetResponseDTO();
    response.setResults(areaService.getByActiveState(valor));

    return new ResponseEntity<ResponseDTO>(response, HttpStatus.OK);
  }

  @GetMapping("/id/{id}")
  public ResponseEntity<ResponseDTO> getById(@PathVariable UUID id) throws Exception {
    GetResponseDTO response = new GetResponseDTO();
    List<AreaDTO> list = new ArrayList<>();
    list.add(areaService.getById(id));
    response.setResults(list);

    return new ResponseEntity<ResponseDTO>(response, HttpStatus.OK);
  }

  @GetMapping("/{nombre}")
  public ResponseEntity<ResponseDTO> getByName(@PathVariable String nombre) throws Exception {
    GetResponseDTO response = new GetResponseDTO();
    response.setResults(areaService.getByName(nombre));

    return new ResponseEntity<ResponseDTO>(response, HttpStatus.OK);
  }

  @PostMapping("")
  public ResponseEntity<ResponseDTO> create(@RequestParam String nombre) throws Exception {
    ReturnResponseDTO response = new ReturnResponseDTO();
    response.setReturnValue(areaService.create(nombre));
    response.setMessage(UtilitiesMethods.messageCreator("Área creada con éxito", MessageTypes.ok));

    return new ResponseEntity<ResponseDTO>(response, HttpStatus.CREATED);
  }

  @PutMapping("")
  public ResponseEntity<ResponseDTO> update(@RequestParam UUID id, @RequestParam String nombre) throws Exception {
    ReturnResponseDTO response = new ReturnResponseDTO();
    response.setReturnValue(areaService.update(id, nombre));
    response.setMessage(UtilitiesMethods.messageCreator("Área actualizada con éxito", MessageTypes.ok));

    return new ResponseEntity<ResponseDTO>(response, HttpStatus.OK);
  }

  @PatchMapping("")
  public ResponseEntity<ResponseDTO> changeActiveStatus(@RequestParam UUID id, @RequestParam Boolean valor) throws Exception {
    ReturnResponseDTO response = new ReturnResponseDTO();
    response.setReturnValue(areaService.changeActiveStatus(id, valor));
    response.setMessage(UtilitiesMethods.messageCreator(!valor ? "Área desactivada" : "Área reactivada", MessageTypes.ok));

    return new ResponseEntity<ResponseDTO>(response, HttpStatus.OK);
  }
}
