package com.clinica_administracion.sistema_administracion_clinica.repositories;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import java.util.List;
import java.util.Optional;

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
  private final AreaRepository areaRepo;

  @Autowired
  public AreaRepositoryTest(AreaRepository areaRepo) {
    this.areaRepo = areaRepo;
  }

  private AreaEntity areaConTurnos;
  private AreaEntity areaSinTurnos;
  private AreaEntity areaInactiva;

  @BeforeEach
  public void setUp() {
    areaConTurnos = new AreaEntity();
    areaConTurnos.setNombre("Cardiología");
    areaConTurnos.setActiva(true);
    areaConTurnos.setNecesitaTurno(true);

    areaSinTurnos = new AreaEntity();
    areaSinTurnos.setNombre("Laboratorio");
    areaSinTurnos.setActiva(true);
    areaSinTurnos.setNecesitaTurno(false);
    
    areaInactiva = new AreaEntity();
    areaInactiva.setNombre("Odontología");
    areaInactiva.setActiva(false);
    areaInactiva.setNecesitaTurno(true);

    areaRepo.save(areaConTurnos);
    areaRepo.save(areaSinTurnos);
    areaRepo.save(areaInactiva);
    // System.out.println(areaConTurnos.toString());
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
    List<AreaEntity> lista = areaRepo.findByActiva(true);

    assertEquals(2, lista.size());
  }
}
