package com.clinica_administracion.sistema_administracion_clinica.services;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.clinica_administracion.sistema_administracion_clinica.DTOs.AreaDTO;
import com.clinica_administracion.sistema_administracion_clinica.entities.AreaEntity;
import com.clinica_administracion.sistema_administracion_clinica.entities.ProfesionalMedEntity;
import com.clinica_administracion.sistema_administracion_clinica.others.UtilitiesMethods;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.EntityAlreadyExists;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.ResourceNotFound;
import com.clinica_administracion.sistema_administracion_clinica.repositories.AreaRepository;
import com.clinica_administracion.sistema_administracion_clinica.repositories.ProfesionalMedRepository;
import com.clinica_administracion.sistema_administracion_clinica.repositories.TurnoRepository;
import com.clinica_administracion.sistema_administracion_clinica.services.interfaces.IAreaService;

@Service
public class AreaService implements IAreaService{
  private final AreaRepository areaRepo;
  private final TurnoRepository turnoRepo;
  private final ProfesionalMedRepository profesionalMedRepo;
  private final ModelMapper modelMapper;

  public AreaService(AreaRepository areaRepo, TurnoRepository turnoRepo, ProfesionalMedRepository profesionalMedRepo, ModelMapper modelMapper) {
    this.areaRepo = areaRepo; this.modelMapper = modelMapper; this.turnoRepo = turnoRepo; this.profesionalMedRepo = profesionalMedRepo;
  }

  @Transactional(readOnly = true) @Override
  public List<AreaDTO> getAll() {
    return
      areaRepo.findAll().stream().map(
        (area) -> modelMapper.map(area, AreaDTO.class)
      ).collect(Collectors.toList());
  }

  @Transactional(readOnly = true) @Override
  public List<AreaDTO> searchArea(Boolean activeStatus, Boolean needSchedule) {
    return
      areaRepo.searchAreas(activeStatus, needSchedule).stream().map(
        (area) -> modelMapper.map(area, AreaDTO.class)
      ).toList();
  }

  @Transactional(readOnly = true) @Override
  public List<AreaDTO> getByActiveState(Boolean valor) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"Estado de actividad"}, valor);
    return
      areaRepo.findByActiva(valor).stream().map(
        (area) -> modelMapper.map(area, AreaDTO.class)
      ).collect(Collectors.toList());
  }

  @Transactional(readOnly = true) @Override
  public AreaDTO getById(UUID id) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"id"}, id);
    AreaEntity areaEntity = areaRepo.findById(id).orElseThrow(
      () -> new ResourceNotFound("Área", "id", id.toString())
    );

    return modelMapper.map(areaEntity, AreaDTO.class);
  }

  @Transactional(readOnly = true) @Override
  public List<AreaDTO> getByName(String nombre) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"nombre"}, nombre);
    List<AreaEntity> areaEntities = areaRepo.findByNombreLike(UtilitiesMethods.normaliceString(nombre));
    if (areaEntities.size() == 0)
    throw new ResourceNotFound("Área", "nombre", nombre);
    
    return 
    areaEntities.stream().map(
      (area) -> modelMapper.map(area, AreaDTO.class)
    ).toList();
  }

  @Transactional(readOnly = true) @Override
  public List<AreaDTO> getByProffesionalDni(String dni) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"dni del profesional"}, dni);
    ProfesionalMedEntity proffesional = profesionalMedRepo.findByDni(dni).orElseThrow(
      () -> new ResourceNotFound("profesional médico", "dni", dni)
    );
    
    return proffesional.getAreas().stream().map(
      area -> modelMapper.map(area, AreaDTO.class)
    ).toList();
  }
    
  @Transactional @Override
  public AreaDTO create(String nombre, boolean necesitaTurno) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"nombre", "necesita turno"}, nombre, necesitaTurno);
    if (areaRepo.findByNombre(nombre).isPresent()) 
      throw new EntityAlreadyExists("Ya existe un área médica con ese nombre", nombre);

    AreaEntity area = new AreaEntity();
    area.setNombre(nombre);
    area.setSearchName(UtilitiesMethods.normaliceString(nombre));
    area.setActive(true);
    area.setNecesitaTurno(necesitaTurno);

    return modelMapper.map(areaRepo.save(area), AreaDTO.class);
  }

  @Transactional @Override
  public AreaDTO update(UUID id, String nombre, boolean necesitaTurno) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(
      new String[]{"id","nombre", "necesita turno"}, id, nombre, necesitaTurno
    );
    
    AreaEntity area = areaRepo.findById(id).orElseThrow(
      () -> new ResourceNotFound("Área médica", "id", id.toString())
    );

    AreaEntity areaWithSameNombre = areaRepo.findByNombre(nombre).orElse(null);
    if (areaWithSameNombre != null && areaWithSameNombre.getId() != area.getId()) 
      throw new EntityAlreadyExists("Ya existe un área médica con ese nombre", areaRepo.findByNombre(nombre).get());

    area.setNombre(nombre);
    area.setNecesitaTurno(necesitaTurno);

    return modelMapper.map(areaRepo.save(area), AreaDTO.class);
  }
  
  @Transactional @Override
  public AreaDTO changeActiveStatus(UUID id, Boolean activeStatus, Boolean changeActiveInTurns) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"id", "estado de actividad"}, id, activeStatus);
    
    AreaEntity area = areaRepo.findById(id).orElseThrow(
      () -> new ResourceNotFound("Área médica", "id", id.toString())
    );
    area.setActive(activeStatus);  

    if (changeActiveInTurns) {
      turnoRepo.findByArea(area.getNombre()).forEach(
        turno -> {
          turno.setActive(activeStatus);
          turnoRepo.save(turno);
        }
      );;
    }
      
    return modelMapper.map(areaRepo.save(area), AreaDTO.class);
  }
}
