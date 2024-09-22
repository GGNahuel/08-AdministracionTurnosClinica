import { EstadoPago } from "./BackendEnums";

export type SearchTypes = SearchTurno | SearchProffesional | SearchPaciente | SearchArea

export interface SearchTurno {
  searchName: string,
  areaName: string,
  estadoPago: typeof EstadoPago[number],
  date: string
}

export interface SearchProffesional {
  search: string,
  matricula: string,
  area: string
}

export interface SearchPaciente {
  search: string,
  obraSocial: string
}

export interface SearchConsultorio {

}

export interface SearchArea {
  status: boolean | null, 
  schedule: boolean | null
}
