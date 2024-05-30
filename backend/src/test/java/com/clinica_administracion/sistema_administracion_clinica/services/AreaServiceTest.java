package com.clinica_administracion.sistema_administracion_clinica.services;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.modelmapper.ModelMapper;
import org.springframework.boot.test.context.SpringBootTest;

import com.clinica_administracion.sistema_administracion_clinica.DTOs.AreaDTO;
import com.clinica_administracion.sistema_administracion_clinica.entities.AreaEntity;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.NotNullFieldIsNull;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.ResourceNotFound;
import com.clinica_administracion.sistema_administracion_clinica.repositories.AreaRepository;

@SpringBootTest
public class AreaServiceTest {
  @Mock AreaRepository areaRepo;
  @Mock ModelMapper modelMapper;

  @InjectMocks AreaService areaService;

  private AreaEntity areaEntity1;
  private AreaEntity areaEntity2;
  private AreaEntity areaEntity3;

  private AreaDTO areaDto1;
  private AreaDTO areaDto2;
  private AreaDTO areaDto3;

  private List<AreaDTO> expectedDtoList = new ArrayList<>();
  private List<AreaEntity> returnedEntityList = new ArrayList<>();

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

    /* AreaDTO areafalse = AreaDTO.builder()
    .id(areaEntity3.getId())
    .nombre("Qwerty")
    .activa(true)
    .necesitaTurno(false)
    .build(); */

    when(modelMapper.map(areaEntity1, AreaDTO.class)).thenReturn(areaDto1);
    when(modelMapper.map(areaEntity2, AreaDTO.class)).thenReturn(areaDto2);
    when(modelMapper.map(areaEntity3, AreaDTO.class)).thenReturn(areaDto3);
  }

  @AfterEach
  public void cleanUp() {
    expectedDtoList.clear();
    returnedEntityList.clear();
  }
  
  // getAll___
  @Test
  public void areaService_getAll_returnsExpectedDtosInAList() {
    expectedDtoList = List.of(areaDto1, areaDto2, areaDto3);
    returnedEntityList = List.of(areaEntity1, areaEntity2, areaEntity3);
    when(areaRepo.findAll()).thenReturn(returnedEntityList);

    List<AreaDTO> listaDto = areaService.getAll();

    assertEquals(3, listaDto.size(), "El tamaño de las lista esperada y la actual deberían ser iguales");
    Assertions.assertThat(listaDto)
      .withFailMessage("La lista obtenida debería retornar los dtos esperados: <%s>, <%s>, <%s>", 
        areaDto1.toString(), areaDto2.toString(), areaDto3.toString()
      )
      .containsExactlyInAnyOrder(areaDto1, areaDto2, areaDto3);
    assertAll("Los dtos obtenidos deberían ser los mismos que se obtienen de las entidades", 
      () -> assertTrue(areaDto1.equals(listaDto.get(0)), 
        "El área dto en el índice 0 no es igual al esperado: " + areaDto1.toString() + " - " + listaDto.get(0).toString()),
      () -> assertTrue(areaDto2.equals(listaDto.get(1)), 
        "El área dto en el índice 1 no es igual al esperado: " + areaDto2.toString() + " - " + listaDto.get(1).toString()),
      () -> assertTrue(areaDto3.equals(listaDto.get(2)), 
        "El área dto en el índice 2 no es igual al esperado: " + areaDto3.toString() + " - " + listaDto.get(2).toString())
    );
  }
  
  // getByActiveState___
  @Test
  public void areaService_getByActiveState_returnActivesAreasDtos() throws Exception {
    expectedDtoList = List.of(areaDto1, areaDto3);
    returnedEntityList = List.of(areaEntity1, areaEntity3);
    when(areaRepo.findByActiva(true)).thenReturn(returnedEntityList);

    List<AreaDTO> listaDto = areaService.getByActiveState(true);

    assertEquals(2, listaDto.size(), "El tamaño de las lista esperada y la actual deberían ser iguales");
    Assertions.assertThat(listaDto)
      .withFailMessage("La lista obtenida debería retornar los dtos esperados: <%s>, <%s>", 
        areaDto1.toString(), areaDto3.toString()
      )
    .containsExactlyInAnyOrder(areaDto1, areaDto3);
    assertAll("Los dtos obtenidos deberían ser los mismos que se obtienen de las entidades", 
      () -> assertTrue(areaDto1.equals(listaDto.get(0)), 
        "El área dto en el índice 0 no es igual al esperado: " + areaDto1.toString() + " - " + listaDto.get(0).toString()),
      () -> assertTrue(areaDto3.equals(listaDto.get(1)), 
        "El área dto en el índice 1 no es igual al esperado: " + areaDto3.toString() + " - " + listaDto.get(1).toString())
    );
  }

  @Test
  public void areaService_getByActiveState_returnNotActivesAreasDtos() throws Exception {
    expectedDtoList= List.of(areaDto2);
    returnedEntityList = List.of(areaEntity2);
    when(areaRepo.findByActiva(false)).thenReturn(returnedEntityList);

    List<AreaDTO> listaDto = areaService.getByActiveState(false);

    assertEquals(1, listaDto.size(), "El tamaño de las lista esperada y la actual deberían ser iguales");
    Assertions.assertThat(listaDto)
      .withFailMessage("La lista obtenida debería retornar el dto esperado: <%s>", areaDto2.toString())
    .containsExactlyInAnyOrder(areaDto2);
    assertAll("Los dtos obtenidos deberían ser los mismos que se obtienen de las entidades", 
      () -> assertTrue(areaDto2.equals(listaDto.get(0)), 
        "El área dto en el índice 0 no es igual al esperado: " + areaDto2.toString() + " - " + listaDto.get(0).toString())
    );
  }

  @Test
  public void areaService_getByActiveState_throwsNotNullFieldException() {
    assertThrows(NotNullFieldIsNull.class, () -> areaService.getByActiveState(null), 
      "La función debería arrojar una excepción NotNullFieldIsNull cuando se ingrese un valor nulo.");
  }

  // getById___
  @Test
  public void areaService_getById_getExpectedAreaDTO() throws Exception {
    when(areaRepo.findById(areaEntity1.getId())).thenReturn(Optional.of(areaEntity1));

    AreaDTO resultado = areaService.getById(areaEntity1.getId());

    assertNotNull(resultado, "El resultado no debería ser nulo");
    assertTrue(areaDto1.equals(resultado), String.format("El resultado: %s, debería ser igual a %s", 
      resultado.toString(), areaDto1.toString()));
  }

  @Test
  public void areaService_getByIde_throwsNotNullFieldException() {
    assertThrows(NotNullFieldIsNull.class, () -> areaService.getById(null), 
      "La función debería arrojar una excepción NotNullFieldIsNull cuando se ingrese un valor nulo.");
  }

  @Test
  public void areaService_getByActiveState_throwsResourceNotFoundException() throws Exception {
    UUID idInexistente = UUID.randomUUID();
    when(areaRepo.findById(idInexistente)).thenReturn(Optional.empty());

    assertThrows(ResourceNotFound.class, () -> areaService.getById(idInexistente), 
      "La función debería arrojar una excepción ResourceNotFound cuando no se obtenga un resultado de la búsqueda.");
  }

  // getByName___
  @Test
  public void areaService_getByName_returnsExpectedAreasDto() throws Exception {
    final String searchString = "ologia";
    expectedDtoList = List.of(areaDto1, areaDto2);
    returnedEntityList = List.of(areaEntity1, areaEntity2);
    when(areaRepo.findByNombreLike(searchString)).thenReturn(returnedEntityList);

    List<AreaDTO> actualDtoList = areaService.getByName(searchString);

    assertEquals(2, actualDtoList.size(), "La lista esperada y la actual deberían tener el mismo tamaño.");
    Assertions.assertThat(actualDtoList)
      .withFailMessage("Debería tener los resultados de la lista esperada: %s.", expectedDtoList.toString())
      .containsExactlyInAnyOrder(areaDto1, areaDto2);
    assertAll("Los dtos obtenidos deberían ser los mismos que se obtienen de las entidades.", 
      () -> assertTrue(areaDto1.equals(actualDtoList.get(0)), 
        "El área dto en el índice 0 no es igual al esperado: " + areaDto1.toString() + " - " + actualDtoList.get(0).toString()),
      () -> assertTrue(areaDto2.equals(actualDtoList.get(1)), 
        "El área dto en el índice 1 no es igual al esperado: " + areaDto2.toString() + " - " + actualDtoList.get(1).toString())
    );
  }

  @Test
  public void areaService_getByName_throwsNotNullFielIsNullException() throws Exception {
    assertThrows(NotNullFieldIsNull.class, () -> areaService.getByName(null), 
      "La función debería arrojar una excepción NotNullFieldIsNull cuando se ingrese un valor nulo.");
    assertThrows(NotNullFieldIsNull.class, () -> areaService.getByName(" "), 
      "La función debería arrojar una excepción NotNullFieldIsNull cuando se ingrese un string en blanco.");
    }

  @Test
  public void areaService_getByName_throwsResourceNotFoundException() throws Exception {
    String nombreInexistente = "qwerty";
    when(areaRepo.findByNombreLike(nombreInexistente)).thenReturn(List.of());

    assertThrows(ResourceNotFound.class, () -> areaService.getByName(nombreInexistente), 
      "La función debería arrojar una excepción ResourceNotFound cuando se obtenga una lista vacía en la búsqueda.");
  }

  // create___
}
