package com.clinica_administracion.sistema_administracion_clinica.others;

import java.util.Arrays;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.clinica_administracion.sistema_administracion_clinica.others.enums.MessageTypes;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.EntityAlreadyExists;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.InvalidInput;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.NotNullFieldIsNull;
import com.clinica_administracion.sistema_administracion_clinica.others.exceptions.ResourceNotFound;
import com.clinica_administracion.sistema_administracion_clinica.others.responseDTOs.MessagesDTO;
import com.clinica_administracion.sistema_administracion_clinica.others.responseDTOs.ResponseDTO;

@RestControllerAdvice
public class GlobalExceptionHandler {
  private ResponseDTO generateResponseDTO(Exception ex) {
    MessagesDTO message = new MessagesDTO();
    message.setText(ex.getMessage());
    message.setType(MessageTypes.error);
    if (ex.getCause() != null)
      message.setExceptionCause(ex.getCause().toString());
    else message.setExceptionCause(ex.getLocalizedMessage());

    ResponseDTO response = new ResponseDTO();
    response.setMessage(message);

    return response;
  }

  @ExceptionHandler(EntityAlreadyExists.class)
  public ResponseEntity<ResponseDTO> entityAlreadyExistsHandler(EntityAlreadyExists ex) {
    ResponseDTO response = generateResponseDTO(ex);
    response.setReturnValue(ex.getExistingEntity());

    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(ResourceNotFound.class)
  public ResponseEntity<ResponseDTO> resourceNotFoundHandler(ResourceNotFound ex) {
    ResponseDTO response = generateResponseDTO(ex);

    return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(NotNullFieldIsNull.class)
  public ResponseEntity<ResponseDTO> NotNullFieldIsNullHandler(NotNullFieldIsNull ex) {
    ResponseDTO response = generateResponseDTO(ex);

    return new ResponseEntity<>(response, HttpStatus.NOT_ACCEPTABLE);
  }

  @ExceptionHandler(InvalidInput.class)
  public ResponseEntity<ResponseDTO> InvalidInputHandler(InvalidInput ex) {
    ResponseDTO response = generateResponseDTO(ex);

    return new ResponseEntity<>(response, HttpStatus.NOT_ACCEPTABLE);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ResponseDTO> GeneralExceptionHandler(Exception ex) {
    ResponseDTO response = generateResponseDTO(ex);
    response.setResults(Arrays.asList(ex.getStackTrace()));

    return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
