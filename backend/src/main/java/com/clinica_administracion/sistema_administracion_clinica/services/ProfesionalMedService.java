package com.clinica_administracion.sistema_administracion_clinica.services;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.clinica_administracion.sistema_administracion_clinica.DTOs.ProfesionalMedDTO;
import com.clinica_administracion.sistema_administracion_clinica.entities.ConsultorioEntity;
import com.clinica_administracion.sistema_administracion_clinica.entities.ProfesionalMedEntity;
import com.clinica_administracion.sistema_administracion_clinica.others.UtilitiesMethods;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.ResourceNotFound;
import com.clinica_administracion.sistema_administracion_clinica.repositories.ConsultorioRepository;
import com.clinica_administracion.sistema_administracion_clinica.repositories.ProfesionalMedRepository;

@Service
public class ProfesionalMedService {
  @Autowired ProfesionalMedRepository profesionalRepo;
  @Autowired ConsultorioRepository consultorioRepo;
  @Autowired ModelMapper modelMapper;

  private void configModelMapper(ProfesionalMedDTO profesionalMedDTO) {
    if (profesionalMedDTO != null) {
      ConsultorioEntity consultorio = consultorioRepo.findByNumeroConsultorio(profesionalMedDTO.getConsultorio()).orElseThrow(
        () -> new ResourceNotFound("Consultorio", "número", profesionalMedDTO.getConsultorio().toString())
      );
      modelMapper.typeMap(ProfesionalMedDTO.class, ProfesionalMedEntity.class).addMappings(
        (mapper) -> {
          mapper.map(src -> consultorio, ProfesionalMedEntity::setConsultorio);
        }
      );
    }
    modelMapper.typeMap(ProfesionalMedEntity.class, ProfesionalMedDTO.class).addMappings(
      (mapper) -> {
        mapper.map(src -> src.getConsultorio().getNumeroConsultorio(), ProfesionalMedDTO::setConsultorio);
      }
    );
  }

  @Transactional(readOnly = true)
  public List<ProfesionalMedDTO> getAll() {
    return
      profesionalRepo.findAll().stream().map(
        (profesional) -> modelMapper.map(profesional, ProfesionalMedDTO.class)
      ).collect(Collectors.toList());
  }

  @Transactional(readOnly = true)
  public ProfesionalMedDTO getById(UUID id) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"id"}, id);
    ProfesionalMedEntity profesional = profesionalRepo.findById(id).orElseThrow(
      () -> new ResourceNotFound("Profesional médico", "id", id.toString())
    );
    configModelMapper(null);
    return modelMapper.map(profesional, ProfesionalMedDTO.class);
  }
  
  @Transactional(readOnly = true)
  public ProfesionalMedDTO getByDni(String dni) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"dni"}, dni);
    ProfesionalMedEntity profesional = profesionalRepo.findByDni(dni).orElseThrow(
      () -> new ResourceNotFound("Profesional médico", "dni", dni)
    );
    configModelMapper(null);
    return modelMapper.map(profesional, ProfesionalMedDTO.class);
  }

  @Transactional
  public ProfesionalMedDTO create(ProfesionalMedDTO profesional) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(
      new String[]{"profesional", "nombre completo", "dni", "número de contacto", "área", "número de matricula"}, 
      profesional, profesional.getNombreCompleto(), profesional.getDni(), profesional.getNumeroContacto(), 
      profesional.getAreaProfesional(), profesional.getNumMatricula()
    );

    configModelMapper(profesional);

    ProfesionalMedEntity profesionalMedEntity = modelMapper.map(profesional, ProfesionalMedEntity.class);
    return modelMapper.map(profesionalRepo.save(profesionalMedEntity), ProfesionalMedDTO.class);
  }

  @Transactional
  public ProfesionalMedDTO update(ProfesionalMedDTO profesional) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(
      new String[]{"profesional", "id", "nombre completo", "dni", "número de contacto", "área", "número de matricula"}, 
      profesional, profesional.getId(), profesional.getNombreCompleto(), profesional.getDni(), profesional.getNumeroContacto(), 
      profesional.getAreaProfesional(), profesional.getNumMatricula()
    );

    profesionalRepo.findById(profesional.getId()).orElseThrow(
      () -> new ResourceNotFound("Profesional médico", "id", profesional.getId().toString())
    );
    configModelMapper(profesional);

    ProfesionalMedEntity profesionalMedEntity = modelMapper.map(profesional, ProfesionalMedEntity.class);
    return modelMapper.map(profesionalRepo.save(profesionalMedEntity), ProfesionalMedDTO.class);
  }
}
