import { useEffect, useMemo, useState } from "react"
import { Paciente, ProfesionalMed, Turno } from "../types/Entities"
import { API_PREFIX, DATE_FORMAT } from "../constants/VariablesEntorno"
import { GetResponseType, MessageInterface, ReturnResponseType } from "../types/APIResponses"
import { SearchTurno } from "../types/Others"
import { EstadoPago } from "../types/BackendEnums"
import { dateInputValueToDBFormat } from "../functions/DateFunctions"

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

export function useGetSearchedTurnos() {
  const [searchParams, setSearchParams] = useState<SearchTurno>({searchName: "", areaName: "", date: "", estadoPago: ""})
  const [getResponse, setGetResponse] = useState<GetResponseType | null>(null)
  const defaultSearchObject: SearchTurno = useMemo(() => ({searchName: "", areaName: "", date: "", estadoPago: ""}), [])

  const buildObject = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const $form = ev.currentTarget
    const formData = new FormData($form)

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
    async function getData() {
      const controllerParams = {search: "search", area: "area", date: "date", state: "state"}

      const response = await fetch(`${API_PREFIX}/turno/search?`+ 
        `${controllerParams.search}=${searchParams.searchName}` + 
        `&${controllerParams.area}=${searchParams.areaName}` +
        `&${controllerParams.date}=${encodeURIComponent(searchParams.date)}` +
        `&${controllerParams.state}=${searchParams.estadoPago}`)
      const data: GetResponseType = await response.json()

      setGetResponse(data)
      console.log(data)
    }
    if (searchParams != defaultSearchObject) getData()
    else setGetResponse(null)
  }, [searchParams, defaultSearchObject])

  return {buildObject, getResponse}
}
