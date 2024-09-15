package com.clinica_administracion.sistema_administracion_clinica.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.clinica_administracion.sistema_administracion_clinica.entities.PacienteEntity;
import java.util.List;


@Repository
public interface PacienteRepository extends JpaRepository<PacienteEntity, UUID> {
  
  List<PacienteEntity> findByNombreCompletoContainingIgnoreCase(String nombreCompleto);
  
  Optional<PacienteEntity> findByDni(String dni);

  @Query(value = "select p from PacienteEntity p where " +
    "(p.nombreComple like :busqueda or p.dni like :busqueda or :busqueda = '') and " +
    "(p.obraSocial like :obrasocial or :obrasocial = '')"
  )
  List<PacienteEntity> searchPacientes(@Param("busqueda") String busqueda, @Param("obrasocial") String obraSocial);
}
