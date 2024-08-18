package com.clinica_administracion.sistema_administracion_clinica.DTOs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchTurnoDto {
  private String searchName;
  private String date;
  private String areaName;
  private String estadoPago;
}
