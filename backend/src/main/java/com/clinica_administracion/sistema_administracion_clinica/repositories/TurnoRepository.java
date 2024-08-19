package com.clinica_administracion.sistema_administracion_clinica.repositories;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.clinica_administracion.sistema_administracion_clinica.entities.TurnoEntity;
import com.clinica_administracion.sistema_administracion_clinica.others.enums.EstadoPago;

@Repository
public interface TurnoRepository extends JpaRepository<TurnoEntity, UUID>{
  @Query("select t from TurnoEntity t where t.paciente.dni = ?1")
  List<TurnoEntity> findByPacienteDNI(String dni);
  
  @Query("select t from TurnoEntity t where t.profesional.dni = ?1")
  List<TurnoEntity> findByProfesionalDNI(String dni);

  @Query("select t from TurnoEntity t where t.profesional.nombreCompleto like ?1")
  List<TurnoEntity> findByProfesionalNombre(String nombreProfesional);

  @Query("select t from TurnoEntity t where t.areaProfesional.nombre like ?1")
  List<TurnoEntity> findByArea(String nombre);
  
  List<TurnoEntity> findByFecha(LocalDate fecha);

  @Query("select t from TurnoEntity t where t.fecha >= ?1 and t.areaProfesional.nombre = ?2")
  List<TurnoEntity> findNextTurnosInArea(LocalDate fecha, String nombreArea);

  @Query("select t from TurnoEntity t where t.profesional.id = ?1 and t.fecha = ?2 and t.horario = ?3")
  Optional<TurnoEntity> findTurnosExistingInDate(UUID id, LocalDate fecha, LocalTime hora);

  @Query("select t from TurnoEntity t where t.fecha < ?1 and t.estadoPago = 'Pagado'")
  List<TurnoEntity> selectTurnosAlreadyPassed(LocalDate fecha);

  @Query(value = "select t from TurnoEntity t where " + 
    "(t.paciente.nombreCompleto like %:nombre% or t.profesional.nombreCompleto like %:nombre% or :nombre = '') and " +
    "(t.areaProfesional.nombre = :area or :area = '') and " +
    "(t.estadoPago = :estadoPago or :estadoPago = null) and " +
    "(t.fecha = :fecha or :fecha = null)")
  List<TurnoEntity> searchTurnos(@Param("nombre") String nombre, @Param("area") String nombreArea, 
    @Param("estadoPago") EstadoPago estado, @Param("fecha") LocalDate fecha);
}
