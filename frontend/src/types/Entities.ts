export type Turno = {
  id?: string,
  pacienteDni: string,
  fecha: string,
  horario: string,
  areaProfesional: string,
  obraSocial: string,
  metodoDeAbono?: string
  estadoPago: string,
  comentario?: string,
  consultorio: number,
  profesionalDni: string,
  activo?: boolean
}

export type Paciente = {
  id?: string,
  nombreCompleto: string,
  dni: string,
  numeroContacto: number,
  obraSocial?: string,
  turnos?: string[]
}