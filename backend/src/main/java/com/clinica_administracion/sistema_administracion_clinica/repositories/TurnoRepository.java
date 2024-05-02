package com.clinica_administracion.sistema_administracion_clinica.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.clinica_administracion.sistema_administracion_clinica.entities.TurnoEntity;
import java.time.LocalDate;


@Repository
public interface TurnoRepository extends JpaRepository<TurnoEntity, UUID>{
  @Query("select t from TurnoEntity t where t.paciente.dni = ?1")
  List<TurnoEntity> findByPacienteDNI(String dni);
  
  @Query("select t from TurnoEntity t where t.profesional.nombreCompleto like ?1")
  List<TurnoEntity> findByProfesionalNombre(String nombreProfesional);
  
  @Query("select t from TurnoEntity t where t.profesional.dni = ?1")
  List<TurnoEntity> findByProfesionalDNI(String dni);

  List<TurnoEntity> findByFecha(LocalDate fecha);

  // query para eliminar los turnos que ya pasaron y no tengan nada a deuda
}
