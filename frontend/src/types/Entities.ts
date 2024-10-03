import { Roles } from "./BackendEnums"

export type Entities = Turno | ProfesionalMed | Paciente | Consultorio | AreaProfesional

export interface Turno {
  id?: string,
  pacienteDto: Paciente,
  fecha: string,
  horario: string,
  areaProfesional: string,
  obraSocial?: string,
  metodoDeAbono?: string
  estadoPago: string,
  comentario?: string,
  consultorio: number,
  profesionalDto: ProfesionalMed,
  activo?: boolean
}

export interface Paciente {
  id?: string,
  nombreCompleto: string,
  dni: string,
  numeroContacto: number,
  obraSocial?: string
}

export interface ProfesionalMed {
  id?: string,
  nombreCompleto: string,
  dni: string,
  numeroContacto: number,
  areas: string[],
  numMatricula: number,
  horarios?: string[],
  consultorio: number
}

export interface AreaProfesional {
  id?: string,
  nombre: string,
  activa?: boolean,
  necesitaTurno: boolean
}

export interface Consultorio {
  id?: string,
  numeroConsultorio: number
}

export interface UserRegistration {
  id?: string,
  username: string, 
  password: string,
  password2: string,
  email: string,
  isProffesional: boolean,
  proffesionalDni: string,
  role: Roles
}

export interface UserBackend {
  id?: string,
  username: string,
  email: string,
  role: Roles,
  proffesionalDni: string
}