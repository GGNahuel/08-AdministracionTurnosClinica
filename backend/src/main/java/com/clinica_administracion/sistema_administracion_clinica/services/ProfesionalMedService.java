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

import com.clinica_administracion.sistema_administracion_clinica.DTOs.ProfesionalMedDTO;
import com.clinica_administracion.sistema_administracion_clinica.entities.AreaEntity;
import com.clinica_administracion.sistema_administracion_clinica.entities.ConsultorioEntity;
import com.clinica_administracion.sistema_administracion_clinica.entities.ProfesionalMedEntity;
import com.clinica_administracion.sistema_administracion_clinica.others.UtilitiesMethods;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.EntityAlreadyExists;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.ResourceNotFound;
import com.clinica_administracion.sistema_administracion_clinica.repositories.AreaRepository;
import com.clinica_administracion.sistema_administracion_clinica.repositories.ConsultorioRepository;
import com.clinica_administracion.sistema_administracion_clinica.repositories.ProfesionalMedRepository;
import com.clinica_administracion.sistema_administracion_clinica.services.interfaces.IProfesionalMedService;

import jakarta.annotation.PostConstruct;

@Service
public class ProfesionalMedService implements IProfesionalMedService {
  @Autowired ProfesionalMedRepository profesionalRepo;
  @Autowired AreaRepository areaRepo;
  @Autowired ConsultorioRepository consultorioRepo;
  @Autowired ModelMapper modelMapper;

  @PostConstruct
  public void initialiceService() {
    this.configModelMapper();
  }

  private void configModelMapper() {
    if (modelMapper.getTypeMap(ProfesionalMedDTO.class, ProfesionalMedEntity.class) != null) 
      return ;

    Converter<Integer, ConsultorioEntity> getterConsultorioEntity = 
      conv -> conv.getSource() == null ? 
        null : 
        consultorioRepo.findByNumeroConsultorio(conv.getSource()).orElseThrow(
          () -> new ResourceNotFound("Consultorio", "número", conv.getSource().toString())
        );
    Converter<List<String>, List<AreaEntity>> getterAreaEntities =
      conv -> conv.getSource() == null ?
        null :
        conv.getSource().stream().map(
          nombre -> areaRepo.findByNombre(nombre).orElseThrow(
            () -> new ResourceNotFound("Consultorio", "número", nombre.toString())
          )
        ).toList();
    modelMapper.typeMap(ProfesionalMedDTO.class, ProfesionalMedEntity.class).addMappings(
      (mapper) -> {
        mapper.using(getterConsultorioEntity).map(ProfesionalMedDTO::getConsultorio, ProfesionalMedEntity::setConsultorio);
        mapper.using(getterAreaEntities).map(ProfesionalMedDTO::getAreas, ProfesionalMedEntity::setAreas);
      }
    );

    Converter<List<AreaEntity>, List<String>> extractIds = 
      conv -> conv.getSource() == null ? 
        null : 
        conv.getSource().stream().map(
          (area) -> area.getNombre()
        ).toList();
    modelMapper.typeMap(ProfesionalMedEntity.class, ProfesionalMedDTO.class).addMappings(
      (mapper) -> {
        mapper.map(src -> src.getConsultorio().getNumeroConsultorio(), ProfesionalMedDTO::setConsultorio);
        mapper.using(extractIds).map(ProfesionalMedEntity::getAreas, ProfesionalMedDTO::setAreas);
      }
    );
  }

  @Transactional(readOnly = true) @Override
  public List<ProfesionalMedDTO> getAll() {
    return
      profesionalRepo.findAll().stream().map(
        (profesional) -> modelMapper.map(profesional, ProfesionalMedDTO.class)
      ).collect(Collectors.toList())
    ;
  }

  @Transactional(readOnly = true)
  public ProfesionalMedDTO getById(UUID id) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"id"}, id);
    ProfesionalMedEntity profesional = profesionalRepo.findById(id).orElseThrow(
      () -> new ResourceNotFound("Profesional médico", "id", id.toString())
    );

    return modelMapper.map(profesional, ProfesionalMedDTO.class);
  }

  @Transactional(readOnly = true) @Override
  public ProfesionalMedDTO getByDni(String dni) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"dni"}, dni);
    ProfesionalMedEntity profesional = profesionalRepo.findByDni(dni).orElseThrow(
      () -> new ResourceNotFound("Profesional médico", "dni", dni)
    );

    return modelMapper.map(profesional, ProfesionalMedDTO.class);
  }

  @Transactional @Override
  public ProfesionalMedDTO create(ProfesionalMedDTO profesional) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(
      new String[]{"profesional", "nombre completo", "dni", "número de contacto", "área", "número de matricula"}, 
      profesional, profesional.getNombreCompleto(), profesional.getDni(), profesional.getNumeroContacto(), 
      profesional.getAreas(), profesional.getNumMatricula()
    );
    Optional<ProfesionalMedEntity> check = profesionalRepo.findProfesionalByConsultorio(profesional.getConsultorio());
    if (check.isPresent())
      throw new EntityAlreadyExists("Ya existe un profesional asignado al consutorio " + profesional.getConsultorio().toString(), check.get());

    ProfesionalMedEntity profesionalMedEntity = modelMapper.map(profesional, ProfesionalMedEntity.class);
    return modelMapper.map(profesionalRepo.save(profesionalMedEntity), ProfesionalMedDTO.class);
  }

  @Transactional @Override
  public ProfesionalMedDTO update(ProfesionalMedDTO profesional) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(
      new String[]{"profesional", "id", "nombre completo", "dni", "número de contacto", "área", "número de matricula"}, 
      profesional, profesional.getId(), profesional.getNombreCompleto(), profesional.getDni(), profesional.getNumeroContacto(), 
      profesional.getAreas(), profesional.getNumMatricula()
    );

    profesionalRepo.findById(profesional.getId()).orElseThrow(
      () -> new ResourceNotFound("Profesional médico", "id", profesional.getId().toString())
    );

    ProfesionalMedEntity profesionalMedEntity = modelMapper.map(profesional, ProfesionalMedEntity.class);
    return modelMapper.map(profesionalRepo.save(profesionalMedEntity), ProfesionalMedDTO.class);
  }
}
