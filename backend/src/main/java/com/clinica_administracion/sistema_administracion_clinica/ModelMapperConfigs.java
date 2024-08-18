package com.clinica_administracion.sistema_administracion_clinica;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.clinica_administracion.sistema_administracion_clinica.DTOs.PacienteDTO;
import com.clinica_administracion.sistema_administracion_clinica.DTOs.ProfesionalMedDTO;
import com.clinica_administracion.sistema_administracion_clinica.DTOs.TurnoDTO;
import com.clinica_administracion.sistema_administracion_clinica.entities.AreaEntity;
import com.clinica_administracion.sistema_administracion_clinica.entities.ConsultorioEntity;
import com.clinica_administracion.sistema_administracion_clinica.entities.PacienteEntity;
import com.clinica_administracion.sistema_administracion_clinica.entities.ProfesionalMedEntity;
import com.clinica_administracion.sistema_administracion_clinica.entities.TurnoEntity;
import com.clinica_administracion.sistema_administracion_clinica.others.UtilitiesMethods;
import com.clinica_administracion.sistema_administracion_clinica.repositories.AreaRepository;
import com.clinica_administracion.sistema_administracion_clinica.repositories.ConsultorioRepository;
import com.clinica_administracion.sistema_administracion_clinica.repositories.PacienteRepository;
import com.clinica_administracion.sistema_administracion_clinica.repositories.ProfesionalMedRepository;

@Configuration
public class ModelMapperConfigs {
  private final PacienteRepository pacienteRepo;
  private final ProfesionalMedRepository profesionalRepo;
  private final ConsultorioRepository consultorioRepo;
  private final AreaRepository areaRepo;

  public ModelMapperConfigs(
    PacienteRepository pacienteRepo, ProfesionalMedRepository profesionalRepo, 
    ConsultorioRepository consultorioRepo, AreaRepository areaRepo
  ) {
    this.pacienteRepo = pacienteRepo; this.profesionalRepo = profesionalRepo;
    this.consultorioRepo = consultorioRepo; this.areaRepo = areaRepo;
  }
  
  @Bean
  ModelMapper modelMapper() {
    ModelMapper modelMapper = new ModelMapper();

    // configurePacienteMapping(modelMapper);
    configureTurnoMapping(modelMapper);
    configureProfesionalMapping(modelMapper);

		return modelMapper;
	}

/*   public void configurePacienteMapping(ModelMapper modelMapper) {
    Converter<List<UUID>, List<TurnoEntity>> convertTurnos = conv ->
      conv.getSource() == null ?
        null :
        conv.getSource().stream().map(
          uuid -> turnoRepo.findById(uuid).get()
        ).toList();
    modelMapper.typeMap(PacienteDTO.class, PacienteEntity.class).addMappings(
      mapper -> mapper.using(convertTurnos).map(PacienteDTO::getTurnos, PacienteEntity::setTurnos)
    );

    Converter<List<TurnoEntity>, List<UUID>> convertUuid = conv ->
      conv.getSource() == null ? 
      null :
      conv.getSource().stream().map(
        turnoE -> turnoE.getId()
      ).toList();
    modelMapper.typeMap(PacienteEntity.class, PacienteDTO.class).addMappings(
      mapper -> mapper.using(convertUuid).map(src -> src.getTurnos(), PacienteDTO::setTurnos)
    );
  } */

  public void configureTurnoMapping(ModelMapper modelMapper) {
    Converter<PacienteDTO, PacienteEntity> pacienteEntityConv = conv ->
      conv.getSource() == null ? 
        null : pacienteRepo.findByDni(conv.getSource().getDni()).get();
    Converter<ProfesionalMedDTO, ProfesionalMedEntity> profesionalEntityConv = conv ->
      conv.getSource() == null ? 
        null : profesionalRepo.findByDni(conv.getSource().getDni()).get();
    Converter<Integer, ConsultorioEntity> consultorioEntityConv = conv -> 
      conv.getSource() == null ? 
        null :  consultorioRepo.findByNumeroConsultorio(conv.getSource()).get();
    Converter<String, AreaEntity> areaEntityConv = conv ->
      conv.getSource() == null ? 
        null : areaRepo.findByNombre(conv.getSource()).get();
    Converter<String, LocalDate> fechaConv = conv -> 
      conv.getSource() == null ? 
        null : LocalDate.parse(conv.getSource(), UtilitiesMethods.formatoFecha);
    Converter<String, LocalTime> horarioConv = conv ->
      conv.getSource() == null ?
        null : LocalTime.parse(conv.getSource());

    modelMapper.emptyTypeMap(TurnoDTO.class, TurnoEntity.class).addMappings(
      (mapper) -> {
        mapper.using(pacienteEntityConv).map(TurnoDTO::getPacienteDto, TurnoEntity::setPaciente);
        mapper.using(profesionalEntityConv).map(TurnoDTO::getProfesionalDto, TurnoEntity::setProfesional);
        mapper.using(consultorioEntityConv).map(TurnoDTO::getConsultorio, TurnoEntity::setConsultorio);
        mapper.using(areaEntityConv).map(TurnoDTO::getAreaProfesional, TurnoEntity::setAreaProfesional);
        mapper.using(fechaConv).map(TurnoDTO::getFecha, TurnoEntity::setFecha);
        mapper.using(horarioConv).map(TurnoDTO::getHorario, TurnoEntity::setHorario);
      }
    );

    modelMapper.typeMap(TurnoEntity.class, TurnoDTO.class).addMappings(
      (mapper) -> {
        mapper.map(src -> src.getPaciente(), TurnoDTO::setPacienteDto);
        mapper.map(src -> src.getProfesional(), TurnoDTO::setProfesionalDto);
        mapper.map(src -> src.getConsultorio().getNumeroConsultorio(), TurnoDTO::setConsultorio);
        mapper.map(src -> src.getAreaProfesional().getNombre(), TurnoDTO::setAreaProfesional);
      }
    );
  }

  public void configureProfesionalMapping(ModelMapper modelMapper) {
    if (modelMapper.getTypeMap(ProfesionalMedDTO.class, ProfesionalMedEntity.class) != null) 
      return ;

    Converter<Integer, ConsultorioEntity> getterConsultorioEntity = 
      conv -> conv.getSource() == null ? 
        null : consultorioRepo.findByNumeroConsultorio(conv.getSource()).get();
    Converter<List<String>, List<AreaEntity>> getterAreaEntities =
      conv -> conv.getSource() == null ?
        null : conv.getSource().stream().map(nombre -> areaRepo.findByNombre(nombre).get()).toList();

    modelMapper.typeMap(ProfesionalMedDTO.class, ProfesionalMedEntity.class).addMappings(
      (mapper) -> {
        mapper.using(getterConsultorioEntity).map(ProfesionalMedDTO::getConsultorio, ProfesionalMedEntity::setConsultorio);
        mapper.using(getterAreaEntities).map(ProfesionalMedDTO::getAreas, ProfesionalMedEntity::setAreas);
      }
    );

    Converter<List<AreaEntity>, List<String>> extractIds = 
      conv -> conv.getSource() == null ? 
        null : 
        conv.getSource().stream().map((area) -> area.getNombre()).toList();

    modelMapper.typeMap(ProfesionalMedEntity.class, ProfesionalMedDTO.class).addMappings(
      (mapper) -> {
        mapper.map(src -> src.getConsultorio().getNumeroConsultorio(), ProfesionalMedDTO::setConsultorio);
        mapper.using(extractIds).map(ProfesionalMedEntity::getAreas, ProfesionalMedDTO::setAreas);
      }
    );
  }
}
