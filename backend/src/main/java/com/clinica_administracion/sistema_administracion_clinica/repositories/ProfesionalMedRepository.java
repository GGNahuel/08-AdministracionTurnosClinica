package com.clinica_administracion.sistema_administracion_clinica.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.clinica_administracion.sistema_administracion_clinica.entities.ProfesionalMedEntity;


@Repository
public interface ProfesionalMedRepository extends JpaRepository<ProfesionalMedEntity, UUID> {
  
  Optional<ProfesionalMedEntity> findByDni(String dni);

  @Query("select p from ProfesionalMedEntity p where p.consultorio.numeroConsultorio = ?1")
  Optional<ProfesionalMedEntity> findProfesionalByConsultorio(Integer consultorio);

  @Query("Select p from ProfesionalMedEntity p join p.areas a where a.nombre like ?1")
  List<ProfesionalMedEntity> findByAreaName(String nombreArea);

  @Query(value = "select p from ProfesionalMedEntity p left join p.areas a where " +
  "(p.nombreCompleto like %:busqueda% or p.dni like %:busqueda% or :busqueda is null) and " +
  "(cast(p.numMatricula as string) like %:matricula% or :matricula is null) and " +
  "(a.nombre like %:nombrearea% or :nombrearea is null or SIZE(p.areas) = 0)" 
  )
  List<ProfesionalMedEntity> searchProffesionals(@Param("busqueda") String busqueda, @Param("matricula") String matricula, @Param("nombrearea") String area);
}
