package com.clinica_administracion.sistema_administracion_clinica.components;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.clinica_administracion.sistema_administracion_clinica.entities.AreaEntity;
import com.clinica_administracion.sistema_administracion_clinica.entities.ConsultorioEntity;
import com.clinica_administracion.sistema_administracion_clinica.entities.ProfesionalMedEntity;
import com.clinica_administracion.sistema_administracion_clinica.entities.UserEntity;
import com.clinica_administracion.sistema_administracion_clinica.others.enums.Roles;
import com.clinica_administracion.sistema_administracion_clinica.repositories.AreaRepository;
import com.clinica_administracion.sistema_administracion_clinica.repositories.ConsultorioRepository;
import com.clinica_administracion.sistema_administracion_clinica.repositories.ProfesionalMedRepository;
import com.clinica_administracion.sistema_administracion_clinica.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class InitialDataCreator implements CommandLineRunner {
  private final AreaRepository areaRepository;
  private final ConsultorioRepository consultorioRepository;
  private final ProfesionalMedRepository profesionalMedRepository;
  private final UserRepository userRepository;

  private final BCryptPasswordEncoder encoder;

  @Override
  public void run(String... args) throws Exception {
    if (userRepository.findByUsername("admin").isEmpty()) {
      userRepository.save(UserEntity.builder()
        .username("admin")
        .password(encoder.encode("123456"))
        .email("adminEmail@mail.com")
        .role(Roles.ADMIN)
      .build());
    }

    if (areaRepository.findAll().isEmpty()) {
      AreaEntity guardia = areaRepository.save(AreaEntity.builder()
        .nombre("Guardia")
        .active(true)
        .necesitaTurno(false)
        .searchName("guardia")
      .build());
      AreaEntity pediatria = areaRepository.save(AreaEntity.builder()
        .nombre("Pediatría")
        .active(true)
        .necesitaTurno(true)
        .searchName("pediatria")
      .build());
      AreaEntity odontologia = areaRepository.save(AreaEntity.builder()
        .nombre("Odontología")
        .active(true)
        .necesitaTurno(true)
        .searchName("odontologia")
      .build());
      AreaEntity oftalmologia = areaRepository.save(AreaEntity.builder()
        .nombre("Oftalmología")
        .active(true)
        .necesitaTurno(true)
        .searchName("oftalmologia")
      .build());
      AreaEntity psicologia = areaRepository.save(AreaEntity.builder()
        .nombre("Psicología")
        .active(false)
        .necesitaTurno(true)
        .searchName("psicologia")
      .build());
      
      ConsultorioEntity cons0 = consultorioRepository.save(new ConsultorioEntity(0));
      ConsultorioEntity cons1 = consultorioRepository.save(new ConsultorioEntity(1));
      ConsultorioEntity cons2 = consultorioRepository.save(new ConsultorioEntity(2));
      ConsultorioEntity cons3 = consultorioRepository.save(new ConsultorioEntity(3));
      ConsultorioEntity cons4 = consultorioRepository.save(new ConsultorioEntity(4));
      ConsultorioEntity cons5 = consultorioRepository.save(new ConsultorioEntity(5));

      String horariosDia = "08:00,08:30,09:00,09:30,10:00,10:30,11:00,11:30";
      String horariosTarde = "16:00,16:30,17:00,17:30,18:00,18:30,19:00,19:30";
      String horariosFull = horariosDia + "," + horariosTarde;

      profesionalMedRepository.save(ProfesionalMedEntity.builder()
        .nombreCompleto("Joaquín")
        .numMatricula(100001)
        .numeroContacto(32456789)
        .dni("41234567")
        .horarios(horariosDia)
        .areas(List.of(guardia))
        .consultorio(cons1)
        .active(true)
      .build());

      profesionalMedRepository.save(ProfesionalMedEntity.builder()
        .nombreCompleto("Carlos")
        .numMatricula(100006)
        .numeroContacto(33456789)
        .dni("41234557")
        .horarios(horariosTarde)
        .areas(List.of(guardia, psicologia))
        .consultorio(cons0)
        .active(true)
      .build());

      profesionalMedRepository.save(ProfesionalMedEntity.builder()
        .nombreCompleto("Miguel")
        .numMatricula(100002)
        .numeroContacto(32145678)
        .dni("42345677")
        .horarios(horariosTarde)
        .areas(List.of(pediatria))
        .consultorio(cons2)
        .active(true)
      .build());

      profesionalMedRepository.save(ProfesionalMedEntity.builder()
        .nombreCompleto("Laura")
        .numMatricula(100003)
        .numeroContacto(32145678)
        .dni("42345678")
        .horarios(horariosFull)
        .areas(List.of(odontologia))
        .consultorio(cons3)
        .active(true)
      .build());

      profesionalMedRepository.save(ProfesionalMedEntity.builder()
        .nombreCompleto("Josefina")
        .numMatricula(100004)
        .numeroContacto(32145676)
        .dni("42345671")
        .horarios(horariosTarde)
        .areas(List.of(oftalmologia))
        .consultorio(cons4)
        .active(true)
      .build());

      profesionalMedRepository.save(ProfesionalMedEntity.builder()
        .nombreCompleto("Laura")
        .numMatricula(100005)
        .numeroContacto(32145675)
        .dni("42345645")
        .horarios(horariosDia)
        .areas(List.of(psicologia))
        .consultorio(cons5)
        .active(true)
      .build());
    }
  }
}
