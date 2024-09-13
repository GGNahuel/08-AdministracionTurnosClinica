import { useEffect, useMemo, useState } from "react"
import { API_PREFIX, DATE_FORMAT } from "../constants/VariablesEntorno"
import { dateInputValueToDBFormat } from "../functions/DateFunctions"
import { handleRequest } from "../functions/RequestHandler"
import { GetResponseType, HandledResponse, ReturnResponseType } from "../types/APIResponses"
import { EstadoPago } from "../types/BackendEnums"
import { Paciente, ProfesionalMed, Turno } from "../types/Entities"
import { SearchTurno } from "../types/Others"

export function useGetAllTurnos() {
  const [getResponse, setGetResponse] = useState<HandledResponse<GetResponseType>>()

  useEffect(() => {
    handleRequest("/turno", "GET").then(response => {
      setGetResponse(response as HandledResponse<GetResponseType>)
    })
  }, [])

  return getResponse
}

export function useGetTurnosByDate(fecha: string) {
  const [getResponse, setGetResponse] = useState<HandledResponse<GetResponseType>>()

  useEffect(() => {
    if (DATE_FORMAT.test(fecha))
      handleRequest("/turno/?fecha=" + encodeURIComponent(fecha), "GET").then(response => {
        setGetResponse(response as HandledResponse<GetResponseType>)
      })
    else throw new Error("La fecha ingresada no tiene el formato adecuado")
  }, [fecha])

  return getResponse
}

export function usePostTurno() {
  const [returnedPost, setReturnedPost] = useState<HandledResponse<ReturnResponseType> | GetResponseType>()

  const sendData = async (ev: React.FormEvent<HTMLFormElement>, areaSelected: string, turnDate: {date: string, hour: string}) => {
    ev.preventDefault()
    const $form = ev.currentTarget
    const formData = new FormData($form)

    const dniProfesional = formData.get("profesional") as string
    let dataProfesional: GetResponseType | null = null
    if (dniProfesional && dniProfesional != "") {
      const responseProfesional = await fetch(API_PREFIX + "/profesional/" + formData.get("profesional") as string)
      dataProfesional = await responseProfesional.json()
      
      if (dataProfesional && dataProfesional.message) {
        setReturnedPost(dataProfesional)
        return
      }
    }
    
    const dniPaciente = formData.get("paciente") as string
    let dataPaciente: GetResponseType | null = null
    if (dniPaciente && dniPaciente != "") {
      const responsePaciente = await fetch(API_PREFIX + "/paciente/" + formData.get("paciente") as string)
      dataPaciente = await responsePaciente.json()
      
      if (dataPaciente && dataPaciente.message) {
        setReturnedPost(dataPaciente)
        return
      }
    }

    const dataToSend : Turno = {
      profesionalDto: dataProfesional?.results[0] as ProfesionalMed || null,
      pacienteDto: dataPaciente?.results[0] as Paciente || null,
      fecha: turnDate.date,
      horario: turnDate.hour,
      areaProfesional: areaSelected,
      consultorio: (dataProfesional?.results[0] as ProfesionalMed).consultorio,
      obraSocial: (dataPaciente?.results[0] as Paciente).obraSocial,
      estadoPago: formData.get("estadoPago") as string,
      comentario: formData.get("comentario") as string
    }

    const returned = await handleRequest("/turno", "POST", dataToSend)
    setReturnedPost(returned)
  }

  return {returnedPost, sendData}
}

export function usePutTurno() {
  const [returnedPost, setReturnedPost] = useState<HandledResponse<ReturnResponseType> | GetResponseType>()

  const sendPutRequest = async (ev: React.FormEvent<HTMLFormElement>, areaSelected: string, turnDate: {date: string, hour: string}) => {
    ev.preventDefault()
    const $form = ev.currentTarget
    const formData = new FormData($form)

    const dniProfesional = formData.get("profesional") as string
    let dataProfesional: GetResponseType | null = null
    if (dniProfesional && dniProfesional != "") {
      const responseProfesional = await fetch(API_PREFIX + "/profesional/" + formData.get("profesional") as string)
      dataProfesional = await responseProfesional.json()
      
      if (dataProfesional && dataProfesional.message) {
        setReturnedPost(dataProfesional)
        return
      }
    }
    
    const dniPaciente = formData.get("paciente") as string
    let dataPaciente: GetResponseType | null = null
    if (dniPaciente && dniPaciente != "") {
      const responsePaciente = await fetch(API_PREFIX + "/paciente/" + formData.get("paciente") as string)
      dataPaciente = await responsePaciente.json()
      
      if (dataPaciente && dataPaciente.message) {
        setReturnedPost(dataPaciente)
        return
      }
    }

    const dataToSend : Turno = {
      id: formData.get("id") as string,
      profesionalDto: dataProfesional?.results[0] as ProfesionalMed || null,
      pacienteDto: dataPaciente?.results[0] as Paciente || null,
      fecha: turnDate.date,
      horario: turnDate.hour,
      areaProfesional: areaSelected,
      consultorio: (dataProfesional?.results[0] as ProfesionalMed).consultorio,
      obraSocial: (dataPaciente?.results[0] as Paciente).obraSocial,
      estadoPago: formData.get("estadoPago") as string,
      comentario: formData.get("comentario") as string
    }

    const returned = await handleRequest("/turno", "PUT", dataToSend)

    setReturnedPost(returned as HandledResponse<ReturnResponseType>)
  }

  return {returnedPost, sendPutRequest}
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
  const [getResponse, setGetResponse] = useState<HandledResponse<GetResponseType> | null>(null)

  useEffect(() => {
    if (DATE_FORMAT.test(fecha) && nombreArea != "") 
      handleRequest(`/turno/futuros?fecha=${encodeURIComponent(fecha)}&area=${nombreArea}`, "GET").then(response => {
        setGetResponse(response as HandledResponse<GetResponseType>)
      })
  }, [fecha, nombreArea])

  return getResponse
}

export function useGetSearchedTurnos() {
  const [searchParams, setSearchParams] = useState<SearchTurno>({searchName: "", areaName: "", date: "", estadoPago: ""})
  const [getResponse, setGetResponse] = useState<HandledResponse<GetResponseType> | null>(null)
  const defaultSearchObject: SearchTurno = useMemo(() => ({searchName: "", areaName: "", date: "", estadoPago: ""}), [])

  const buildObject = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const formData = new FormData(ev.currentTarget)

    if (!EstadoPago.includes((formData.get("estadoPago") as string) as typeof EstadoPago[number])) {
      throw new Error("El estado de pago que se quiere buscar no está dentro de los valores aceptados")
    }

    const date = formData.get("date") != "" ? dateInputValueToDBFormat(formData.get("date") as string) : ""
    const formSearchParams: SearchTurno = {
      searchName: formData.get("searchName") as string | "",
      areaName: formData.get("areaName") as string | "",
      estadoPago: (formData.get("estadoPago") as string) as typeof EstadoPago[number],
      date: date
    }

    setSearchParams(formSearchParams != defaultSearchObject ? formSearchParams : defaultSearchObject)
  }

  useEffect(() => {
    if (searchParams != defaultSearchObject) 
      handleRequest("/turno/search", "GET", searchParams).then(response => {
        setGetResponse(response as HandledResponse<GetResponseType>)
      })
    else setGetResponse(null)
  }, [searchParams, defaultSearchObject])

  return {buildObject, getResponse}
}
