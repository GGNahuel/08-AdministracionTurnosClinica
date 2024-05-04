package com.clinica_administracion.sistema_administracion_clinica.services;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.clinica_administracion.sistema_administracion_clinica.DTOs.AreaDTO;
import com.clinica_administracion.sistema_administracion_clinica.entities.AreaEntity;
import com.clinica_administracion.sistema_administracion_clinica.others.UtilitiesMethods;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.EntityAlreadyExists;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.ResourceNotFound;
import com.clinica_administracion.sistema_administracion_clinica.repositories.AreaRepository;

@Service
public class AreaService {
  @Autowired AreaRepository areaRepo;
  @Autowired ModelMapper modelMapper;

  @Transactional(readOnly = true)
  public List<AreaDTO> getAll() {
    return
      areaRepo.findAll().stream().map(
        (area) -> modelMapper.map(area, AreaDTO.class)
      ).collect(Collectors.toList());
  }

  @Transactional(readOnly = true)
  public List<AreaDTO> getByActiveState(Boolean valor) {
    return
      areaRepo.findByActiva(valor).stream().map(
        (area) -> modelMapper.map(area, AreaDTO.class)
      ).collect(Collectors.toList());
  }

  @Transactional(readOnly = true)
  public AreaDTO getById(UUID id) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"id"}, id);
    AreaEntity areaEntity = areaRepo.findById(id).orElseThrow(
      () -> new ResourceNotFound("Área", "id", id.toString())
    );

    return modelMapper.map(areaEntity, AreaDTO.class);
  }

  @Transactional(readOnly = true)
  public AreaDTO getByName(String nombre) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"nombre"}, nombre);
    AreaEntity areaEntity = areaRepo.findByNombre(nombre).orElseThrow(
      () -> new ResourceNotFound("Área", "nombre", nombre)
    );
      
    return modelMapper.map(areaEntity, AreaDTO.class);
  }
    
  @Transactional
  public AreaDTO create(String nombre) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"nombre"}, nombre);
    if (areaRepo.findByNombre(nombre).isPresent()) 
      throw new EntityAlreadyExists("Ya existe un área médica con ese nombre", nombre);

    AreaEntity area = new AreaEntity();
    area.setNombre(nombre);
    area.setActiva(true);

    return modelMapper.map(areaRepo.save(area), AreaDTO.class);
  }

  @Transactional
  public AreaDTO update(AreaDTO areaUpdated) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(
      new String[]{"area","id","nombre"}, 
      areaUpdated, areaUpdated.getId(), areaUpdated.getNombre()
    );
    if (areaRepo.findByNombre(areaUpdated.getNombre()).isPresent()) 
      throw new EntityAlreadyExists("Ya existe un área médica con ese nombre", areaUpdated);

    areaRepo.findById(areaUpdated.getId()).orElseThrow(
      () -> new ResourceNotFound("Área médica", "id", areaUpdated.getId().toString())
    );

    AreaEntity area = modelMapper.map(areaUpdated, AreaEntity.class);

    return modelMapper.map(areaRepo.save(area), AreaDTO.class);
  }
  
  @Transactional 
  public AreaDTO changeActiveStatus(UUID id, Boolean valor) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"id"}, id);
    
    AreaEntity area = areaRepo.findById(id).orElseThrow(
      () -> new ResourceNotFound("Área médica", "id", id.toString())
    );
    area.setActiva(valor);  
      
    return modelMapper.map(areaRepo.save(area), AreaDTO.class);
  }
}
