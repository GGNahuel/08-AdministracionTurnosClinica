package com.clinica_administracion.sistema_administracion_clinica.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.clinica_administracion.sistema_administracion_clinica.entities.AreaEntity;


@Repository
public interface AreaRepository extends JpaRepository<AreaEntity, UUID> {
  @Query("SELECT a FROM AreaEntity a " +
    "WHERE LOWER(TRANSLATE(a.nombre, 'ÁÉÍÓÚáéíóú', 'AEIOUaeiou')) " +
    "LIKE LOWER(TRANSLATE(CONCAT('%', ?1, '%'), 'ÁÉÍÓÚáéíóú', 'AEIOUaeiou'))")
  List<AreaEntity> findByNombreLike(String nombre);

  Optional<AreaEntity> findByNombre(String nombre);

  List<AreaEntity> findByActiva(Boolean activa);
}
