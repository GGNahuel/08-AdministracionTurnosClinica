package com.clinica_administracion.sistema_administracion_clinica.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.clinica_administracion.sistema_administracion_clinica.entities.PacienteEntity;

@Repository
public interface PacienteRepository extends JpaRepository<PacienteEntity, UUID> {
  
  Optional<PacienteEntity> findByDNI(String dni);
}
