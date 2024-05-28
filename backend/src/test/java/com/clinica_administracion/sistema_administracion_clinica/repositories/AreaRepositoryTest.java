package com.clinica_administracion.sistema_administracion_clinica.repositories;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.clinica_administracion.sistema_administracion_clinica.entities.AreaEntity;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class AreaRepositoryTest {
  private AreaRepository areaRepo;

  @Autowired
  public AreaRepositoryTest(AreaRepository areaRepo) {
    this.areaRepo = areaRepo;
  }

  AreaEntity areaConTurnos;
  AreaEntity areaSinTurnos;

  @BeforeEach
  public void setUp() {
    areaConTurnos = new AreaEntity();
    areaConTurnos.setId(UUID.fromString("44448888-1111-2222-3333-987654321abc"));
    areaConTurnos.setNombre("Cardiología");
    areaConTurnos.setActiva(true);
    areaConTurnos.setNecesitaTurno(true);

    areaSinTurnos = new AreaEntity();
    areaSinTurnos.setId(UUID.fromString("aaaabbbb-1234-4321-abcd-123456789abc"));
    areaSinTurnos.setNombre("Laboratorio");
    areaSinTurnos.setActiva(true);
    areaSinTurnos.setNecesitaTurno(false);
  }

  @Test
  public void testFindByNombreLike_assert1() {
    areaRepo.save(areaConTurnos);
    areaRepo.save(areaSinTurnos);
    List<AreaEntity> lista = areaRepo.findByNombreLike("cardiologia");

    assertEquals(1, lista.size());
  }
}
