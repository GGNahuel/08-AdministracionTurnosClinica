package com.clinica_administracion.sistema_administracion_clinica.others;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.regex.Pattern;

import com.clinica_administracion.sistema_administracion_clinica.others.enums.MessageTypes;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.InvalidInput;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.NotNullFieldIsNull;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.ResourceNotFound;
import com.clinica_administracion.sistema_administracion_clinica.others.responseDTOs.MessagesDTO;
import com.clinica_administracion.sistema_administracion_clinica.repositories.AreaRepository;
import com.clinica_administracion.sistema_administracion_clinica.repositories.ConsultorioRepository;
import com.clinica_administracion.sistema_administracion_clinica.repositories.PacienteRepository;
import com.clinica_administracion.sistema_administracion_clinica.repositories.ProfesionalMedRepository;

public class UtilitiesMethods {
  public static DateTimeFormatter formatoFecha = DateTimeFormatter.ofPattern("dd/MM/yyyy");

  private static void checkArraysHaveSameLength(Object[] array1, Object[] array2) throws Exception {
    if (array1.length != array2.length)
      throw new Exception("Arrays don't have the same length");
  }

  public static void validateFieldsAreNotEmptyOrNull(String[] fieldNames, Object... fields) throws Exception {
    checkArraysHaveSameLength(fieldNames, fields);
    for (int i = 0; i < fieldNames.length; i++) {
      if (fields[i] == null)
        throw new NotNullFieldIsNull(fieldNames[i]);
      if (fields[i] instanceof String && ((String) fields[i]).isBlank())
        throw new NotNullFieldIsNull(fieldNames[i]);
      if (fields[i] instanceof List) {
        List<?> lista = (List<?>) fields[i];
        for (Object object : lista) {
          if (object == null)
            throw new NotNullFieldIsNull(fieldNames[i]);
        }
      }
    }
  }

  public static void validateDniFormat(String dni) {
    String regex = "\\d{7,8}[a-zA-Z]{0,1}";

    if (Pattern.matches(regex, dni))
      throw new InvalidInput("dni", dni, "tener de 7 a 8 digitos (y opcionalmente una letra).");
  }

  public static MessagesDTO messageCreator(String message, MessageTypes messageType) {
    MessagesDTO mapa = new MessagesDTO();
    mapa.setText(message);
    mapa.setType(messageType);
    return mapa;
  }

  public static void validateAreaInDto(String areaName, AreaRepository areaRepo) {
    areaRepo.findByNombre(areaName).orElseThrow(
      () -> new ResourceNotFound("área", "nombre", areaName)
    );
  }

  public static void validateConsultorioInDto(Integer consultorio, ConsultorioRepository consultorioRepo) {
    consultorioRepo.findByNumeroConsultorio(consultorio).orElseThrow(
      () -> new ResourceNotFound("consultorio", "número", consultorio.toString())
    );
  }

  public static void validatePacienteInDto(String dni, PacienteRepository pacienteRepo) {
    pacienteRepo.findByDni(dni).orElseThrow(
      () -> new ResourceNotFound("Paciente", "id", dni)
    );
  }

  public static void validateProfesionalMedInDto(String dni, ProfesionalMedRepository profesionalRepo) {
    profesionalRepo.findByDni(dni).orElseThrow(
      () -> new ResourceNotFound("Profesional médico", "id", dni)
    );
  }
}
