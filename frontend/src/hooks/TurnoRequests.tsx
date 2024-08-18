import { useEffect, useState } from "react"
import { Paciente, ProfesionalMed, Turno } from "../types/Entities"
import { API_PREFIX, DATE_FORMAT } from "../constants/VariablesEntorno"
import { GetResponseType, MessageInterface, ReturnResponseType } from "../types/APIResponses"

export function useGetAllTurnos() {
  const [getResponse, setGetResponse] = useState<GetResponseType>({
    message: {} as MessageInterface,
    results: [] as Turno[]
  })

  useEffect(() => {
    async function generateData() {
      const response = await fetch(API_PREFIX + "/turno")
      const data : GetResponseType = await response.json()

      setGetResponse(data)
    }
    generateData()
  }, [])

  return getResponse
}

export function useGetTurnosByDate(fecha: string) {
  const [getResponse, setGetResponse] = useState<GetResponseType>({
    message: {} as MessageInterface,
    results: [] as Turno[]
  })

  useEffect(() => {
    async function generateData() {
      const response = await fetch(API_PREFIX + "/turno/?fecha=" + encodeURIComponent(fecha))
      const data : GetResponseType = await response.json()

      setGetResponse(data)
    }
    if (DATE_FORMAT.test(fecha)) generateData()
    else console.log("La fecha ingresada no tiene el formato adecuado")
  }, [fecha])

  return getResponse
}

export function usePostTurno() {
  const [returnedPost, setReturnedPost] = useState<ReturnResponseType | GetResponseType>({
    message: {} as MessageInterface, returnValue: {} as Turno
  })

  const sendData = async (ev: React.FormEvent<HTMLFormElement>, areaSelected: string, turnDate: {date: string, hour: string}) => {
    ev.preventDefault()
    const $form = ev.currentTarget
    const formData = new FormData($form)

    const dniProfesional = formData.get("profesional") as string
    let dataProfesional: GetResponseType | null = null
    if (dniProfesional && dniProfesional != "") {
      const responseProfesional = await fetch(API_PREFIX + "/profesional/" + formData.get("profesional") as string)
      dataProfesional = await responseProfesional.json()
    }

    const dniPaciente = formData.get("paciente") as string
    let dataPaciente: GetResponseType | null = null
    if (dniPaciente && dniPaciente != "") {
      const responsePaciente = await fetch(API_PREFIX + "/paciente/" + formData.get("paciente") as string)
      dataPaciente = await responsePaciente.json()
    }

    if (dataPaciente?.message.messageType == "error") {
      setReturnedPost(dataPaciente)
      return
    }
    if (dataProfesional?.message.messageType == "error") {
      setReturnedPost(dataProfesional)
      return
    }

    const dataToSend : Turno = {
      profesionalDto: dataProfesional?.results[0] as ProfesionalMed || null,
      pacienteDto: dataPaciente?.results[0] as Paciente || null,
      fecha: turnDate.date,
      horario: turnDate.hour,
      areaProfesional: areaSelected,
      consultorio: (dataProfesional?.results[0] as ProfesionalMed).consultorio,
      estadoPago: formData.get("estadoPago") as string,
      comentario: formData.get("comentario") as string
    }

    const request = await fetch(API_PREFIX + "/turno", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataToSend)
    })
    const returned : ReturnResponseType = await request.json()
    setReturnedPost({
      message: returned.message,
      returnValue: returned.returnValue
    })
  }

  return {returnedPost, sendData}
}

export function useGetTurnosByPaciente() {
  const [pacienteSelectedByDni, setPacienteSelected] = useState<{
    dni: string,
    turnos: Turno[]
  }>({
    dni: "",
    turnos: []
  })

  useEffect(() => {
    async function getPacienteTurnos() {
      if (pacienteSelectedByDni.dni == "") return

      const response = await fetch(API_PREFIX + "/turno/paciente/" + pacienteSelectedByDni.dni)
      const data : GetResponseType = await response.json()

      setPacienteSelected(prev => ({
        ...prev,
        turnos: data.results as Turno[]
      }))
    }
    getPacienteTurnos()
  }, [pacienteSelectedByDni.dni])

  return {pacienteSelectedByDni, setPacienteSelected}
}

export function useGetNextTurnosByArea(fecha: string, nombreArea: string) {
  const [getResponse, setGetResponse] = useState<GetResponseType | null>(null)

  useEffect(() => {
    async function generateData() {
      const response = await fetch(API_PREFIX + "/turno/futuros?fecha=" + encodeURIComponent(fecha) + "&area=" + nombreArea)
      const data : GetResponseType = await response.json()

      setGetResponse(data)
    }
    if (DATE_FORMAT.test(fecha) && nombreArea != "") generateData()
  }, [fecha, nombreArea])

  return getResponse
}
