import { Paciente, Turno } from "./Entities"

enum MessageType {
  ok, error, warn, common
}

export interface MessageInterface {
  text: string,
  messageType: MessageType,
  exceptionCause: string
}

export type ResultsInGetResponse = Paciente[] | Turno[] | object[] | string[]
type ReturnValuInResponseType = Paciente | Turno | object

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