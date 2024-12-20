package com.clinica_administracion.sistema_administracion_clinica.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

  @GetMapping("/search")
  public ResponseEntity<ResponseDTO> search(@RequestParam(required = false) Boolean status, @RequestParam(required = false) Boolean schedule) {
    GetResponseDTO response = new GetResponseDTO();
    response.setResults(areaService.searchArea(status, schedule));

    return new ResponseEntity<>(response, HttpStatus.OK);
  }
  
  @GetMapping("/actives")
  public ResponseEntity<ResponseDTO> getByActiveStatus(@RequestParam Boolean valor) throws Exception {
    GetResponseDTO response = new GetResponseDTO();
    response.setResults(areaService.getByActiveState(valor));

    return new ResponseEntity<ResponseDTO>(response, HttpStatus.OK);
  }

  @GetMapping("/id/{id}")
  public ResponseEntity<ResponseDTO> getById(@PathVariable String id) throws Exception {
    GetResponseDTO response = new GetResponseDTO();
    List<AreaDTO> list = new ArrayList<>();
    list.add(areaService.getById(UUID.fromString(id)));
    response.setResults(list);

    return new ResponseEntity<ResponseDTO>(response, HttpStatus.OK);
  }

  @GetMapping("/{nombre}")
  public ResponseEntity<ResponseDTO> getByName(@PathVariable String nombre) throws Exception {
    GetResponseDTO response = new GetResponseDTO();
    response.setResults(areaService.getByName(nombre));

    return new ResponseEntity<ResponseDTO>(response, HttpStatus.OK);
  }

  @GetMapping("/profesional")
  public ResponseEntity<ResponseDTO> getByProffesionalDni(@RequestParam String dni) throws Exception {
    GetResponseDTO response = new GetResponseDTO();
    response.setResults(areaService.getByProffesionalDni(dni));

    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  @PostMapping("")
  @PreAuthorize("hasAnyRole('ADMIN')")
  public ResponseEntity<ResponseDTO> create(@RequestParam String nombre, @RequestParam boolean necesitaTurno) throws Exception {
    ReturnResponseDTO response = new ReturnResponseDTO();
    response.setReturnValue(areaService.create(nombre, necesitaTurno));
    response.setMessage(UtilitiesMethods.messageCreator("Área creada con éxito", MessageTypes.ok));

    return new ResponseEntity<ResponseDTO>(response, HttpStatus.CREATED);
  }

  @PutMapping("")
  @PreAuthorize("hasAnyRole('ADMIN')")
  public ResponseEntity<ResponseDTO> update(@RequestParam String id, @RequestParam String nombre, @RequestParam Boolean necesitaTurno) throws Exception {
    ReturnResponseDTO response = new ReturnResponseDTO();
    response.setReturnValue(areaService.update(UUID.fromString(id), nombre, necesitaTurno));
    response.setMessage(UtilitiesMethods.messageCreator("Área actualizada con éxito", MessageTypes.ok));

    return new ResponseEntity<ResponseDTO>(response, HttpStatus.OK);
  }

  @PatchMapping("")
  @PreAuthorize("hasAnyRole('ADMIN')")
  public ResponseEntity<ResponseDTO> changeActiveStatus(@RequestParam String id, @RequestParam Boolean valor, @RequestParam Boolean turnsAction) throws Exception {
    ReturnResponseDTO response = new ReturnResponseDTO();
    response.setReturnValue(areaService.changeActiveStatus(UUID.fromString(id), valor, turnsAction));
    response.setMessage(UtilitiesMethods.messageCreator(!valor ? "Área desactivada" : "Área reactivada", MessageTypes.ok));

    return new ResponseEntity<ResponseDTO>(response, HttpStatus.OK);
  }
}
