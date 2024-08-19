import { EstadoPago } from "./BackendEnums"

export type horas = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23
export type minutos = 0 | 15 | 30 | 45

export type FatherCheckboxes = "consultorios" | "areas" | "pacientes" | "turnos" | "profesionales"

export interface SearchTurno {
  searchName: string,
  areaName: string,
  estadoPago: typeof EstadoPago[number],
  date: string
}