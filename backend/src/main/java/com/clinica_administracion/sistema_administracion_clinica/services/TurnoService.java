package com.clinica_administracion.sistema_administracion_clinica.services;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.clinica_administracion.sistema_administracion_clinica.DTOs.TurnoDTO;
import com.clinica_administracion.sistema_administracion_clinica.entities.AreaEntity;
import com.clinica_administracion.sistema_administracion_clinica.entities.ConsultorioEntity;
import com.clinica_administracion.sistema_administracion_clinica.entities.PacienteEntity;
import com.clinica_administracion.sistema_administracion_clinica.entities.ProfesionalMedEntity;
import com.clinica_administracion.sistema_administracion_clinica.entities.TurnoEntity;
import com.clinica_administracion.sistema_administracion_clinica.others.UtilitiesMethods;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.EntityAlreadyExists;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.InvalidInput;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.ResourceNotFound;
import com.clinica_administracion.sistema_administracion_clinica.repositories.AreaRepository;
import com.clinica_administracion.sistema_administracion_clinica.repositories.ConsultorioRepository;
import com.clinica_administracion.sistema_administracion_clinica.repositories.PacienteRepository;
import com.clinica_administracion.sistema_administracion_clinica.repositories.ProfesionalMedRepository;
import com.clinica_administracion.sistema_administracion_clinica.repositories.TurnoRepository;
import com.clinica_administracion.sistema_administracion_clinica.services.interfaces.ITurnoService;

import jakarta.annotation.PostConstruct;

@Service
public class TurnoService implements ITurnoService {
  @Autowired TurnoRepository turnoRepo;
  @Autowired PacienteRepository pacienteRepo;
  @Autowired ProfesionalMedRepository profesionalRepo;
  @Autowired ConsultorioRepository consultorioRepo;
  @Autowired AreaRepository areaRepo;
  @Autowired ModelMapper modelMapper;
  private DateTimeFormatter formatoFecha = DateTimeFormatter.ofPattern("dd/MM/yyyy");
  // private DateTimeFormatter formatoHora = DateTimeFormatter.ofPattern("hh:mm");

  @PostConstruct
  public void initialiceService() {
    this.configModelMapper();
  }
  
  private void configModelMapper() {
    if (modelMapper.getTypeMap(TurnoDTO.class, TurnoEntity.class) != null) 
      return ;

    Converter<String, PacienteEntity> pacienteEntityConv = conv ->
      conv.getSource() == null ? null :
      pacienteRepo.findByDni(conv.getSource()).orElseThrow(
        () -> new ResourceNotFound("Paciente", "id", conv.getSource().toString())
      );
    Converter<String, ProfesionalMedEntity> profesionalEntityConv = conv ->
      conv.getSource() == null ? null :
      profesionalRepo.findByDni(conv.getSource()).orElseThrow(
        () -> new ResourceNotFound("Profesional médico", "id", conv.getSource().toString())
      );
    Converter<Integer, ConsultorioEntity> consultorioEntityConv = conv -> 
      conv.getSource() == null ? null : 
        consultorioRepo.findByNumeroConsultorio(conv.getSource()).orElseThrow(
          () -> new ResourceNotFound("Consultorio", "número", conv.getSource().toString())
        );
    Converter<String, AreaEntity> areaEntityConv = conv ->
      conv.getSource() == null ? null :
      areaRepo.findByNombre(conv.getSource()).orElseThrow(
        () -> new ResourceNotFound("Área médica", "id", conv.getSource().toString())
      );
    Converter<String, LocalDate> fechaConv = conv -> conv.getSource() == null ? null : LocalDate.parse(conv.getSource(), formatoFecha);
    Converter<String, LocalTime> horarioConv = conv -> conv.getSource() == null ? null : LocalTime.parse(conv.getSource());

    modelMapper.emptyTypeMap(TurnoDTO.class, TurnoEntity.class).addMappings(
      (mapper) -> {
        mapper.using(pacienteEntityConv).map(TurnoDTO::getPacienteDni, TurnoEntity::setPaciente);
        mapper.using(profesionalEntityConv).map(TurnoDTO::getProfesionalDni, TurnoEntity::setProfesional);
        mapper.using(consultorioEntityConv).map(TurnoDTO::getConsultorio, TurnoEntity::setConsultorio);
        mapper.using(areaEntityConv).map(TurnoDTO::getAreaProfesional, TurnoEntity::setAreaProfesional);
        mapper.using(fechaConv).map(TurnoDTO::getFecha, TurnoEntity::setFecha);
        mapper.using(horarioConv).map(TurnoDTO::getHorario, TurnoEntity::setHorario);
      }
    );
    
    modelMapper.typeMap(TurnoEntity.class, TurnoDTO.class).addMappings(
      (mapper) -> {
        mapper.map(src -> src.getPaciente().getDni(), TurnoDTO::setPacienteDni);
        mapper.map(src -> src.getProfesional().getDni(), TurnoDTO::setProfesionalDni);
        mapper.map(src -> src.getConsultorio().getNumeroConsultorio(), TurnoDTO::setConsultorio);
        mapper.map(src -> src.getAreaProfesional().getNombre(), TurnoDTO::setAreaProfesional);
      }
    );
  }

  @Transactional(readOnly = true) @Override
  public List<TurnoDTO> getAll() {
    return 
      turnoRepo.findAll().stream().map(
        (turno) -> modelMapper.map(turno, TurnoDTO.class)
      ).collect(Collectors.toList());
  }

  @Transactional(readOnly = true) @Override
  public TurnoDTO getById(UUID id) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"id"}, id);
    return modelMapper.map(turnoRepo.findById(id), TurnoDTO.class);
  }

  @Transactional(readOnly = true) @Override
  public List<TurnoDTO> getByPacienteDni(String dni) throws Exception  {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"dni"}, dni);
    return 
    turnoRepo.findByPacienteDNI(dni).stream().map(
      (turno) -> modelMapper.map(turno, TurnoDTO.class)
      ).collect(Collectors.toList());
    }

  @Transactional(readOnly = true) @Override
  public List<TurnoDTO> getByProfesionalDni(String dni) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"dni"}, dni);
    return 
      turnoRepo.findByProfesionalDNI(dni).stream().map(
        (turno) -> modelMapper.map(turno, TurnoDTO.class)
      ).collect(Collectors.toList());
  }

  @Transactional(readOnly = true) @Override
  public List<TurnoDTO> getByProfesional(String name) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"nombre"}, name);
    return 
      turnoRepo.findByProfesionalNombre(name).stream().map(
        (turno) -> modelMapper.map(turno, TurnoDTO.class)
      ).collect(Collectors.toList());
  }

  @Transactional(readOnly = true) @Override
  public List<TurnoDTO> getByDate(String fecha) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"fecha"}, fecha);
    return 
      turnoRepo.findByFecha(LocalDate.parse(fecha, formatoFecha)).stream().map(
        (turno) -> modelMapper.map(turno, TurnoDTO.class)
      ).collect(Collectors.toList());
  }

  @Transactional(readOnly = true) @Override
  public List<TurnoDTO> getByArea(String nombre) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"Nombre del área"}, nombre);
    return 
      turnoRepo.findByArea(nombre).stream().map(
        (turno) -> modelMapper.map(turno, TurnoDTO.class)
      ).collect(Collectors.toList());
  }

  @Transactional @Override
  public TurnoDTO create(TurnoDTO turno) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(
      new String[]{"Turno", "fecha", "horario", "área", "dni del profesional", "consultorio", "dni del paciente"}, 
      turno, turno.getFecha(), turno.getHorario(), turno.getAreaProfesional(), turno.getProfesionalDni(), turno.getConsultorio(), turno.getPacienteDni()
    );
    
    turno.setActivo(true);
    TurnoEntity turnoEntity = modelMapper.map(turno, TurnoEntity.class);
    AreaEntity areaEntityOfTurno = turnoEntity.getAreaProfesional();

    Optional<TurnoEntity> check = turnoRepo.findTurnosExistingInDate(turnoEntity.getProfesional().getId(), turnoEntity.getFecha(), turnoEntity.getHorario());
    if (check.isPresent() && areaEntityOfTurno.getNecesitaTurno() != null) {
      if (areaEntityOfTurno.getNecesitaTurno()) 
        throw new EntityAlreadyExists("Ya existe un turno con este horario para el profesional seleccionado", check.get());
    }
    if (!turnoEntity.getProfesional().getHorarios().contains(LocalTime.parse(turno.getHorario()))) 
      throw new InvalidInput("horario", turno.getHorario(), "estar dentro del horario que atiende el profesional.");

    return modelMapper.map(turnoRepo.save(turnoEntity), TurnoDTO.class);
  }

  @Transactional @Override
  public TurnoDTO update(TurnoDTO turno) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(
      new String[]{"Turno", "id", "fecha", "horario", "área", "dni del profesional", "consultorio", "dni del paciente"}, 
      turno, turno.getId(), turno.getFecha(), turno.getHorario(), turno.getAreaProfesional(), turno.getProfesionalDni(), turno.getConsultorio(), turno.getPacienteDni()
    );
    
    turnoRepo.findById(turno.getId()).orElseThrow(
      () -> new ResourceNotFound("Turno", "id", turno.getId().toString())
    );

    TurnoEntity turnoEntity = modelMapper.map(turno, TurnoEntity.class);
    return modelMapper.map(turnoRepo.save(turnoEntity), TurnoDTO.class);
  }

  @Transactional @Override
  public void deleteAlreadyPassed(String fecha) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"fecha"}, fecha);
    LocalDate fechaDate = LocalDate.parse(fecha, formatoFecha);
    List<TurnoEntity> list = turnoRepo.selectTurnosAlreadyPassed(fechaDate);
    if (list.size() > 0) turnoRepo.deleteAll(list);
  }
}
