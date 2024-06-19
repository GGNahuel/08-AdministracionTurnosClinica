import React, { useEffect, useState } from "react"
import { API_PREFIX } from "../../constants/VariablesEntorno"

type MessageResponseTypes = {
  text: string,
  messageType: MessageType,
  exceptionCause: string
}

enum MessageType {
  ok, error, warn, common
}

type ResultsInResponseType = Paciente[] | object[] | Turno[] | string[]

interface ResponseTypes {
  message: MessageResponseTypes,
  results: ResultsInResponseType,
  returnValue: object | Paciente
}

type Turno = {
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

type Paciente = {
  id?: string,
  nombreCompleto: string,
  dni: string,
  numeroContacto: number,
  obraSocial?: string,
  turnos?: string[]
}

export function ResultadosPaciente() {
  const [results, setResults] = useState<ResultsInResponseType>()
  const [pacienteSelectedByDni, setPacienteSelected] = useState<{
    dni: string,
    turnos: Turno[]
  }>({
    dni: "",
    turnos: []
  })
  const [returnedPost, setReturnedPost] = useState<ResponseTypes>({
    message: {} as MessageResponseTypes, results: [], returnValue: {}
  })

  useEffect(() => {
    async function generateData() {
      const response = await fetch(API_PREFIX + "/paciente")
      const data : ResponseTypes = await response.json()

      setResults(data.results)
    }
    generateData()
  }, [])

  useEffect(() => {
    async function getPacienteTurnos() {
      if (pacienteSelectedByDni.dni == "") return

      const response = await fetch(API_PREFIX + "/turno/paciente/" + pacienteSelectedByDni.dni)
      const data : ResponseTypes = await response.json()

      setPacienteSelected(prev => ({
        ...prev,
        turnos: data.results as Turno[]
      }))
    }
    getPacienteTurnos()
  }, [pacienteSelectedByDni])

  const showTurnos = (dniPaciente : string) => {
    setPacienteSelected(prevState => ({
      ...prevState,
      dni: dniPaciente
    }))
  }

  const sendRegisterForm = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const $form = ev.currentTarget
    const formData = new FormData($form)

    const pacienteToSend: Paciente = {
      nombreCompleto: formData.get('nombreCompleto') as string,
      dni: formData.get('dni') as string,
      numeroContacto: Number(formData.get('numeroContacto') as string),
      obraSocial: formData.get('obraSocial') as string,
      turnos: []
    };

    const request = await fetch(API_PREFIX + "/paciente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pacienteToSend)
    })
    const returned : ResponseTypes = await request.json()
    setReturnedPost({
      results: returned.results,
      message: {
        text: returned.message.text,
        messageType: returned.message.messageType,
        exceptionCause: returned.message.exceptionCause
      },
      returnValue: returned.returnValue
    })
  }

  return (
    <>
    <section>
      <h2>Listado de pacientes</h2>
        <header className="list_header list paciente">
          <span>Nombre del paciente</span>
          <span>Dni</span>
          <span>Número de contacto</span>
          <span>Obra social</span>
          <span>Turnos</span>
        </header>
        {results?.map((paciente) => {
          const paciente2 = paciente as Paciente
          return (
          <article key={paciente2.id} className="list paciente" style={{border: "2px solid black", margin: "10px"}}>
            <p>{paciente2.nombreCompleto}</p>
            <p>{paciente2.dni}</p>
            <p>{paciente2.numeroContacto}</p>
            <p>{paciente2.obraSocial}</p>
            <div onClick={() => showTurnos(paciente2.dni)}>
              <p>Ver turnos: </p>
            </div>
            <div>
              {pacienteSelectedByDni.dni === paciente2.dni &&  pacienteSelectedByDni.turnos?.map((turno) => (
                <div className="list turno">
                  <strong>{turno.id}</strong>
                  <p>{turno.fecha} - {turno.fecha}</p>
                  <p>{turno.horario}:{turno.horario}</p>
                  <p>{turno.areaProfesional}</p>
                </div>
              ))}
            </div>
          </article>
        )
      })}
    </section>
    {returnedPost.message.text && <h2>{returnedPost.message.text}</h2>}
    {returnedPost.results?.map((element, index) => <p key={index}>{element as string}</p>)}
    <section>
      <form id="pacienteForm" onSubmit={(ev) => sendRegisterForm(ev)}>
        <input type="text" name="nombreCompleto" placeholder="Ingrese el nombre" />
        <input type="text" name="dni" placeholder="Ingrese el dni" />
        <input type="number" name="numeroContacto" placeholder="Ingrese el número de teléfono" />
        <input type="text" name="obraSocial" placeholder="Obra social" />
        <button type="submit">Enviar</button>
      </form>
      {returnedElement(returnedPost.returnValue as Paciente)}
    </section>
    </>
  )
}

const returnedElement = (returnedPost : Paciente) => {
  if (!returnedPost) return
  const pacienteRegistrado = returnedPost

  return (
    <article key={pacienteRegistrado.id} className="list paciente" style={{border: "2px solid black", margin: "10px"}}>
      <p>{pacienteRegistrado.id}</p>
      <p>{pacienteRegistrado.nombreCompleto}</p>
      <p>{pacienteRegistrado.dni}</p>
      <p>{pacienteRegistrado.numeroContacto}</p>
      <p>{pacienteRegistrado.obraSocial}</p>
    </article>
  )
}

/* 
const sendRegisterForm = async (ev: React.FormEvent<HTMLFormElement>) => {
  ev.preventDefault();
  const form = ev.currentTarget;
  const formData = new FormData(form);

  const pacienteToSend: Paciente = {
    nombreCompleto: formData.get('nombreCompleto') as string,
    dni: formData.get('dni') as string,
    numeroContacto: formData.get('numeroContacto') as string,
    obraSocial: formData.get('obraSocial') as string
    // Asegúrate de que los nombres de los campos coincidan con los atributos 'name' de tus inputs
  };

  const request = await fetch(API_PREFIX + "/paciente", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(pacienteToSend)
  });
  const returned = await request.json();
}
*/