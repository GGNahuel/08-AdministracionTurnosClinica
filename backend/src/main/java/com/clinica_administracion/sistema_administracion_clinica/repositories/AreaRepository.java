package com.clinica_administracion.sistema_administracion_clinica.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.clinica_administracion.sistema_administracion_clinica.entities.AreaEntity;


@Repository
public interface AreaRepository extends JpaRepository<AreaEntity, UUID> {
  @Query("select a from AreaEntity a where a.searchName like %:nombre%")
  List<AreaEntity> findByNombreLike(@Param("nombre") String nombre);

  Optional<AreaEntity> findByNombre(String nombre);

  List<AreaEntity> findByActiva(Boolean activa);

  @Query(value = "select a from AreaEntity a where" +
    "(a.activa = :active or :active is null) and " +
    "(a.necesitaTurno = :schedule or :schedule is null)"
  )
  List<AreaEntity> searchAreas(@Param("active") Boolean active, @Param("schedule") Boolean needSchedule);
}
