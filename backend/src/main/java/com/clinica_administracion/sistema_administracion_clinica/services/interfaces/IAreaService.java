package com.clinica_administracion.sistema_administracion_clinica.services.interfaces;

import java.util.List;
import java.util.UUID;

import com.clinica_administracion.sistema_administracion_clinica.DTOs.AreaDTO;

public interface IAreaService {
  List<AreaDTO> getAll();
  List<AreaDTO> getByActiveState(Boolean valor) throws Exception;
  AreaDTO getById(UUID id) throws Exception;
  AreaDTO getByName(String nombre) throws Exception;
  AreaDTO create(String nombre) throws Exception;
  AreaDTO update(AreaDTO areaUpdated) throws Exception;
  AreaDTO changeActiveStatus(UUID id, Boolean valor) throws Exception;
}
