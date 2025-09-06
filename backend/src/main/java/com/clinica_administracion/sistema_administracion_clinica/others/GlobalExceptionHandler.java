package com.clinica_administracion.sistema_administracion_clinica.others;

import java.util.Arrays;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.clinica_administracion.sistema_administracion_clinica.dtos.responseDtos.GetResponseDTO;
import com.clinica_administracion.sistema_administracion_clinica.dtos.responseDtos.MessageResponseDTO;
import com.clinica_administracion.sistema_administracion_clinica.dtos.responseDtos.MessagesDTO;
import com.clinica_administracion.sistema_administracion_clinica.dtos.responseDtos.ResponseDTO;
import com.clinica_administracion.sistema_administracion_clinica.dtos.responseDtos.ReturnResponseDTO;
import com.clinica_administracion.sistema_administracion_clinica.others.enums.MessageTypes;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.EntityAlreadyExists;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.InvalidInput;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.NotNullFieldIsNull;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.ResourceNotFound;

@RestControllerAdvice
public class GlobalExceptionHandler {
  private MessagesDTO generateMessageDTO(Exception ex) {
    MessagesDTO message = new MessagesDTO();
    message.setText(ex.getMessage());
    message.setType(MessageTypes.error);
    if (ex.getCause() != null)
      message.setExceptionCause(ex.getCause().toString());
    else message.setExceptionCause(ex.getLocalizedMessage());

    return message;
  }

  @ExceptionHandler(EntityAlreadyExists.class)
  public ResponseEntity<ResponseDTO> entityAlreadyExistsHandler(EntityAlreadyExists ex) {
    ReturnResponseDTO response = new ReturnResponseDTO();
    response.setMessage(generateMessageDTO(ex));
    response.setReturnValue(ex.getExistingEntity());

    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(ResourceNotFound.class)
  public ResponseEntity<ResponseDTO> resourceNotFoundHandler(ResourceNotFound ex) {
    MessageResponseDTO response = new MessageResponseDTO();
    response.setMessage(generateMessageDTO(ex));

    return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(NotNullFieldIsNull.class)
  public ResponseEntity<ResponseDTO> NotNullFieldIsNullHandler(NotNullFieldIsNull ex) {
    MessageResponseDTO response = new MessageResponseDTO();
    response.setMessage(generateMessageDTO(ex));

    return new ResponseEntity<>(response, HttpStatus.NOT_ACCEPTABLE);
  }

  @ExceptionHandler(InvalidInput.class)
  public ResponseEntity<ResponseDTO> InvalidInputHandler(InvalidInput ex) {
    MessageResponseDTO response = new MessageResponseDTO();
    response.setMessage(generateMessageDTO(ex));

    return new ResponseEntity<>(response, HttpStatus.NOT_ACCEPTABLE);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ResponseDTO> GeneralExceptionHandler(Exception ex) {
    MessagesDTO message = new MessagesDTO();
    message.setText(ex.getMessage());
    message.setType(MessageTypes.warn);
    if (ex.getCause() != null)
      message.setExceptionCause(ex.getCause().toString());
    else message.setExceptionCause(ex.getLocalizedMessage());

    GetResponseDTO response = new GetResponseDTO();
    response.setMessage(message);
    response.setResults(Arrays.asList(ex.getStackTrace()));

    return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
