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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.clinica_administracion.sistema_administracion_clinica.dtos.ProfesionalMedDTO;
import com.clinica_administracion.sistema_administracion_clinica.dtos.responseDtos.GetResponseDTO;
import com.clinica_administracion.sistema_administracion_clinica.dtos.responseDtos.ResponseDTO;
import com.clinica_administracion.sistema_administracion_clinica.dtos.responseDtos.ReturnResponseDTO;
import com.clinica_administracion.sistema_administracion_clinica.others.UtilitiesMethods;
import com.clinica_administracion.sistema_administracion_clinica.others.enums.MessageTypes;
import com.clinica_administracion.sistema_administracion_clinica.services.ProfesionalMedService;

@RestController
@RequestMapping("/api/profesional")
public class ProfesionalMedController {
  private final ProfesionalMedService profesionalMedService;

  public ProfesionalMedController(ProfesionalMedService profesionalMedService) {
    this.profesionalMedService = profesionalMedService;
  }

  @GetMapping("")
  public ResponseEntity<ResponseDTO> getAll() {
    GetResponseDTO response = new GetResponseDTO();
    response.setResults(profesionalMedService.getAll());
    return new ResponseEntity<ResponseDTO>(response, HttpStatus.OK);
  }

  @GetMapping("/search")
  public ResponseEntity<ResponseDTO> search(
    @RequestParam(required = false) String search, @RequestParam(required = false) String matricula, @RequestParam(required = false) String area
  ) {
    GetResponseDTO response = new GetResponseDTO();
    response.setResults(profesionalMedService.search(search, matricula, area));

    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  @GetMapping("/id/{id}")
  public ResponseEntity<ResponseDTO> getById(@PathVariable String id) throws Exception {
    GetResponseDTO response = new GetResponseDTO();
    List<ProfesionalMedDTO> list = new ArrayList<>();
    ProfesionalMedDTO profesional = profesionalMedService.getById(UUID.fromString(id));
    list.add(profesional);
    response.setResults(list);

    return new ResponseEntity<ResponseDTO>(response, HttpStatus.OK);
  }
  
  @GetMapping("/{dni}")
  public ResponseEntity<ResponseDTO> getByDni(@PathVariable String dni) throws Exception {
    GetResponseDTO response = new GetResponseDTO();
    List<ProfesionalMedDTO> list = new ArrayList<>();
    ProfesionalMedDTO profesional = profesionalMedService.getByDni(dni);
    list.add(profesional);
    response.setResults(list);

    return new ResponseEntity<ResponseDTO>(response, HttpStatus.OK);
  }

  @GetMapping("/area/{area}")
  public ResponseEntity<ResponseDTO> getByArea(@PathVariable String area) throws Exception {
    GetResponseDTO responseDTO = new GetResponseDTO();
    List<ProfesionalMedDTO> list = profesionalMedService.getAllByArea(area);
    responseDTO.setResults(list);

    return new ResponseEntity<ResponseDTO>(responseDTO, HttpStatus.OK);
  }
  
  @PostMapping("")
  @PreAuthorize("hasAnyRole('ADMIN')")
  public ResponseEntity<ResponseDTO> create(@RequestBody ProfesionalMedDTO profesional) throws Exception {
    ReturnResponseDTO response = new ReturnResponseDTO();
    response.setReturnValue(profesionalMedService.create(profesional));
    response.setMessage(UtilitiesMethods.messageCreator("Profesional médico creado exitosamente", MessageTypes.ok));

    return new ResponseEntity<ResponseDTO>(response, HttpStatus.CREATED);
  }

  @PutMapping("")
  @PreAuthorize("hasAnyRole('ADMIN', 'PROFFESIONAL')")
  public ResponseEntity<ResponseDTO> update(@RequestBody ProfesionalMedDTO profesional) throws Exception {
    ReturnResponseDTO response = new ReturnResponseDTO();
    response.setReturnValue(profesionalMedService.update(profesional));
    response.setMessage(UtilitiesMethods.messageCreator("Profesional médico actualizado exitosamente", MessageTypes.ok));

    return new ResponseEntity<ResponseDTO>(response, HttpStatus.OK);
  }

  @PatchMapping("")
  @PreAuthorize("hasAnyRole('ADMIN')")
  public ResponseEntity<ResponseDTO> changeActiveStatus(@RequestParam String profesionalDni, @RequestParam Boolean activeStatus, 
    @RequestParam Boolean turnsAction
  ) throws Exception {
    ReturnResponseDTO response = new ReturnResponseDTO();
    response.setReturnValue(profesionalMedService.changeActiveStatus(profesionalDni, activeStatus, turnsAction));
    response.setMessage(UtilitiesMethods.messageCreator("Valor de actividad cambiado con éxito", MessageTypes.ok));

    return new ResponseEntity<>(response, HttpStatus.OK);
  }
}
