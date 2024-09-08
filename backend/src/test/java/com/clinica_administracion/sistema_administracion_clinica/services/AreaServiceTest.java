package com.clinica_administracion.sistema_administracion_clinica.services;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Arrays;
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
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.EntityAlreadyExists;
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
    expectedDtoList = new ArrayList<>(Arrays.asList(areaDto1,areaDto2,areaDto3));
    returnedEntityList = new ArrayList<>(Arrays.asList(areaEntity1, areaEntity2, areaEntity3));
    when(areaRepo.findAll()).thenReturn(returnedEntityList);

    List<AreaDTO> listaDto = areaService.getAll();

    assertNotNull(listaDto);
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
    expectedDtoList = new ArrayList<>(Arrays.asList(areaDto1, areaDto3));
    returnedEntityList = new ArrayList<>(Arrays.asList(areaEntity1, areaEntity3));
    when(areaRepo.findByActiva(true)).thenReturn(returnedEntityList);

    List<AreaDTO> listaDto = areaService.getByActiveState(true);

    assertNotNull(listaDto);
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
    expectedDtoList= new ArrayList<>(Arrays.asList(areaDto2));
    returnedEntityList = new ArrayList<>(Arrays.asList(areaEntity2));
    when(areaRepo.findByActiva(false)).thenReturn(returnedEntityList);

    List<AreaDTO> listaDto = areaService.getByActiveState(false);

    assertNotNull(listaDto);
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
  public void areaService_getById_throwsNotNullFieldException() {
    assertThrows(NotNullFieldIsNull.class, () -> areaService.getById(null), 
      "La función debería arrojar una excepción NotNullFieldIsNull cuando se ingrese un valor nulo.");
  }

  @Test
  public void areaService_getById_throwsResourceNotFoundException() throws Exception {
    UUID idInexistente = UUID.randomUUID();
    when(areaRepo.findById(idInexistente)).thenReturn(Optional.empty());

    assertThrows(ResourceNotFound.class, () -> areaService.getById(idInexistente), 
      "La función debería arrojar una excepción ResourceNotFound cuando no se obtenga un resultado de la búsqueda.");
  }

  // getByName___
  @Test
  public void areaService_getByName_returnsExpectedAreasDto() throws Exception {
    final String searchString = "ologia";
    expectedDtoList = new ArrayList<>(Arrays.asList(areaDto1, areaDto2));
    returnedEntityList = new ArrayList<>(Arrays.asList(areaEntity1, areaEntity2));
    when(areaRepo.findByNombreLike(searchString)).thenReturn(returnedEntityList);

    List<AreaDTO> actualDtoList = areaService.getByName(searchString);

    assertNotNull(actualDtoList);
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
    when(areaRepo.findByNombreLike(nombreInexistente)).thenReturn(new ArrayList<>());

    assertThrows(ResourceNotFound.class, () -> areaService.getByName(nombreInexistente), 
      "La función debería arrojar una excepción ResourceNotFound cuando se obtenga una lista vacía en la búsqueda.");
  }

  // create___
  @Test
  public void areaService_create_returnTheCreatedArea() throws Exception {
    String newName = "Pediatría";
    boolean newNecesitaTurnoValue = false;
    AreaEntity newArea = AreaEntity.builder().id(UUID.randomUUID()).nombre(newName).activa(true).necesitaTurno(newNecesitaTurnoValue).build();
    AreaDTO expectedAreaDto = AreaDTO.builder().id(newArea.getId()).nombre(newName).activa(true).necesitaTurno(newNecesitaTurnoValue).build();
    when(areaRepo.save(any(AreaEntity.class))).thenReturn(newArea);
    when(modelMapper.map(newArea, AreaDTO.class)).thenReturn(expectedAreaDto);

    AreaDTO returnArea = areaService.create(newName, newNecesitaTurnoValue);

    assertNotNull(returnArea, "El metodo debería retornar un DTO");
    assertTrue(expectedAreaDto.equals(returnArea), 
      String.format("Debería retornar el DTO esperado: %s, pero obtuvo %s", expectedAreaDto.toString(), returnArea.toString()));
    assertAll("La entidad creada y el dto retornado deberían haberse mapeado correctamente...",
      () -> assertEquals(newArea.getId(), returnArea.getId()),
      () -> assertEquals(newArea.getNombre(), returnArea.getNombre()),
      () -> assertEquals(newArea.getActiva(), returnArea.getActiva()),
      () -> assertEquals(newArea.getNecesitaTurno(), returnArea.getNecesitaTurno())
    );
  }

  @Test
  public void areaService_create_throwsNotNullFieldIsNull() throws Exception {
    assertAll(
      () -> assertThrows(NotNullFieldIsNull.class, () -> areaService.create(" ", false), 
        "Debería arrojar excepción cuando se introduzca un string vacío"),
      () -> assertThrows(NotNullFieldIsNull.class, () -> areaService.create(null, false), 
          "Debería arrojar excepción cuando se introduzca un valor nulo")
    );
  }

  @Test
  public void areaService_create_throwsEntityAlreadyExists() throws Exception {
    String testName = "Laboratorio";
    when(areaRepo.findByNombre(testName)).thenReturn(Optional.of(areaEntity3));

    assertThrows(EntityAlreadyExists.class, () -> areaService.create(testName, false), 
      "Debería arrojar excepción si ya se encuentra una entidad con ese nombre");
  }

  // update___
  @Test
  public void areaService_update_returnsExpectedDto() throws Exception {
    final String testNombre = "Pediatría";
    final UUID testUUID = areaEntity1.getId();
    AreaDTO expectedReturn = AreaDTO.builder().id(testUUID).nombre(testNombre).activa(areaEntity1.getActiva()).necesitaTurno(false).build();
    AreaEntity newAreaEntity = AreaEntity.builder().id(testUUID).nombre(testNombre).activa(areaEntity1.getActiva()).necesitaTurno(false).build();
    when(areaRepo.findById(testUUID)).thenReturn(Optional.of(areaEntity1));
    when(areaRepo.save(any(AreaEntity.class))).thenReturn(newAreaEntity);
    when(modelMapper.map(newAreaEntity, AreaDTO.class)).thenReturn(expectedReturn);

    AreaDTO returnDto = areaService.update(testUUID, testNombre, false);

    assertNotNull(returnDto, "No debería retornar un valor nulo");
    assertTrue(expectedReturn.equals(returnDto), String.format("El retorno no es el esperado. %s no es %s (<- esperado)", returnDto.toString(), expectedReturn.toString()));
    assertAll("Los cambios debieron aplicarse en la entidad ya creada", 
      () -> assertEquals(areaEntity1.getId(), testUUID),
      () -> assertEquals(areaEntity1.getNombre(), testNombre),
      () -> assertEquals(areaEntity1.getNecesitaTurno(), false)
    );
  }

  @Test public void areaService_update_throwsNotNullFieldIsNull() throws Exception {
    assertAll("Debería arrojar la excepción correspondiente cuando se ingrese un campo nulo o vacío",
      () -> assertThrows(NotNullFieldIsNull.class, () -> areaService.update(null, "Ejemplo", false),
      "id fue ingresado null"),
      () -> assertThrows(NotNullFieldIsNull.class, () -> areaService.update(UUID.randomUUID(), " ", false),
      "nombre fue ingresado como un string vacío")
    );
  }

  @Test
  public void areaService_update_throwsEntityAlreadyExists() throws Exception {
    when(areaRepo.findByNombre(anyString())).thenReturn(Optional.of(areaEntity1));

    assertThrows(EntityAlreadyExists.class, 
      () -> areaService.update(UUID.randomUUID(), "ejemplo", false),
      "Debería arrojarse la excepción EntityAlreadyExists si se encuentra una entidad con el nombre dado");
  }

  @Test
  public void areaService_update_throwsResourceNotFound() throws Exception {
    when(areaRepo.findById(any(UUID.class))).thenReturn(Optional.empty());

    assertThrows(ResourceNotFound.class, () -> areaService.update(UUID.randomUUID(), "null", false),
      "Debería arrojar ResourceNotFound cuando no se encuentre un área con la id dada");
  }

  // changeActiveStatus
  @Test
  public void areaService_changeActiveStatus_returnsAreaWithChangedStatus() throws Exception {
    AreaDTO expectedDto = AreaDTO.builder().id(areaDto1.getId()).nombre(areaDto1.getNombre()).activa(false).necesitaTurno(areaDto1.getNecesitaTurno()).build();
    AreaEntity updatedArea = AreaEntity.builder().id(areaDto1.getId()).nombre(areaDto1.getNombre()).activa(false).necesitaTurno(areaDto1.getNecesitaTurno()).build();
    when(areaRepo.findById(any(UUID.class))).thenReturn(Optional.of(areaEntity1));
    when(areaRepo.save(any(AreaEntity.class))).thenReturn(updatedArea);
    when(modelMapper.map(updatedArea, AreaDTO.class)).thenReturn(expectedDto);

    AreaDTO returnedDto = areaService.changeActiveStatus(areaDto1.getId(), false, false);

    assertNotNull(returnedDto);
    assertTrue(expectedDto.equals(returnedDto), "El dto retornado no es el esperado");
    assertEquals(false, areaEntity1.getActiva(), "El cambio no se aplicó correctamente");
  }

  @Test
  public void areaService_changeActiveStatus_throwsResourceNotFound() throws Exception {
    when(areaRepo.findById(any(UUID.class))).thenReturn(Optional.empty());

    assertThrows(ResourceNotFound.class, () -> areaService.changeActiveStatus(UUID.randomUUID(), false, false),
      "Debería arrojar ResourceNotFound cuando no se encuentre un área con la id dada");
  }

  @Test public void areaService_changeActiveStatus_throwsNotNullFieldIsNull() throws Exception {
    assertAll("Debería arrojar la excepción correspondiente cuando se ingrese un campo nulo o vacío",
      () -> assertThrows(NotNullFieldIsNull.class, () -> areaService.changeActiveStatus(null, false, false),
      "id fue ingresado null")
    );
  }
}
