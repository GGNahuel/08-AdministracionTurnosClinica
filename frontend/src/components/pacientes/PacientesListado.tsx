import { useEffect, useState } from "react"
import { API_PREFIX } from "../../constants/VariablesEntorno"

type MessageResponseTypes = {
  text: string,
  messageType: MessageType,
  esceptionCause: string
}

enum MessageType {
  ok, error, warn, common
}

type ResultsInResponseType = Paciente[] | object[]

interface ResponseTypes {
  message: MessageResponseTypes,
  results: ResultsInResponseType,
  returnValue: object
}

type Paciente = {
  id: string,
  nombreCompleto: string,
  dni: string,
  numeroContacto: number,
  obraSocial?: string,
  turnos?: string[]
}

export function ResultadosPaciente() {
  const [results, setResults]= useState<ResultsInResponseType>()

  useEffect(() => {
    async function generateData() {
      const response = await fetch(API_PREFIX + "/paciente")
      const data : ResponseTypes = await response.json()

      setResults(data.results)
    }
    generateData()
  }, [])

  return (
    <section>
      <h2>Listado de pacientes</h2>
      {results?.map((paciente) => {
        const paciente2 = paciente as Paciente
        return (
          <article key={paciente2.id} style={{border: "2px solid black", margin: "10px"}}>
          <h3>{paciente2.nombreCompleto}</h3>
          <p>{paciente2.dni}</p>
          <p>{paciente2.numeroContacto}</p>
          <p>{paciente2.obraSocial}</p>
        </article>
        )
      })}
    </section>
  )
}