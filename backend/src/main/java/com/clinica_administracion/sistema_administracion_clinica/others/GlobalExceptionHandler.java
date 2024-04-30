package com.clinica_administracion.sistema_administracion_clinica.others;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.clinica_administracion.sistema_administracion_clinica.others.enums.MessageTypes;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.EntityAlreadyExists;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.NotNullFieldIsNull;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.ResourceNotFound;

@RestControllerAdvice
public class GlobalExceptionHandler {
  @ExceptionHandler(EntityAlreadyExists.class)
  public ResponseEntity<MessagesDTO> entityAlreadyExistsHandler(EntityAlreadyExists ex) {
    MessagesDTO response = new MessagesDTO();
    response.setText(ex.getMessage());
    response.setType(MessageTypes.error);
    response.setExceptionCause(ex.getCause().toString());

    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(ResourceNotFound.class)
  public ResponseEntity<MessagesDTO> resourceNotFoundHandler(ResourceNotFound ex) {
    MessagesDTO response = new MessagesDTO();
    response.setText(ex.getMessage());
    response.setType(MessageTypes.error);
    response.setExceptionCause(ex.getCause().toString());

    return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(NotNullFieldIsNull.class)
  public ResponseEntity<MessagesDTO> NotNullFieldIsNullHandler(NotNullFieldIsNull ex) {
    MessagesDTO response = new MessagesDTO();
    response.setText(ex.getMessage());
    response.setType(MessageTypes.error);
    response.setExceptionCause(ex.getCause().toString());

    return new ResponseEntity<>(response, HttpStatus.NOT_ACCEPTABLE);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<MessagesDTO> GeneralExceptionHandler(Exception ex) {
    MessagesDTO response = new MessagesDTO();
    response.setText(ex.getMessage());
    response.setType(MessageTypes.error);
    response.setExceptionCause(ex.getCause().toString());

    return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
