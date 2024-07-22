import { AreaProfesional, Paciente, ProfesionalMed, Turno, Consultorio } from "./Entities"

type MessageType = "ok" | "error" | "warn" | "common"

export interface MessageInterface {
  text: string,
  messageType: MessageType,
  exceptionCause: string
}

export type ResultsInGetResponse = Paciente[] | Turno[] | ProfesionalMed[] | AreaProfesional[] | Consultorio[] | object[] | string[]
type ReturnValuInResponseType = Paciente | Turno | ProfesionalMed | AreaProfesional | Consultorio | object

export interface GetResponseType {
  message: MessageInterface,
  results: ResultsInGetResponse,
}

export interface ReturnResponseType {
  message: MessageInterface,
  returnValue: ReturnValuInResponseType
}

export interface MessageResponseType {
  message: MessageInterface
}