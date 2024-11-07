package com.clinica_administracion.sistema_administracion_clinica.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
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
import org.springframework.test.web.servlet.ResultActions;

import com.clinica_administracion.sistema_administracion_clinica.DTOs.AreaDTO;
import com.clinica_administracion.sistema_administracion_clinica.others.responseDTOs.GetResponseDTO;
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
      .active(true)
      .necesitaTurno(true)
    .build();
    areaDto2 = AreaDTO.builder()
      .id(UUID.randomUUID())
      .nombre("Cardiología")
      .active(false)
      .necesitaTurno(true)
    .build();
    areaDto3 = AreaDTO.builder()
      .id(UUID.randomUUID())
      .nombre("Laboratorio")
      .active(true)
      .necesitaTurno(false)
    .build();
  }

  @Test
  public void areaController_getAll_returnGetResponseDTOType() throws Exception {
    GetResponseDTO expectedResponse = new GetResponseDTO();
    List<AreaDTO> listExample = new ArrayList<>();
    expectedResponse.setResults(listExample);
    when(areaService.getAll()).thenReturn(listExample);

    ResultActions result = mockMvc.perform(get("/api/area")
      .contentType(MediaType.APPLICATION_JSON)
    ).andExpect(status().isOk());

    String resultInJson = result.andReturn().getResponse().getContentAsString();
    GetResponseDTO actualResponse = objectMapper.readValue(resultInJson, GetResponseDTO.class);

    assertEquals(expectedResponse, actualResponse);
  }

  @Test
  public void areaController_getAll_returnsExpectedList() throws Exception {
    List<AreaDTO> expectedList = new ArrayList<>(Arrays.asList(areaDto1, areaDto2, areaDto3));
    when(areaService.getAll()).thenReturn(expectedList);

    ResultActions result = mockMvc.perform(get("/api/area")
      .characterEncoding("UTF-8")
      .contentType(MediaType.APPLICATION_JSON)
    );
    
    result
      .andExpect(status().isOk())
      .andExpect(jsonPath("$.results", CoreMatchers.notNullValue()));

    String jsonResponse = result.andReturn().getResponse().getContentAsString(StandardCharsets.UTF_8);
    // Assuming the JSON response has a structure like { "results": [...] }
    JsonNode jsonNode = objectMapper.readTree(jsonResponse);
    List<AreaDTO> actualList = objectMapper.readValue(
        jsonNode.get("results").toString(),
        new TypeReference<List<AreaDTO>>() {}
    );
    assertEquals(expectedList.size(), actualList.size());
    assertEquals(expectedList, actualList);
  }

  // GetByActiveStatus
  @Test
  public void areaController_getByActiveStatus_returnGetResponseDTOType() throws Exception {
    GetResponseDTO expectedResponse = new GetResponseDTO();
    List<AreaDTO> listExample = new ArrayList<>();
    expectedResponse.setResults(listExample);
    when(areaService.getByActiveState(true)).thenReturn(listExample);

    ResultActions result = mockMvc.perform(get("/api/area/actives")
      .contentType(MediaType.APPLICATION_JSON)
      .param("valor", "true")
    ).andExpect(status().isOk());

    String resultInJson = result.andReturn().getResponse().getContentAsString();
    GetResponseDTO actualResponse = objectMapper.readValue(resultInJson, GetResponseDTO.class);

    assertEquals(expectedResponse, actualResponse);
    System.out.println(actualResponse.toString() + " - " + expectedResponse.toString());
  }
  
  @Test
  public void areaController_getByActiveStatus_returnsExpectedList() throws Exception {
    List<AreaDTO> expectedList = new ArrayList<>(Arrays.asList(areaDto1, areaDto3));
    when(areaService.getAll()).thenReturn(expectedList);

    ResultActions result = mockMvc.perform(get("/api/area/actives")
      .characterEncoding("UTF-8")
      .param("valor", "")
      .contentType(MediaType.APPLICATION_JSON)
    );
    
    result
      .andExpect(status().isOk())
      .andExpect(jsonPath("$.results", CoreMatchers.notNullValue()));

    String jsonResponse = result.andReturn().getResponse().getContentAsString(StandardCharsets.UTF_8);
    // Assuming the JSON response has a structure like { "results": [...] }
    JsonNode jsonNode = objectMapper.readTree(jsonResponse);
    List<AreaDTO> actualList = objectMapper.readValue(
        jsonNode.get("results").toString(),
        new TypeReference<List<AreaDTO>>() {}
    );
    assertEquals(expectedList.size(), actualList.size());
    assertEquals(expectedList, actualList);
  }
}
