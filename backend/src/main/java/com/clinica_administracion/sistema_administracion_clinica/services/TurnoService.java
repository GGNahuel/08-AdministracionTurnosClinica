package com.clinica_administracion.sistema_administracion_clinica.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.clinica_administracion.sistema_administracion_clinica.DTOs.SearchTurnoDto;
import com.clinica_administracion.sistema_administracion_clinica.DTOs.TurnoDTO;
import com.clinica_administracion.sistema_administracion_clinica.entities.AreaEntity;
import com.clinica_administracion.sistema_administracion_clinica.entities.TurnoEntity;
import com.clinica_administracion.sistema_administracion_clinica.others.UtilitiesMethods;
import com.clinica_administracion.sistema_administracion_clinica.others.enums.EstadoPago;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.EntityAlreadyExists;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.InvalidInput;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.ResourceNotFound;
import com.clinica_administracion.sistema_administracion_clinica.repositories.AreaRepository;
import com.clinica_administracion.sistema_administracion_clinica.repositories.ConsultorioRepository;
import com.clinica_administracion.sistema_administracion_clinica.repositories.PacienteRepository;
import com.clinica_administracion.sistema_administracion_clinica.repositories.ProfesionalMedRepository;
import com.clinica_administracion.sistema_administracion_clinica.repositories.TurnoRepository;
import com.clinica_administracion.sistema_administracion_clinica.services.interfaces.ITurnoService;

@Service
public class TurnoService implements ITurnoService {
  private final TurnoRepository turnoRepo;
  private final PacienteRepository pacienteRepo;
  private final ProfesionalMedRepository profesionalRepo;
  private final ConsultorioRepository consultorioRepo;
  private final AreaRepository areaRepo;
  private final ModelMapper modelMapper;
  // private DateTimeFormatter formatoHora = DateTimeFormatter.ofPattern("hh:mm");

  public TurnoService(
    TurnoRepository turnoRepo, PacienteRepository pacienteRepo, ProfesionalMedRepository profesionalRepo, 
    ConsultorioRepository consultorioRepo, AreaRepository areaRepo, ModelMapper modelMapper
  ) {
    this.turnoRepo = turnoRepo;
    this.pacienteRepo = pacienteRepo; this.profesionalRepo = profesionalRepo;
    this.consultorioRepo = consultorioRepo; this.areaRepo = areaRepo;
    this.modelMapper = modelMapper;
  }

  @Transactional(readOnly = true) @Override
  public List<TurnoDTO> getAll() {
    return 
      turnoRepo.findAll().stream().map(
        (turno) -> modelMapper.map(turno, TurnoDTO.class)
      ).collect(Collectors.toList());
  }

  @Transactional(readOnly = true) @Override
  public List<TurnoDTO> getNextTurnosByArea(String fecha, String nombreArea) throws Exception{
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"fecha"}, fecha);
    return
      turnoRepo.findNextTurnosInArea(LocalDate.parse(fecha, UtilitiesMethods.formatoFecha), nombreArea).stream().map(
        turnoEntity -> modelMapper.map(turnoEntity, TurnoDTO.class)
      ).toList();
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
  public List<TurnoDTO> getByProfesionalDniAndDate(String dni, String fecha) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"dni", "fecha"}, dni, fecha);
    return 
      turnoRepo.findByProfesionalDNIAndDate(dni, LocalDate.parse(fecha)).stream().map(
        (turno) -> modelMapper.map(turno, TurnoDTO.class)
      ).collect(Collectors.toList());
  }

  @Transactional(readOnly = true) @Override
  public List<TurnoDTO> getByDate(String fecha) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"fecha"}, fecha);
    return 
      turnoRepo.findByFecha(LocalDate.parse(fecha, UtilitiesMethods.formatoFecha)).stream().map(
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
      turno, turno.getFecha(), turno.getHorario(), turno.getAreaProfesional(), turno.getProfesionalDto().getDni(), 
      turno.getConsultorio(), turno.getPacienteDto().getDni()
    );
    UtilitiesMethods.validateAreaInDto(turno.getAreaProfesional(), areaRepo);
    UtilitiesMethods.validateConsultorioInDto(turno.getConsultorio(), consultorioRepo);
    UtilitiesMethods.validatePacienteInDto(turno.getPacienteDto().getDni(), pacienteRepo);
    UtilitiesMethods.validateProfesionalMedInDto(turno.getProfesionalDto().getDni(), profesionalRepo);
    
    turno.setActive(true);
    TurnoEntity turnoEntity = modelMapper.map(turno, TurnoEntity.class);
    AreaEntity areaEntityOfTurno = turnoEntity.getAreaProfesional();

    Optional<TurnoEntity> check = turnoRepo.findTurnosExistingInDate(turnoEntity.getProfesional().getId(), turnoEntity.getFecha(), turnoEntity.getHorario());
    if (check.isPresent() && areaEntityOfTurno.getNecesitaTurno() != null) {
      if (areaEntityOfTurno.getNecesitaTurno()) 
        throw new EntityAlreadyExists("Ya existe un turno con este horario para el profesional seleccionado", check.get());
    }
    if (!turnoEntity.getProfesional().getHorarios().contains(turno.getHorario())) 
      throw new InvalidInput("horario", turno.getHorario(), "estar dentro del horario que atiende el profesional.");

    return modelMapper.map(turnoRepo.save(turnoEntity), TurnoDTO.class);
  }

  @Transactional @Override
  public TurnoDTO update(TurnoDTO turno) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(
      new String[]{"Turno", "id", "fecha", "horario", "área", "dni del profesional", "consultorio", "dni del paciente"}, 
      turno, turno.getId(), turno.getFecha(), turno.getHorario(), turno.getAreaProfesional(), turno.getProfesionalDto().getDni(), 
      turno.getConsultorio(), turno.getPacienteDto().getDni()
    );
    UtilitiesMethods.validateAreaInDto(turno.getAreaProfesional(), areaRepo);
    UtilitiesMethods.validateConsultorioInDto(turno.getConsultorio(), consultorioRepo);
    UtilitiesMethods.validatePacienteInDto(turno.getPacienteDto().getDni(), pacienteRepo);
    UtilitiesMethods.validateProfesionalMedInDto(turno.getProfesionalDto().getDni(), profesionalRepo);
    
    turnoRepo.findById(turno.getId()).orElseThrow(
      () -> new ResourceNotFound("Turno", "id", turno.getId().toString())
    );

    TurnoEntity turnoEntity = modelMapper.map(turno, TurnoEntity.class);
    AreaEntity areaEntityOfTurno = turnoEntity.getAreaProfesional();
    Optional<TurnoEntity> check = turnoRepo.findTurnosExistingInDate(turnoEntity.getProfesional().getId(), turnoEntity.getFecha(), turnoEntity.getHorario());
    if (check.isPresent() && areaEntityOfTurno.getNecesitaTurno() != null) {
      if (areaEntityOfTurno.getNecesitaTurno()) 
        throw new EntityAlreadyExists("Ya existe un turno con este horario para el profesional seleccionado", check.get());
    }
    if (!turnoEntity.getProfesional().getHorarios().contains(turno.getHorario())) 
      throw new InvalidInput("horario", turno.getHorario(), "estar dentro del horario que atiende el profesional.");

    return modelMapper.map(turnoRepo.save(turnoEntity), TurnoDTO.class);
  }

  @Transactional @Override
  public void changeActiveStatus(UUID id, Boolean valor) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"id", "valor"}, id, valor);
    TurnoEntity turno = turnoRepo.findById(id).orElseThrow(
      () -> new ResourceNotFound("turno", "id", id.toString())
    );

    turno.setActive(valor);
    turnoRepo.save(turno);
  }

  @Transactional @Override
  public void deleteAlreadyPassed(String fecha) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"fecha"}, fecha);
    LocalDate fechaDate = LocalDate.parse(fecha, UtilitiesMethods.formatoFecha);
    List<TurnoEntity> list = turnoRepo.selectTurnosAlreadyPassed(fechaDate);
    if (list.size() > 0) turnoRepo.deleteAll(list);
  }

  @Transactional @Override
  public List<TurnoDTO> searchTurnos(SearchTurnoDto searchProps) {
    LocalDate date = null;
    if (searchProps.getDate() != null && !searchProps.getDate().equalsIgnoreCase("")) {
      date = LocalDate.parse(searchProps.getDate(), UtilitiesMethods.formatoFecha);
    }
    EstadoPago state = null;
    if (searchProps.getEstadoPago() != null && !searchProps.getEstadoPago().equalsIgnoreCase("")) {
      state = EstadoPago.valueOf(searchProps.getEstadoPago());
    }

    return turnoRepo.searchTurnos(searchProps.getSearchName(), searchProps.getAreaName(), state, date).stream().map(
      (turn) -> modelMapper.map(turn, TurnoDTO.class)
    ).toList();
  }
}
