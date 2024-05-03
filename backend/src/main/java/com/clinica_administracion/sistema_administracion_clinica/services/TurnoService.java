package com.clinica_administracion.sistema_administracion_clinica.services;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.clinica_administracion.sistema_administracion_clinica.DTOs.TurnoDTO;
import com.clinica_administracion.sistema_administracion_clinica.entities.ConsultorioEntity;
import com.clinica_administracion.sistema_administracion_clinica.entities.PacienteEntity;
import com.clinica_administracion.sistema_administracion_clinica.entities.ProfesionalMedEntity;
import com.clinica_administracion.sistema_administracion_clinica.entities.TurnoEntity;
import com.clinica_administracion.sistema_administracion_clinica.others.UtilitiesMethods;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.EntityAlreadyExists;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.ResourceNotFound;
import com.clinica_administracion.sistema_administracion_clinica.repositories.ConsultorioRepository;
import com.clinica_administracion.sistema_administracion_clinica.repositories.PacienteRepository;
import com.clinica_administracion.sistema_administracion_clinica.repositories.ProfesionalMedRepository;
import com.clinica_administracion.sistema_administracion_clinica.repositories.TurnoRepository;

@Service
public class TurnoService {
  @Autowired TurnoRepository turnoRepo;
  @Autowired PacienteRepository pacienteRepo;
  @Autowired ProfesionalMedRepository profesionalRepo;
  @Autowired ConsultorioRepository consultorioRepo;
  @Autowired ModelMapper modelMapper;
  private DateTimeFormatter formatoFecha = DateTimeFormatter.ofPattern("dd/MM/yyyy");
  // private DateTimeFormatter formatoHora = DateTimeFormatter.ofPattern("hh:mm");
  
  private void setMappingConfigs(TurnoDTO turno) {
    if (turno != null) {
      PacienteEntity paciente = pacienteRepo.findById(turno.getPaciente()).orElseThrow(
        () -> new ResourceNotFound("Paciente", "id", turno.getPaciente().toString())
      );
      ProfesionalMedEntity profesional = profesionalRepo.findById(turno.getProfesional()).orElseThrow(
        () -> new ResourceNotFound("Profesional médico", "id", turno.getProfesional().toString())
      );
      ConsultorioEntity consultorio = consultorioRepo.findByNumeroConsultorio(turno.getConsultorio()).orElseThrow(
        () -> new ResourceNotFound("Consultorio", "número", turno.getConsultorio().toString())
      );
      LocalDate fecha = LocalDate.parse(turno.getFecha(), formatoFecha);
      LocalTime horario = LocalTime.parse(turno.getHorario());

      modelMapper.typeMap(TurnoDTO.class, TurnoEntity.class).addMappings(
        (mapper) -> {
          mapper.map(src -> paciente, TurnoEntity::setPaciente);
          mapper.map(src -> profesional, TurnoEntity::setProfesional);
          mapper.map(src -> consultorio, TurnoEntity::setConsultorio);
          mapper.map(src -> fecha, TurnoEntity::setFecha);
          mapper.map(src -> horario, TurnoEntity::setHorario);
        }
      );
    }
    modelMapper.typeMap(TurnoEntity.class, TurnoDTO.class).addMappings(
      (mapper) -> {
        mapper.map(src -> src.getPaciente().getId(), TurnoDTO::setPaciente);
        mapper.map(src -> src.getProfesional().getId(), TurnoDTO::setProfesional);
        mapper.map(src -> src.getConsultorio().getNumeroConsultorio(), TurnoDTO::setConsultorio);
      }
    );
  }

  @Transactional(readOnly = true)
  public List<TurnoDTO> getAllTurnos() {
    return 
      turnoRepo.findAll().stream().map(
        (turno) -> modelMapper.map(turno, TurnoDTO.class)
      ).collect(Collectors.toList());
  }

  @Transactional(readOnly = true)
  public TurnoDTO getTurnoByID(UUID id) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"id"}, id);
    return modelMapper.map(turnoRepo.findById(id), TurnoDTO.class);
  }

  @Transactional(readOnly = true)
  public List<TurnoDTO> getTurnosByPacienteDNI(String dni) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"dni"}, dni);
    return 
    turnoRepo.findByPacienteDNI(dni).stream().map(
      (turno) -> modelMapper.map(turno, TurnoDTO.class)
      ).collect(Collectors.toList());
    }

  @Transactional(readOnly = true)
  public List<TurnoDTO> getTurnosByProfesionalDNI(String dni) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"dni"}, dni);
    return 
      turnoRepo.findByProfesionalDNI(dni).stream().map(
        (turno) -> modelMapper.map(turno, TurnoDTO.class)
      ).collect(Collectors.toList());
  }

  @Transactional(readOnly = true)
  public List<TurnoDTO> getTurnosByProfesional(String name) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"nombre"}, name);
    return 
      turnoRepo.findByProfesionalNombre(name).stream().map(
        (turno) -> modelMapper.map(turno, TurnoDTO.class)
      ).collect(Collectors.toList());
  }

  @Transactional(readOnly = true)
  public List<TurnoDTO> getTurnosByDate(String fecha) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"fecha"}, fecha);
    return 
      turnoRepo.findByFecha(LocalDate.parse(fecha, formatoFecha)).stream().map(
        (turno) -> modelMapper.map(turno, TurnoDTO.class)
      ).collect(Collectors.toList());
  }

  @Transactional
  public TurnoDTO createTurno(TurnoDTO turno) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(
      new String[]{"Turno", "fecha", "horario", "área", "profesional", "consultorio", "paciente"}, 
      turno, turno.getFecha(), turno.getHorario(), turno.getAreaProfesional(), turno.getProfesional(), turno.getConsultorio(), turno.getPaciente()
    );
    setMappingConfigs(turno);
    
    TurnoEntity turnoEntity = modelMapper.map(turno, TurnoEntity.class);
    Optional<TurnoEntity> check = turnoRepo.findTurnoFromProfesionalAndHours(turnoEntity.getProfesional().getId(), turnoEntity.getHorario());
    if (check.isPresent()) 
      throw new EntityAlreadyExists("Ya existe un turno con este horario para el profesional seleccionado", turnoEntity);
    
    return modelMapper.map(turnoRepo.save(turnoEntity), TurnoDTO.class);
  }

  @Transactional
  public TurnoDTO updateTurnoDTO(TurnoDTO turno) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(
      new String[]{"Turno", "id", "fecha", "horario", "área", "profesional", "consultorio"}, 
      turno, turno.getId(), turno.getFecha(), turno.getHorario(), turno.getAreaProfesional(), turno.getProfesional(), turno.getConsultorio()
    );
    turnoRepo.findById(turno.getId()).orElseThrow(
      () -> new ResourceNotFound("Turno", "id", turno.getId().toString())
    );

    setMappingConfigs(turno);
    TurnoEntity turnoEntity = modelMapper.map(turno, TurnoEntity.class);

    return modelMapper.map(turnoRepo.save(turnoEntity), TurnoDTO.class);
  }
}
