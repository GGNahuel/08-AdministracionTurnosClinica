package com.clinica_administracion.sistema_administracion_clinica.others;

import com.clinica_administracion.sistema_administracion_clinica.others.enums.MessageTypes;
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

  public static MessagesDTO messageCreator(String message, MessageTypes messageType) {
    MessagesDTO mapa = new MessagesDTO();
    mapa.setText(message);
    mapa.setType(messageType);
    return mapa;
  }
}
