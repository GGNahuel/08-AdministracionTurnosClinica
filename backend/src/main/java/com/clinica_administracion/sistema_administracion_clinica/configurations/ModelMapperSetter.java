package com.clinica_administracion.sistema_administracion_clinica.configurations;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.clinica_administracion.sistema_administracion_clinica.dtos.AreaDTO;
import com.clinica_administracion.sistema_administracion_clinica.dtos.ProfesionalMedDTO;
import com.clinica_administracion.sistema_administracion_clinica.dtos.TurnoDTO;
import com.clinica_administracion.sistema_administracion_clinica.dtos.UserFrontDTO;
import com.clinica_administracion.sistema_administracion_clinica.entities.AreaEntity;
import com.clinica_administracion.sistema_administracion_clinica.entities.ConsultorioEntity;
import com.clinica_administracion.sistema_administracion_clinica.entities.ProfesionalMedEntity;
import com.clinica_administracion.sistema_administracion_clinica.entities.TurnoEntity;
import com.clinica_administracion.sistema_administracion_clinica.entities.UserEntity;
import com.clinica_administracion.sistema_administracion_clinica.others.UtilitiesMethods;
import com.clinica_administracion.sistema_administracion_clinica.repositories.AreaRepository;
import com.clinica_administracion.sistema_administracion_clinica.repositories.ConsultorioRepository;
import com.clinica_administracion.sistema_administracion_clinica.repositories.ProfesionalMedRepository;

@Configuration
public class ModelMapperSetter {
  private final ConsultorioRepository consultorioRepo;
  private final AreaRepository areaRepo;
  private final ProfesionalMedRepository profesionalRepo;

  public ModelMapperSetter(ConsultorioRepository consultorioRepo, AreaRepository areaRepo, ProfesionalMedRepository profesionalRepo) {
    this.consultorioRepo = consultorioRepo; this.areaRepo = areaRepo; this.profesionalRepo = profesionalRepo;
  }
  
  @Bean
  ModelMapper modelMapper() {
    ModelMapper modelMapper = new ModelMapper();

    // configurePacienteMapping(modelMapper);
    configureTurnoMapping(modelMapper);
    configureProfesionalMapping(modelMapper);
    configureUserMapping(modelMapper);

		return modelMapper;
	}

  public void configureTurnoMapping(ModelMapper modelMapper) {
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

    modelMapper.typeMap(TurnoDTO.class, TurnoEntity.class).addMappings(
      (mapper) -> {
      //  mapper.using(pacienteEntityConv).map(TurnoDTO::getPacienteDto, TurnoEntity::setPaciente);
      //  mapper.using(profesionalEntityConv).map(TurnoDTO::getProfesionalDto, TurnoEntity::setProfesional);
        mapper.using(consultorioEntityConv).map(TurnoDTO::getConsultorio, TurnoEntity::setConsultorio);
        mapper.using(areaEntityConv).map(TurnoDTO::getAreaProfesional, TurnoEntity::setAreaProfesional);
        mapper.using(fechaConv).map(TurnoDTO::getFecha, TurnoEntity::setFecha);
        mapper.using(horarioConv).map(TurnoDTO::getHorario, TurnoEntity::setHorario);
      }
    );

    Converter<LocalDate, String> fechaEntityConv = conv ->
      conv.getSource() == null ?
        null : conv.getSource().format(UtilitiesMethods.formatoFecha);

    modelMapper.typeMap(TurnoEntity.class, TurnoDTO.class).addMappings(
      (mapper) -> {
        mapper.map(src -> src.getPaciente(), TurnoDTO::setPacienteDto);
        mapper.map(src -> src.getProfesional(), TurnoDTO::setProfesionalDto);
        mapper.map(src -> src.getConsultorio().getNumeroConsultorio(), TurnoDTO::setConsultorio);
        mapper.map(src -> src.getAreaProfesional().getNombre(), TurnoDTO::setAreaProfesional);
        mapper.using(fechaEntityConv).map(TurnoEntity::getFecha, TurnoDTO::setFecha);
      }
    );
  }

  public void configureProfesionalMapping(ModelMapper modelMapper) {
    if (modelMapper.getTypeMap(ProfesionalMedDTO.class, ProfesionalMedEntity.class) != null) 
      return ;

    Converter<Integer, ConsultorioEntity> getterConsultorioEntity = conv -> 
      conv.getSource() == null ? 
        null : consultorioRepo.findByNumeroConsultorio(conv.getSource()).get();
    Converter<List<String>, List<AreaEntity>> getterAreaEntities = conv -> 
      conv.getSource() == null ?
        null : conv.getSource().stream().map(nombre -> areaRepo.findByNombre(nombre).get()).toList();
    
    Converter<List<String>, String> horariosToSingleString = conv -> 
      conv.getSource() == null ? 
        null : String.join(",", conv.getSource());

    modelMapper.typeMap(ProfesionalMedDTO.class, ProfesionalMedEntity.class).addMappings(
      (mapper) -> {
        mapper.using(getterConsultorioEntity).map(ProfesionalMedDTO::getConsultorio, ProfesionalMedEntity::setConsultorio);
        mapper.using(getterAreaEntities).map(ProfesionalMedDTO::getAreas, ProfesionalMedEntity::setAreas);
        mapper.using(horariosToSingleString).map(ProfesionalMedDTO::getHorarios, ProfesionalMedEntity::setHorarios);
      }
    );

    Converter<List<AreaEntity>, List<String>> extractIds = conv -> 
      conv.getSource() == null ? 
        null : conv.getSource().stream().map((area) -> area.getNombre()).toList();

    Converter<String, List<String>> horariosToListString = conv -> 
      conv.getSource() == null ? 
        null : Arrays.asList(conv.getSource().split(","));

    modelMapper.typeMap(ProfesionalMedEntity.class, ProfesionalMedDTO.class).addMappings(
      (mapper) -> {
        mapper.map(src -> src.getConsultorio().getNumeroConsultorio(), ProfesionalMedDTO::setConsultorio);
        mapper.using(extractIds).map(ProfesionalMedEntity::getAreas, ProfesionalMedDTO::setAreas);
        mapper.using(horariosToListString).map(ProfesionalMedEntity::getHorarios, ProfesionalMedDTO::setHorarios);
      }
    );
  }

  public void configureAreaMapping(ModelMapper modelMapper) {
    if (modelMapper.getTypeMap(AreaDTO.class, AreaEntity.class) != null) 
      return ;

    modelMapper.typeMap(AreaDTO.class, AreaEntity.class).addMappings(
      (mapper) -> {
        mapper.map(src -> {
          if (src.getNombre() != null && src.getNombre() != "") return UtilitiesMethods.normaliceString(src.getNombre());
          else return src.getNombre();
        }, AreaEntity::setSearchName);
      }
    );
  }

  public void configureUserMapping(ModelMapper modelMapper) {
    if (modelMapper.getTypeMap(UserFrontDTO.class, UserEntity.class) != null)
      return ;

    Converter<String, ProfesionalMedEntity> profesionalEntityConv = conv -> 
      conv.getSource() == null ?
        null : profesionalRepo.findByDni(conv.getSource()).get();

    modelMapper.typeMap(UserFrontDTO.class, UserEntity.class).addMappings(
      mapper ->
        mapper.using(profesionalEntityConv).map(src -> src.getProffesionalDni(), UserEntity::setProfesionalId) 
    );

    modelMapper.typeMap(UserEntity.class, UserFrontDTO.class).addMappings(
      mapper ->
        mapper.map(src -> src.getProfesionalId().getDni(), UserFrontDTO::setProffesionalDni)
    );
  }
}
