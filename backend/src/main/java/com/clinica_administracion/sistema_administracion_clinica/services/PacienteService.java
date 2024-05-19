package com.clinica_administracion.sistema_administracion_clinica.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.clinica_administracion.sistema_administracion_clinica.DTOs.PacienteDTO;
import com.clinica_administracion.sistema_administracion_clinica.entities.PacienteEntity;
import com.clinica_administracion.sistema_administracion_clinica.entities.TurnoEntity;
import com.clinica_administracion.sistema_administracion_clinica.others.UtilitiesMethods;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.EntityAlreadyExists;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.ResourceNotFound;
import com.clinica_administracion.sistema_administracion_clinica.repositories.PacienteRepository;
import com.clinica_administracion.sistema_administracion_clinica.repositories.TurnoRepository;
import com.clinica_administracion.sistema_administracion_clinica.services.interfaces.IPacienteService;

import jakarta.annotation.PostConstruct;

@Service
public class PacienteService implements IPacienteService{
  @Autowired PacienteRepository pacienteRepo;
  @Autowired TurnoRepository turnoRepo;
  @Autowired ModelMapper modelMapper;

  @PostConstruct
  public void initializeService() {
    configModelMapper();
  }

  private void configModelMapper() {
    if (modelMapper.getTypeMap(PacienteEntity.class, PacienteDTO.class) != null) {
      return ;
    }
    Converter<List<UUID>, List<TurnoEntity>> convertTurnos = conv ->
      conv.getSource() == null ?
        null :
        conv.getSource().stream().map(
          uuid -> turnoRepo.findById(uuid).orElseThrow(
            () -> new ResourceNotFound("turno", "id", uuid.toString())
          )
        ).toList();
    modelMapper.typeMap(PacienteDTO.class, PacienteEntity.class).addMappings(
      map ->
        map.using(convertTurnos).map(PacienteDTO::getTurnos, PacienteEntity::setTurnos)
    );
  }

  @Transactional(readOnly = true) @Override
  public List<PacienteDTO> getAll() {
    List<PacienteDTO> list = pacienteRepo.findAll().stream().map(
      (paciente) -> modelMapper.map(paciente, PacienteDTO.class)
    ).collect(Collectors.toList());
    return list;
  }

  @Transactional(readOnly = true) @Override
  public PacienteDTO getByDni(String dni) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"dni"}, dni);
    PacienteEntity busqueda = pacienteRepo.findByDni(dni).orElseThrow(() ->
      new ResourceNotFound("Paciente", "dni", dni)
    );
    PacienteDTO paciente = modelMapper.map(busqueda, PacienteDTO.class);
    return paciente;
  }
  
  @Transactional(readOnly = true) @Override
  public PacienteDTO getById(UUID id) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"id"}, id);
    PacienteEntity busqueda = pacienteRepo.findById(id).orElseThrow(() ->
      new ResourceNotFound("Paciente", "id", id.toString())
    );
    return modelMapper.map(busqueda, PacienteDTO.class);
  }

  @Transactional @Override
  public PacienteDTO create(PacienteDTO paciente) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(
      new String[]{"Paciente enviado", "dni", "nombre completo", "número de contacto"}, 
      paciente, paciente.getDni(), paciente.getNombreCompleto(), paciente.getNumeroContacto()
    );
    if (paciente.getDni() != null && pacienteRepo.findByDni(paciente.getDni()).isPresent()) 
      throw new EntityAlreadyExists(
        "Ya existe un paciente con el dni ingresado", 
        this.getByDni(paciente.getDni())
      );

    PacienteEntity pacienteNuevo = modelMapper.map(paciente, PacienteEntity.class);

    return modelMapper.map(pacienteRepo.save(pacienteNuevo), PacienteDTO.class);
  }

  @Transactional @Override
  public PacienteDTO update(PacienteDTO pacienteActualizado) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(
      new String[]{"Paciente enviado", "id", "dni", "nombre completo", "número de contacto"}, 
      pacienteActualizado, pacienteActualizado.getId(), pacienteActualizado.getDni(), 
      pacienteActualizado.getNombreCompleto(), pacienteActualizado.getNumeroContacto()
    );

    PacienteEntity paciente = pacienteRepo.findById(pacienteActualizado.getId()).orElseThrow(() ->
      new ResourceNotFound("Paciente", "id", pacienteActualizado.getId().toString())
    );
    Optional<PacienteEntity> pacienteDni = pacienteRepo.findByDni(pacienteActualizado.getDni());
    if (pacienteDni.isPresent()) {
      if (pacienteDni.get().getId() != paciente.getId())
        throw new EntityAlreadyExists("Ya existe otro paciente con el dni ingresado", pacienteDni.get());
    }

    paciente = modelMapper.map(pacienteActualizado, PacienteEntity.class);
    return modelMapper.map(pacienteRepo.save(paciente), PacienteDTO.class);
  }
}
