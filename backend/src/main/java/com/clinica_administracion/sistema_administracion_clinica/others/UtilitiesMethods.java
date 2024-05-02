package com.clinica_administracion.sistema_administracion_clinica.others;

import java.util.regex.Pattern;

import com.clinica_administracion.sistema_administracion_clinica.others.enums.MessageTypes;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.InvalidFormatInput;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.NotNullFieldIsNull;

public class UtilitiesMethods {
  private static void checkArraysHaveSameLength(Object[] array1, Object[] array2) throws Exception {
    if (array1.length != array2.length) throw new Exception("Arrays don't have the same length");
  }

  public static void validateFieldsAreNotEmptyOrNull(String[] fieldNames, Object... fields) throws Exception {
    checkArraysHaveSameLength(fieldNames, fields);
    for (int i = 0; i < fieldNames.length; i++) {
      if (fields[i] == null) throw new NotNullFieldIsNull(fieldNames[i]);
      if (fields[i] instanceof String && ((String) fields[i]).isBlank()) throw new NotNullFieldIsNull(fieldNames[i]);
    }
  }

  public static void validateDniFormat(String dni) {
    String regex = "\\d{7,8}[a-zA-Z]{0,1}";

    if (Pattern.matches(regex, dni)) throw new InvalidFormatInput("dni", dni, "de 7 a 8 digitos (y opcionalmente una letra)");
  }

  public static MessagesDTO messageCreator(String message, MessageTypes messageType) {
    MessagesDTO mapa = new MessagesDTO();
    mapa.setText(message);
    mapa.setType(messageType);
    return mapa;
  }
}
