package com.clinica_administracion.sistema_administracion_clinica.services.interfaces;

import java.util.List;
import java.util.UUID;

import com.clinica_administracion.sistema_administracion_clinica.DTOs.SearchTurnoDto;
import com.clinica_administracion.sistema_administracion_clinica.DTOs.TurnoDTO;

public interface ITurnoService {
  List<TurnoDTO> getAll();
  List<TurnoDTO> getNextTurnosByArea(String fecha, String nombreArea) throws Exception;
  TurnoDTO getById(UUID id) throws Exception;
  List<TurnoDTO> getByPacienteDni(String dni) throws Exception;
  List<TurnoDTO> getByProfesionalDni(String dni) throws Exception;
  List<TurnoDTO> getByProfesionalDniAndDate(String dni, String fecha) throws Exception;
  List<TurnoDTO> getByDate(String fecha) throws Exception;
  List<TurnoDTO> getByArea(String nombre) throws Exception;
  TurnoDTO create(TurnoDTO turno) throws Exception;
  TurnoDTO update(TurnoDTO turno) throws Exception;
  void changeActiveStatus(UUID id, Boolean valor) throws Exception;
  void deleteAlreadyPassed(String fecha) throws Exception;
  List<TurnoDTO> searchTurnos(SearchTurnoDto searchProps);
}
