import { EstadoPago } from "./BackendEnums";

export interface SearchTurno {
  searchName: string,
  areaName: string,
  estadoPago: typeof EstadoPago[number],
  date: string
}