package com.clinica_administracion.sistema_administracion_clinica.services.interfaces;

import java.util.List;
import java.util.UUID;

import com.clinica_administracion.sistema_administracion_clinica.DTOs.ConsultorioDTO;

public interface IConsultorioService {
  List<ConsultorioDTO> getAll();
  ConsultorioDTO getByNumber(Integer number) throws Exception;
  ConsultorioDTO create(Integer number) throws Exception;
  ConsultorioDTO update(UUID id, Integer number) throws Exception;
  void delete(UUID id) throws Exception;
}
