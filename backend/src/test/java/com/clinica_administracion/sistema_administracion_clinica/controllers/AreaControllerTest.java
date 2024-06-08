package com.clinica_administracion.sistema_administracion_clinica.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import org.hamcrest.CoreMatchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.clinica_administracion.sistema_administracion_clinica.DTOs.AreaDTO;
import com.clinica_administracion.sistema_administracion_clinica.services.AreaService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(AreaController.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(MockitoExtension.class)
public class AreaControllerTest {
  @Autowired
  MockMvc mockMvc;
  @Autowired
  ObjectMapper objectMapper;
  
  @MockBean
  AreaService areaService;

  @InjectMocks
  AreaController areaController;

  AreaDTO areaDto1;
  AreaDTO areaDto2;
  AreaDTO areaDto3;

  @BeforeEach
  public void setUp() {
    areaDto1 = AreaDTO.builder()
      .id(UUID.randomUUID())
      .nombre("Odontología")
      .activa(true)
      .necesitaTurno(true)
    .build();
    areaDto2 = AreaDTO.builder()
      .id(UUID.randomUUID())
      .nombre("Cardiología")
      .activa(false)
      .necesitaTurno(true)
    .build();
    areaDto3 = AreaDTO.builder()
      .id(UUID.randomUUID())
      .nombre("Laboratorio")
      .activa(true)
      .necesitaTurno(false)
    .build();
  }

  @Test
  public void areaController_getAll_returnsExpectedResponse() throws Exception {
    List<AreaDTO> expectedList = new ArrayList<>(Arrays.asList(areaDto1, areaDto2, areaDto3));
    when(areaService.getAll()).thenReturn(expectedList);

    ResultActions response = mockMvc.perform(get("/api/area")
      .contentType(MediaType.APPLICATION_JSON)
      .content(objectMapper.writeValueAsString(areaDto1)
    ));

    response
      .andExpect(MockMvcResultMatchers.jsonPath("$.results", CoreMatchers.notNullValue()))
      .andExpectAll(
        status().isOk(),
        jsonPath("$.results").isArray(),
        // jsonPath("$.results").value(objectMapper.writeValueAsString(expectedList)), se debería comparar cada elemento
        jsonPath("$.results.size()").value(expectedList.size()),
        jsonPath("$.results[0].nombre").value(expectedList.get(0).getNombre())
      );
  }

  @Test
  public void areaController_getAll_returnsExpectedResponse_MvcResult() throws Exception {
    List<AreaDTO> expectedList = new ArrayList<>(Arrays.asList(areaDto1, areaDto2, areaDto3));
    when(areaService.getAll()).thenReturn(expectedList);

    MvcResult result = mockMvc.perform(get("/api/area")
      .characterEncoding("UTF-8")
      .contentType(MediaType.APPLICATION_JSON))
      .andExpect(status().isOk()) // mover esta verificación con las otras, como está en el método de arriba
      .andReturn();

    String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
    // Assuming the JSON response has a structure like { "results": [...] }
    JsonNode jsonNode = objectMapper.readTree(jsonResponse);
    List<AreaDTO> actualList = objectMapper.readValue(
        jsonNode.get("results").toString(),
        new TypeReference<List<AreaDTO>>() {}
    );

    assertNotNull(actualList);
    assertEquals(expectedList.size(), actualList.size());
    assertEquals(expectedList, actualList);
  }
  
}
