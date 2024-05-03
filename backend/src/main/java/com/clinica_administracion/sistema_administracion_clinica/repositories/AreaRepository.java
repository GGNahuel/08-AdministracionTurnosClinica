package com.clinica_administracion.sistema_administracion_clinica.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.clinica_administracion.sistema_administracion_clinica.entities.AreaEntity;
import java.util.List;


@Repository
public interface AreaRepository extends JpaRepository<AreaEntity, UUID> {
  Optional<AreaEntity> findByNombre(String nombre);

  List<AreaEntity> findByActiva(Boolean activa);
}
