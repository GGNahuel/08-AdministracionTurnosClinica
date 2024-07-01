import { useEffect, useState } from "react"
import { Paciente, ProfesionalMed, Turno } from "../types/Entities"
import { API_PREFIX, DATE_FORMAT } from "../constants/VariablesEntorno"
import { GetResponseType, MessageInterface, ReturnResponseType } from "../types/APIResponses"
import { formatDate } from "../functions/formatDate"

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
  const [returnedPost, setReturnedPost] = useState<ReturnResponseType>({
    message: {} as MessageInterface, returnValue: {} as Turno
  })

  const sendData = async (ev: React.FormEvent<HTMLFormElement>) => {
    const $form = ev.currentTarget
    const formData = new FormData($form)

    const dataToSend : Turno = {
      profesionalDto: formData.get("profesionalDto") as unknown as ProfesionalMed,
      pacienteDto: formData.get("pacienteDto") as unknown as Paciente,
      fecha: formatDate(new Date(formData.get("fecha") as string)),
      horario: formData.get("horario") as string,
      areaProfesional: formData.get("area") as string,
      consultorio: Number(formData.get("consultorio") as string),
      estadoPago: formData.get("estadoPago") as string
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
  }, [pacienteSelectedByDni])

  return {pacienteSelectedByDni, setPacienteSelected}
}