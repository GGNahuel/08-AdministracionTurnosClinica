package com.clinica_administracion.sistema_administracion_clinica.repositories;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.clinica_administracion.sistema_administracion_clinica.entities.TurnoEntity;

@Repository
public interface TurnoRepository extends JpaRepository<TurnoEntity, UUID>{
  @Query("select t from TurnoEntity t where t.paciente.dni = ?1")
  List<TurnoEntity> findByPacienteDNI(String dni);
  
  @Query("select t from TurnoEntity t where t.profesional.dni = ?1")
  List<TurnoEntity> findByProfesionalDNI(String dni);

  @Query("select t from TurnoEntity t where t.profesional.nombreCompleto like ?1")
  List<TurnoEntity> findByProfesionalNombre(String nombreProfesional);
  
  List<TurnoEntity> findByFecha(LocalDate fecha);

  @Query("select t from TurnoEntity t where t.profesional.id = ?1 and t.fecha =?2 and t.horario = ?3")
  Optional<TurnoEntity> findTurnosExistingInDate(UUID id, LocalDate gecha, LocalTime hora);

  @Query("select t from TurnoEntity t where t.fecha < ?1 and t.estadoPago = 'Pago'")
  List<TurnoEntity> selectTurnosAlreadyPassed(LocalDate fecha);
}
