package com.clinica_administracion.sistema_administracion_clinica.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.UUID;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.modelmapper.ModelMapper;
import org.springframework.boot.test.context.SpringBootTest;

import com.clinica_administracion.sistema_administracion_clinica.DTOs.AreaDTO;
import com.clinica_administracion.sistema_administracion_clinica.entities.AreaEntity;
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

    when(modelMapper.map(areaEntity1, AreaDTO.class)).thenReturn(areaDto1);
    when(modelMapper.map(areaEntity2, AreaDTO.class)).thenReturn(areaDto2);
    when(modelMapper.map(areaEntity3, AreaDTO.class)).thenReturn(areaDto3);
  }

  @Test
  public void areaService_getAll_returnsAllInDto() {
    List<AreaEntity> lista = List.of(areaEntity1, areaEntity2, areaEntity3);
    when(areaRepo.findAll()).thenReturn(lista);

    List<AreaDTO> listaDto = areaService.getAll();

    assertEquals(3, listaDto.size());
    Assertions.assertThat(listaDto).containsExactlyInAnyOrder(areaDto1, areaDto2, areaDto3);
  }
}
