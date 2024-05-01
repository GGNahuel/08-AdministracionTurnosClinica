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
  public ResponseEntity<ResponseDTO> entityAlreadyExistsHandler(EntityAlreadyExists ex) {
    MessagesDTO message = new MessagesDTO();
    message.setText(ex.getMessage());
    message.setType(MessageTypes.error);
    message.setExceptionCause(ex.getCause().toString());

    ResponseDTO response = new ResponseDTO();
    response.setMessage(message);
    response.setReturnValue(ex.getExistingEntity());

    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(ResourceNotFound.class)
  public ResponseEntity<ResponseDTO> resourceNotFoundHandler(ResourceNotFound ex) {
    MessagesDTO message = new MessagesDTO();
    message.setText(ex.getMessage());
    message.setType(MessageTypes.error);
    message.setExceptionCause(ex.getCause().toString());

    ResponseDTO response = new ResponseDTO();
    response.setMessage(message);

    return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(NotNullFieldIsNull.class)
  public ResponseEntity<ResponseDTO> NotNullFieldIsNullHandler(NotNullFieldIsNull ex) {
    MessagesDTO message = new MessagesDTO();
    message.setText(ex.getMessage());
    message.setType(MessageTypes.error);
    message.setExceptionCause(ex.getCause().toString());
    
    ResponseDTO response = new ResponseDTO();
    response.setMessage(message);

    return new ResponseEntity<>(response, HttpStatus.NOT_ACCEPTABLE);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ResponseDTO> GeneralExceptionHandler(Exception ex) {
    MessagesDTO message = new MessagesDTO();
    message.setText(ex.getMessage());
    message.setType(MessageTypes.error);
    message.setExceptionCause(ex.getCause().toString());
    
    ResponseDTO response = new ResponseDTO();
    response.setMessage(message);

    return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
