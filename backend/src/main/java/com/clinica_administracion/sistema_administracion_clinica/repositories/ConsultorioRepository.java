package com.clinica_administracion.sistema_administracion_clinica.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clinica_administracion.sistema_administracion_clinica.entities.ConsultorioEntity;


public interface ConsultorioRepository extends JpaRepository<ConsultorioEntity, UUID> {
  
  Optional<ConsultorioEntity> findByNumeroConsultorio(Integer numeroConsultorio);
}
