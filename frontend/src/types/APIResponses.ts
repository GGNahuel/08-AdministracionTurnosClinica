import { AreaProfesional, Paciente, ProfesionalMed, Turno, Consultorio, Entities } from "./Entities"

type MessageType = "ok" | "error" | "warn" | "common"

export interface MessageInterface {
  text: string,
  messageType: MessageType,
  exceptionCause: string
}
export interface MessageResponseType {
  message: MessageInterface
}

export type ResponseType = GetResponseType | ReturnResponseType

export interface GetResponseType {
  message: MessageInterface | null,
  results: ResultsInGetResponse,
}
export type ResultsInGetResponse = Paciente[] | Turno[] | ProfesionalMed[] | AreaProfesional[] | Consultorio[] | object[] | string[]

export interface ReturnResponseType {
  message: MessageInterface,
  returnValue: ReturnValueInResponseType
}
type ReturnValueInResponseType = Entities | object
