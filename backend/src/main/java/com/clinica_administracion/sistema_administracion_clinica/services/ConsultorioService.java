package com.clinica_administracion.sistema_administracion_clinica.services;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.clinica_administracion.sistema_administracion_clinica.DTOs.ConsultorioDTO;
import com.clinica_administracion.sistema_administracion_clinica.entities.ConsultorioEntity;
import com.clinica_administracion.sistema_administracion_clinica.others.UtilitiesMethods;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.EntityAlreadyExists;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.ResourceNotFound;
import com.clinica_administracion.sistema_administracion_clinica.repositories.ConsultorioRepository;
import com.clinica_administracion.sistema_administracion_clinica.services.interfaces.IConsultorioService;

@Service
public class ConsultorioService implements IConsultorioService {
  private final ConsultorioRepository consultorioRepo;
  private final ModelMapper modelMapper;

  public ConsultorioService(ConsultorioRepository consultorioRepo, ModelMapper modelMapper) {
    this.consultorioRepo = consultorioRepo; this.modelMapper = modelMapper;
  }

  @Transactional(readOnly = true) @Override
  public List<ConsultorioDTO> getAll() {
    List<ConsultorioDTO> list = consultorioRepo.findAll().stream().map(
      (consultorio) -> modelMapper.map(consultorio, ConsultorioDTO.class)
    ).collect(Collectors.toList());
    return list;
  }

  @Transactional(readOnly = true) @Override
  public ConsultorioDTO getByNumber(Integer number) throws Exception{
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"número de consultorio"} , number);
    ConsultorioEntity busqueda = consultorioRepo.findByNumeroConsultorio(number).orElseThrow(() ->
      new ResourceNotFound("Consultorio", "número", number.toString())
    );
    
    ConsultorioDTO resultado = modelMapper.map(busqueda, ConsultorioDTO.class);
    return resultado;
  }
  
  @Transactional @Override
  public ConsultorioDTO create(Integer number) throws Exception{
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"número de consultorio"} , number);
    ConsultorioEntity consultorioWithNumber = consultorioRepo.findByNumeroConsultorio(number).orElse(null);
    if (consultorioWithNumber != null) 
      throw new EntityAlreadyExists(
        "Ya existe un consultorio con ese número", 
        consultorioWithNumber
      );
    
    ConsultorioEntity consultorio = new ConsultorioEntity();
    consultorio.setNumeroConsultorio(number);

    System.out.println(consultorio.toString());
    
    return modelMapper.map(consultorioRepo.save(consultorio), ConsultorioDTO.class);
  }
  
  @Transactional @Override
  public ConsultorioDTO update(UUID id, Integer newNumber) throws Exception{
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"id", "número de consultorio"} , id, newNumber);
    ConsultorioEntity consultorio = consultorioRepo.findById(id).orElseThrow(
      () -> new ResourceNotFound("Consultorio", "id", id.toString())
      );
      consultorio.setNumeroConsultorio(newNumber);
      consultorioRepo.save(consultorio);
      
      return modelMapper.map(consultorio, ConsultorioDTO.class);
    }
    
    @Transactional @Override
    public void delete(UUID id) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"id"} , id);
    consultorioRepo.findById(id).orElseThrow(
      () -> new ResourceNotFound("Consultorio", "id", id.toString())
    );
    consultorioRepo.deleteById(id);
  }
}
