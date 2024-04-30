package com.clinica_administracion.sistema_administracion_clinica.services;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.clinica_administracion.sistema_administracion_clinica.DTOs.ConsultorioDTO;
import com.clinica_administracion.sistema_administracion_clinica.entities.ConsultorioEntity;
import com.clinica_administracion.sistema_administracion_clinica.others.UtilitiesMethods;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.EntityAlreadyExists;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.ResourceNotFound;
import com.clinica_administracion.sistema_administracion_clinica.repositories.ConsultorioRepository;

@Service
public class ConsultorioService {
  @Autowired ConsultorioRepository consultorioRepo;
  ModelMapper modelMapper = new ModelMapper();

  @Transactional(readOnly = true)
  public List<ConsultorioDTO> getAllConsultorios() {
    List<ConsultorioDTO> list = consultorioRepo.findAll().stream().map(
      (consultorio) -> modelMapper.map(consultorio, ConsultorioDTO.class)
    ).collect(Collectors.toList());
    return list;
  }

  @Transactional(readOnly = true)
  public ConsultorioDTO getConsultorioByNumber(Integer number) throws Exception{
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"número de consultorio"} , number);
    ConsultorioEntity busqueda = consultorioRepo.findByNumeroConsultorio(number).orElseThrow(() ->
      new ResourceNotFound("Consultorio", "número", number.toString())
    );
    
    ConsultorioDTO resultado = modelMapper.map(busqueda, ConsultorioDTO.class);
    return resultado;
  }
  
  @Transactional
  public ConsultorioDTO createConsultorio(Integer number) throws Exception{
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"número de consultorio"} , number);
    if (this.getConsultorioByNumber(number) != null) 
      throw new EntityAlreadyExists(
        "Ya existe un consultorio con ese número", 
        this.getConsultorioByNumber(number)
      );
    
    ConsultorioEntity consultorio = new ConsultorioEntity();
    consultorio.setNumeroConsultorio(number);

    System.out.println(consultorio.toString());
    
    return modelMapper.map(consultorioRepo.save(consultorio), ConsultorioDTO.class);
  }
  
  @Transactional
  public ConsultorioDTO updateConsultorio(UUID id, Integer newNumber) throws Exception{
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"id", "número de consultorio"} , id, newNumber);
    ConsultorioEntity consultorio = consultorioRepo.findById(id).orElseThrow(
      () -> new ResourceNotFound("Consultorio", "id", id.toString())
      );
      consultorio.setNumeroConsultorio(newNumber);
      consultorioRepo.save(consultorio);
      
      return modelMapper.map(consultorio, ConsultorioDTO.class);
    }
    
    @Transactional
    public void deleteConsultorio(UUID id) throws Exception {
    UtilitiesMethods.validateFieldsAreNotEmptyOrNull(new String[]{"id"} , id);
    consultorioRepo.findById(id).orElseThrow(
      () -> new ResourceNotFound("Consultorio", "id", id.toString())
    );
    consultorioRepo.deleteById(id);
  }
}
