package com.clinica_administracion.sistema_administracion_clinica.services.interfaces;

import java.util.List;
import java.util.UUID;

import com.clinica_administracion.sistema_administracion_clinica.DTOs.ProfesionalMedDTO;

public interface IProfesionalMedService {
  List<ProfesionalMedDTO> getAll();
  List<ProfesionalMedDTO> getAllByArea(String nombreArea) throws Exception;
  ProfesionalMedDTO getById(UUID id) throws Exception;
  ProfesionalMedDTO getByDni(String dni) throws Exception;
  ProfesionalMedDTO create(ProfesionalMedDTO profesional) throws Exception;
  ProfesionalMedDTO update(ProfesionalMedDTO profesional) throws Exception;
  ProfesionalMedDTO changeActiveStatus(String profesionalDni, Boolean activeStatus, Boolean turnsAction) throws Exception;
}
