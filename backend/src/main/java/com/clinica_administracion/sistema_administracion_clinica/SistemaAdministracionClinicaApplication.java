package com.clinica_administracion.sistema_administracion_clinica;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SistemaAdministracionClinicaApplication {

  @Bean
  ModelMapper modelMapper() {
		return new ModelMapper();
	}
	public static void main(String[] args) {
		SpringApplication.run(SistemaAdministracionClinicaApplication.class, args);
	}

}
