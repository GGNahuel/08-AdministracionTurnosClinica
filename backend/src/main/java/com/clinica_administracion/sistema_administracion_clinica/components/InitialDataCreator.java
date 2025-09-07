package com.clinica_administracion.sistema_administracion_clinica.components;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.clinica_administracion.sistema_administracion_clinica.entities.AreaEntity;
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
    }
  }
}
