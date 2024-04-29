package com.clinica_administracion.sistema_administracion_clinica.services;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.clinica_administracion.sistema_administracion_clinica.DTOs.PacienteDTO;
import com.clinica_administracion.sistema_administracion_clinica.entities.PacienteEntity;
import com.clinica_administracion.sistema_administracion_clinica.others.UtilitiesMethods;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.EntityAlreadyExists;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.ResourceNotFound;
import com.clinica_administracion.sistema_administracion_clinica.repositories.PacienteRepository;

@Service
public class PacienteService {
  @Autowired PacienteRepository pacienteRepo;
  @Autowired ModelMapper modelMapper;

  @Transactional(readOnly = true)
  public List<PacienteDTO> getAllPacientes() {
    List<PacienteDTO> list = pacienteRepo.findAll().stream().map(
      (paciente) -> modelMapper.map(paciente, PacienteDTO.class)
    ).collect(Collectors.toList());
    return list;
  }

  @Transactional(readOnly = true)
  public PacienteDTO getPacienteByDNI(String dni) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"dni"}, dni);
    PacienteEntity busqueda = pacienteRepo.findByDni(dni).orElseThrow(() ->
      new ResourceNotFound("Paciente", "dni", dni)
    );
    PacienteDTO paciente = modelMapper.map(busqueda, PacienteDTO.class);
    return paciente;
  }
  
  @Transactional(readOnly = true)
  public PacienteDTO getPaciente(UUID id) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"id"}, id);
    PacienteEntity busqueda = pacienteRepo.findById(id).orElseThrow(() ->
      new ResourceNotFound("Paciente", "id", id.toString())
    );
    return modelMapper.map(busqueda, PacienteDTO.class);
  }

  @Transactional
  public PacienteDTO createPaciente(PacienteDTO paciente) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"Paciente enviado"}, paciente.toString());
    if (paciente.getDni() != null && pacienteRepo.findByDni(paciente.getDni()).isPresent()) 
      throw new EntityAlreadyExists("Ya existe un paciente con el dni ingresado");

    PacienteEntity pacienteNuevo = modelMapper.map(paciente, PacienteEntity.class);

    return modelMapper.map(pacienteRepo.save(pacienteNuevo), PacienteDTO.class);
  }

  @Transactional
  public PacienteDTO updatePaciente(PacienteDTO pacienteActualizado) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"Paciente enviado"}, pacienteActualizado.toString());
    PacienteEntity pacienteNuevo = pacienteRepo.findById(pacienteActualizado.getId()).orElseThrow(() ->
      new ResourceNotFound("Paciente", "id", pacienteActualizado.getId().toString())
    );
    pacienteNuevo.setNombreCompleto(pacienteActualizado.getNombreCompleto());
    pacienteNuevo.setNumeroContacto(pacienteActualizado.getNumeroContacto());
    pacienteNuevo.setDni(pacienteActualizado.getDni());
    pacienteNuevo.setObraSocial(pacienteActualizado.getObraSocial());
    pacienteNuevo.setTurnos(pacienteActualizado.getTurnos());

    return modelMapper.map(pacienteRepo.save(pacienteNuevo), PacienteDTO.class);
  }
}
