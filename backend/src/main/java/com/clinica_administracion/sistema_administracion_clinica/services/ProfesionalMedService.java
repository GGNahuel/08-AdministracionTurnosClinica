package com.clinica_administracion.sistema_administracion_clinica.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.clinica_administracion.sistema_administracion_clinica.DTOs.ProfesionalMedDTO;
import com.clinica_administracion.sistema_administracion_clinica.entities.ProfesionalMedEntity;
import com.clinica_administracion.sistema_administracion_clinica.others.UtilitiesMethods;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.EntityAlreadyExists;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.ResourceNotFound;
import com.clinica_administracion.sistema_administracion_clinica.repositories.AreaRepository;
import com.clinica_administracion.sistema_administracion_clinica.repositories.ConsultorioRepository;
import com.clinica_administracion.sistema_administracion_clinica.repositories.ProfesionalMedRepository;
import com.clinica_administracion.sistema_administracion_clinica.repositories.TurnoRepository;
import com.clinica_administracion.sistema_administracion_clinica.services.interfaces.IProfesionalMedService;

@Service
public class ProfesionalMedService implements IProfesionalMedService {
  private final ProfesionalMedRepository profesionalRepo;
  private final AreaRepository areaRepo;
  private final ConsultorioRepository consultorioRepo;
  private final TurnoRepository turnoRepo;
  private final ModelMapper modelMapper;

  public ProfesionalMedService(
    ProfesionalMedRepository profesionalRepo,
    AreaRepository areaRepo, ConsultorioRepository consultorioRepo, TurnoRepository turnoRepo,
    ModelMapper modelMapper
  ) {
    this.profesionalRepo = profesionalRepo;
    this.areaRepo = areaRepo; this.consultorioRepo = consultorioRepo; this.turnoRepo = turnoRepo;
    this.modelMapper = modelMapper;
  }

  @Transactional(readOnly = true) @Override
  public List<ProfesionalMedDTO> getAll() {
    return
      profesionalRepo.findAll().stream().map(
        (profesional) -> modelMapper.map(profesional, ProfesionalMedDTO.class)
      ).collect(Collectors.toList());
  }

  @Transactional(readOnly = true) @Override
  public List<ProfesionalMedDTO> search(String busqueda, String matricula, String nombreArea) {
    return
      profesionalRepo.searchProffesionals(busqueda, matricula, nombreArea).stream().map(
        profesional -> modelMapper.map(profesional, ProfesionalMedDTO.class)
      ).toList();
  }

  @Transactional(readOnly = true) @Override
  public List<ProfesionalMedDTO> getAllByArea(String nombreArea) throws Exception {
    return
      profesionalRepo.findByAreaName(nombreArea).stream().map(
        (profesional) -> modelMapper.map(profesional, ProfesionalMedDTO.class)
      ).collect(Collectors.toList());
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
    UtilitiesMethods.validateDniFormat(profesional.getDni());
    UtilitiesMethods.validateConsultorioInDto(profesional.getConsultorio(), consultorioRepo);
    for (String nombre : profesional.getAreas()) {
      UtilitiesMethods.validateAreaInDto(nombre, areaRepo);
    }
    Optional<ProfesionalMedEntity> check = profesionalRepo.findProfesionalByConsultorio(profesional.getConsultorio()); // que tambien vea los horarios
    if (check.isPresent())
      throw new EntityAlreadyExists("Ya existe un profesional asignado al consutorio " + profesional.getConsultorio().toString(), check.get());

    profesional.setActive(true);
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
    UtilitiesMethods.validateDniFormat(profesional.getDni());
    UtilitiesMethods.validateConsultorioInDto(profesional.getConsultorio(), consultorioRepo);
    Optional<ProfesionalMedEntity> check = profesionalRepo.findProfesionalByConsultorio(profesional.getConsultorio()); // que tambien vea los horarios
    if (check.isPresent() && !(check.get().getId().toString()).equals(profesional.getId().toString()))
      throw new EntityAlreadyExists("Ya existe un profesional asignado al consutorio " + profesional.getConsultorio().toString(), check.get());

    for (String nombre : profesional.getAreas()) {
      UtilitiesMethods.validateAreaInDto(nombre, areaRepo);
    }
    profesionalRepo.findById(profesional.getId()).orElseThrow(
      () -> new ResourceNotFound("Profesional médico", "id", profesional.getId().toString())
    );

    ProfesionalMedEntity profesionalMedEntity = modelMapper.map(profesional, ProfesionalMedEntity.class);
    return modelMapper.map(profesionalRepo.save(profesionalMedEntity), ProfesionalMedDTO.class);
  }

  @Transactional @Override
  public ProfesionalMedDTO changeActiveStatus(String profesionalDni, Boolean activeStatus, Boolean changeActiveInTurns) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(
      new String[]{"dni del profesional", "estado de actividad", "acción para los turnos"}, 
      profesionalDni, activeStatus, changeActiveInTurns
    );
    
    ProfesionalMedEntity entityFromDni = profesionalRepo.findByDni(profesionalDni).orElseThrow(
      () -> new ResourceNotFound("Profesional médico", "dni", profesionalDni)
    );
    
    if (changeActiveInTurns) {
      turnoRepo.findByProfesionalDNI(profesionalDni).forEach(
        turno -> {
          turno.setActive(activeStatus);
          turnoRepo.save(turno);
        }
      );;
    }
    
    entityFromDni.setActive(activeStatus);
    return modelMapper.map(profesionalRepo.save(entityFromDni), ProfesionalMedDTO.class);
  }
}
