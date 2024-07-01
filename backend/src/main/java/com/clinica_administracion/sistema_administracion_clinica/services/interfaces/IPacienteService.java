package com.clinica_administracion.sistema_administracion_clinica.services.interfaces;

import java.util.List;
import java.util.UUID;

import com.clinica_administracion.sistema_administracion_clinica.DTOs.PacienteDTO;

public interface IPacienteService {
  List<PacienteDTO> getAll();
  List<PacienteDTO> getByNombreLike(String busqueda) throws Exception;
  PacienteDTO getByDni(String dni) throws Exception;
  PacienteDTO getById(UUID id) throws Exception;
  PacienteDTO create(PacienteDTO paciente) throws Exception;
  PacienteDTO update(PacienteDTO pacienteActualizado) throws Exception;
}
