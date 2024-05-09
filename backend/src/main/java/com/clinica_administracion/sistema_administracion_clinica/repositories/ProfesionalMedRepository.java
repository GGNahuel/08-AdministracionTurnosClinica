package com.clinica_administracion.sistema_administracion_clinica.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.clinica_administracion.sistema_administracion_clinica.entities.ProfesionalMedEntity;

@Repository
public interface ProfesionalMedRepository extends JpaRepository<ProfesionalMedEntity, UUID> {
  
  Optional<ProfesionalMedEntity> findByDni(String dni);

  @Query("select p from ProfesionalMedEntity p where p.consultorio.numeroConsultorio = ?1")
  Optional<ProfesionalMedEntity> findProfesionalByConsultorio(Integer consultorio);
}
