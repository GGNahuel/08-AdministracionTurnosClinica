package com.clinica_administracion.sistema_administracion_clinica.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.clinica_administracion.sistema_administracion_clinica.entities.UserEntity;
import java.util.List;
import java.util.Optional;
import com.clinica_administracion.sistema_administracion_clinica.others.enums.Roles;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, UUID>{
  Optional<UserEntity> findByUsername(String username);

  List<UserEntity> findByRole(Roles role);
}
