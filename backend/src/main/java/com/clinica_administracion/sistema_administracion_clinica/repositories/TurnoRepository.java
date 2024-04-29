package com.clinica_administracion.sistema_administracion_clinica.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.clinica_administracion.sistema_administracion_clinica.entities.TurnoEntity;

@Repository
public interface TurnoRepository extends JpaRepository<TurnoEntity, UUID>{
  @Query("select t from TurnoEntity t where t.paciente.DNI = ?1")
  List<TurnoEntity> findByPacienteDNI(Long dni);
  
  @Query("select t from TurnoEntity t where t.profesional.nombreCompleto like ?1")
  List<TurnoEntity> findByProfesionalNombre(String nombreProfesional);
  
  @Query("select t from TurnoEntity t where t.profesional.DNI = ?1")
  List<TurnoEntity> findByProfesionalDNI(Long dni);
}
