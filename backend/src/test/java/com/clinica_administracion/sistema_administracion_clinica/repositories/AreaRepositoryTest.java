package com.clinica_administracion.sistema_administracion_clinica.repositories;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import com.clinica_administracion.sistema_administracion_clinica.entities.AreaEntity;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class AreaRepositoryTest {
  private final AreaRepository areaRepo;
  private final TestEntityManager testEntityManager;

  public AreaRepositoryTest(AreaRepository areaRepo, TestEntityManager testEntityManager) {
    this.areaRepo = areaRepo;
    this.testEntityManager = testEntityManager;
  }

  private AreaEntity areaConTurnos;
  private AreaEntity areaSinTurnos;
  private AreaEntity areaInactiva;

  @BeforeEach
  public void setUp() {
    areaConTurnos = new AreaEntity();
    areaConTurnos.setNombre("Cardiología");
    areaConTurnos.setActive(true);
    areaConTurnos.setNecesitaTurno(true);

    areaSinTurnos = new AreaEntity();
    areaSinTurnos.setNombre("Laboratorio");
    areaSinTurnos.setActive(true);
    areaSinTurnos.setNecesitaTurno(false);
    
    areaInactiva = new AreaEntity();
    areaInactiva.setNombre("Odontología");
    areaInactiva.setActive(false);
    areaInactiva.setNecesitaTurno(true);

    testEntityManager.persistAndFlush(areaConTurnos);
    testEntityManager.persistAndFlush(areaSinTurnos);
    testEntityManager.persistAndFlush(areaInactiva);
    // System.out.println(areaConTurnos.toString());
  }

  @Test
  public void areaRepo_save_newEntity() {
    AreaEntity areaSaved = areaRepo.save(
      AreaEntity.builder().nombre("Pediatría").active(true).necesitaTurno(false).build()
    );

    assertNotNull(areaSaved, "El método debería retornar una nueva entidad");
    assertNotNull(areaSaved.getId(), "Se debería generar una id automáticamente");
    assertNotNull(testEntityManager.find(AreaEntity.class, areaSaved.getId()), "La entidad debería haberse guardado en la base de datos");
  }

  @Test
  public void areaRepo_save_updateEntity() {
    UUID referenceId = areaConTurnos.getId();
    AreaEntity areaToUpdate = AreaEntity.builder().id(referenceId).nombre("Pediatría").active(true).necesitaTurno(false).build();

    areaRepo.save(areaToUpdate);

    assertEquals("Pediatría", testEntityManager.find(AreaEntity.class, referenceId).getNombre(), 
      "El cambio debió haberse aplicado en la entidad con el id dado");
  }

  @Test
  public void areaRepo_checkIds() {
    Optional<AreaEntity> areaPrueba = areaRepo.findById(areaInactiva.getId());

    assertNotEquals(Optional.empty(), areaPrueba);
    assertEquals("Odontología", areaPrueba.get().getNombre());
  }
  @Test
  public void areaRepo_getAll() {
    List<AreaEntity> lista = areaRepo.findAll();

    assertEquals(3, lista.size());
  }

  @Test
  public void areaRepo_findByNombreLike_checkIgnoreCasesAndAccents() {
    List<AreaEntity> lista = areaRepo.findByNombreLike("cardiologia");

    assertEquals(1, lista.size());
  }
  @Test
  public void areaRepo_findByNombreLike_checkAssertNotCompleteNames() {
    List<AreaEntity> lista = areaRepo.findByNombreLike("gia");

    assertEquals(2, lista.size());
  }

  @Test
  public void areaRepo_findByNombre_assert() {
    Optional<AreaEntity> areaPrueba = areaRepo.findByNombre("Odontología");

    assertNotEquals(Optional.empty(), areaPrueba);
    assertEquals("Odontología", areaPrueba.get().getNombre());
  }
  @Test
  public void areaRepo_findByNombre_notAssert() {
    Optional<AreaEntity> areaPrueba = areaRepo.findByNombre("Odon");

    assertEquals(Optional.empty(), areaPrueba);
  }

  @Test
  public void areaRepo_findByActiva_assert() {
    List<AreaEntity> lista = areaRepo.findByActive(true);

    assertEquals(2, lista.size());
  }
}
