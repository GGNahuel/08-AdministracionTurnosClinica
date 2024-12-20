import { FormEvent, useEffect, useState } from "react"
import { API_PREFIX, DATE_FORMAT } from "../constants/VariablesEntorno"
import { handleRequest } from "../functions/RequestHandler"
import { GetResponseType, HandledResponse, ReturnResponseType } from "../types/APIResponses"
import { EstadoPago } from "../types/BackendEnums"
import { Paciente, ProfesionalMed, Turno } from "../types/Entities"
import { SearchTurno } from "../types/SearchFormTypes"

export function useGetAllTurnos() {
  const [getResponse, setGetResponse] = useState<HandledResponse<GetResponseType>>()

  useEffect(() => {
    handleRequest("/turno", "GET", {}).then(response => {
      setGetResponse(response as HandledResponse<GetResponseType>)
    })
  }, [])

  return getResponse
}

export function useGetTurnosByDate(fecha: string) {
  const [getResponse, setGetResponse] = useState<HandledResponse<GetResponseType>>()

  useEffect(() => {
    if (DATE_FORMAT.test(fecha))
      handleRequest("/turno/?fecha=" + encodeURIComponent(fecha), "GET", {}).then(response => {
        setGetResponse(response as HandledResponse<GetResponseType>)
      })
    else throw new Error("La fecha ingresada no tiene el formato adecuado")
  }, [fecha])

  return getResponse
}

export function useGetTurnosByPaciente(dni: string) {
  const [getResponse, setGetResponse] = useState<HandledResponse<GetResponseType> | null>(null)

  useEffect(() => {
    if(dni && dni != "") handleRequest("/turno/paciente/" + dni, "GET", {}).then(response => {
      setGetResponse(response as HandledResponse<GetResponseType>)
    })
  }, [dni])

  return getResponse
}

export function useGetTurnosByProffesionalAndDate(dni: string, fecha: string) {
  const [getResponse, setGetResponse] = useState<HandledResponse<GetResponseType> | null>(null)

  useEffect(() => {
    if(dni && dni != "" && fecha && fecha != "") handleRequest(`/turno/profesional?dni=${dni}&fecha=${fecha}`, "GET", {}).then(response => {
      setGetResponse(response as HandledResponse<GetResponseType>)
    })
  }, [dni, fecha])

  return getResponse
}

export function useGetNextTurnosByArea(fecha: string, nombreArea: string) {
  const [getResponse, setGetResponse] = useState<HandledResponse<GetResponseType> | null>(null)

  useEffect(() => {
    if (DATE_FORMAT.test(fecha) && nombreArea != "") 
      handleRequest(`/turno/futuros?fecha=${encodeURIComponent(fecha)}&area=${nombreArea}`, "GET", {}).then(response => {
        setGetResponse(response as HandledResponse<GetResponseType>)
      })
  }, [fecha, nombreArea])

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

    const returned = await handleRequest("/turno", "POST", {body: dataToSend})
    setReturnedPost(returned)
  }

  return {returnedPost, sendData}
}

export function usePutTurno() {
  const [returnValue, setReturnValue] = useState<HandledResponse<ReturnResponseType> | GetResponseType>()

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
        setReturnValue(dataProfesional)
        return
      }
    }
    
    const dniPaciente = formData.get("paciente") as string
    let dataPaciente: GetResponseType | null = null
    if (dniPaciente && dniPaciente != "") {
      const responsePaciente = await fetch(API_PREFIX + "/paciente/" + formData.get("paciente") as string)
      dataPaciente = await responsePaciente.json()
      
      if (dataPaciente && dataPaciente.message) {
        setReturnValue(dataPaciente)
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
      comentario: formData.get("comentario") as string,
      active: formData.get("active") == "true"
    }

    const returned = await handleRequest("/turno", "PUT", {body: dataToSend})

    setReturnValue(returned as HandledResponse<ReturnResponseType>)
  }

  return {returnValue, sendPutRequest}
}

export function useChangeTurnActiveStatus() {
  const [response, setResponse] = useState<HandledResponse<GetResponseType>>()

  const handleDeactivate = (e: FormEvent<HTMLFormElement>,turn: Turno) => {
    e.preventDefault()
    handleRequest(`/turno?id=${turn.id}&valor=${!turn.active}`, "PATCH", {}).then(response => setResponse(response as HandledResponse<GetResponseType>))
  }

  return {response, handleDeactivate}
}

export function useGetSearchedTurnosByUrlParams(urlParams: URLSearchParams) {
  const [getResponse, setGetResponse] = useState<HandledResponse<GetResponseType> | null>(null)
  const [searchParams, setSearchParams] = useState<SearchTurno>({
    searchName: urlParams.get("searchName") || "",
    areaName: urlParams.get("areaName") || "",
    date: urlParams.get("date") || "",
    estadoPago: urlParams.get("estadoPago") as typeof EstadoPago[number] || ""
  })

  const buildObject = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    if (!EstadoPago.includes(searchParams.estadoPago as typeof EstadoPago[number])) {
      throw new Error("El estado de pago que se quiere buscar no está dentro de los valores aceptados")
    }

    setSearchParams(({
      searchName: urlParams.get("searchName") || "",
      areaName: urlParams.get("areaName") || "",
      date: urlParams.get("date") || "",
      estadoPago: urlParams.get("estadoPago") as typeof EstadoPago[number] || ""
    }))
  }

  useEffect(() => {
    handleRequest("/turno/search", "POST", {body: searchParams}).then(response => {
      setGetResponse(response as HandledResponse<GetResponseType>)
    })
  }, [searchParams])

  return {buildObject, getResponse}
}

export function useGetSearchedTurns(values: SearchTurno) {
  const [getResponse, setGetResponse] = useState<HandledResponse<GetResponseType> | null>(null)
  const [searchValues] = useState<SearchTurno>(values)

  useEffect(() => {
    handleRequest("/turno/search", "POST", {body: searchValues}).then(response => {
      setGetResponse(response as HandledResponse<GetResponseType>)
    })
  }, [searchValues])

  return getResponse
}
