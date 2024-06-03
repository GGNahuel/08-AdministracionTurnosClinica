package com.clinica_administracion.sistema_administracion_clinica.controllers;

import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

import com.clinica_administracion.sistema_administracion_clinica.DTOs.AreaDTO;
import com.clinica_administracion.sistema_administracion_clinica.entities.AreaEntity;
import com.clinica_administracion.sistema_administracion_clinica.services.AreaService;

@WebMvcTest(controllers = AreaController.class)
@AutoConfigureMockMvc(addFilters = false)
public class AreaControllerTest {
  @Autowired
  MockMvc mockMvc;
  
  @Mock
  AreaService areaService;

  @InjectMocks
  AreaController areaController;

  AreaEntity areaEntity1;
  AreaEntity areaEntity2;
  AreaEntity areaEntity3;

  AreaDTO areaDto1;
  AreaDTO areaDto2;
  AreaDTO areaDto3;

  @BeforeEach
  public void setUp() {
    areaEntity1 = AreaEntity.builder()
      .id(UUID.randomUUID())
      .nombre("Odontología")
      .activa(true)
      .necesitaTurno(true)
    .build();
    areaEntity2 = AreaEntity.builder()
      .id(UUID.randomUUID())
      .nombre("Cardiología")
      .activa(false)
      .necesitaTurno(true)
    .build();
    areaEntity3 = AreaEntity.builder()
      .id(UUID.randomUUID())
      .nombre("Laboratorio")
      .activa(true)
      .necesitaTurno(false)
    .build();

    areaDto1 = AreaDTO.builder()
      .id(areaEntity1.getId())
      .nombre("Odontología")
      .activa(true)
      .necesitaTurno(true)
    .build();
    areaDto2 = AreaDTO.builder()
      .id(areaEntity2.getId())
      .nombre("Cardiología")
      .activa(false)
      .necesitaTurno(true)
    .build();
    areaDto3 = AreaDTO.builder()
      .id(areaEntity3.getId())
      .nombre("Laboratorio")
      .activa(true)
      .necesitaTurno(false)
    .build();
  }

  @Test
  public void areaController_getAll_returnsExpectedResponse() {
    List<AreaDTO> expectedList = new ArrayList<>(Arrays.asList(areaDto1, areaDto2, areaDto3));
    when(areaService.getAll()).thenReturn(expectedList);

    // mockMvc.perform();
  }
  
}
