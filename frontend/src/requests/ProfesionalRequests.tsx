import { useEffect, useState } from "react";
import { Horario } from "../classes/Horario";
import { handleRequest } from "../functions/RequestHandler";
import { GetResponseType, HandledResponse, ReturnResponseType } from "../types/APIResponses";
import { ProfesionalMed } from "../types/Entities";
import { generateSearchRoute } from "../functions/Utilities";
import { SearchProffesional } from "../types/SearchFormTypes";

export function useGetAllProfesionales() {
  const [getResponse, setGetResponse] = useState<HandledResponse<GetResponseType> | null>(null)

  useEffect(() => {
    handleRequest("/profesional", "GET").then(response => {
      setGetResponse(response as HandledResponse<GetResponseType>)
    })
  }, [])

  return getResponse
}

export function useGetProfesionalsByArea(nombreArea:string) {
  const [getResponse, setGetResponse] = useState<HandledResponse<GetResponseType> | null>(null)

  useEffect(() => {
    if (nombreArea != "")
      handleRequest("/profesional/area/" + nombreArea, "GET").then(response => {
        setGetResponse(response as HandledResponse<GetResponseType>)
      })
  }, [nombreArea])

  return getResponse
}

export function useGetProfesionalByDni(dni:string) {
  const [getResponse, setGetResponse] = useState<HandledResponse<GetResponseType> | null>(null)

  useEffect(() => {
    if (dni != "")
      handleRequest("/profesional/" + dni, "GET").then(response => {
        setGetResponse(response as HandledResponse<GetResponseType>)
      })
  }, [dni])

  return getResponse
}

export function usePostProfesional() {
  const [returnedPost, setReturnedPost] = useState<HandledResponse<ReturnResponseType> | null>(null)

  const sendProfesionalToPost = async (ev: React.FormEvent<HTMLFormElement>, areas: string[]) => {
    ev.preventDefault()
    const $form = ev.currentTarget
    const formData = new FormData($form)

    const profesionalToSend: ProfesionalMed = {
      nombreCompleto: formData.get("nombreCompleto") as string,
      dni: formData.get("dni") as string,
      numeroContacto: Number(formData.get("numeroContacto") as string),
      areas: areas,
      numMatricula: Number(formData.get("matricula")), 
      consultorio: Number(formData.get("consultorio") as string),
      horarios: Horario.getStringsFromScheduleBlock(formData.get("horarios") as string)
    }

    const returned = await handleRequest("/profesional", "POST", profesionalToSend)

    setReturnedPost(returned as HandledResponse<ReturnResponseType>)
  }

  return {returnedPost, sendProfesionalToPost}
}

export function usePutProfesional() {
  const [returnValue, setReturnValue] = useState<HandledResponse<ReturnResponseType> | null>(null)

  const sendPutRequest = async (ev: React.FormEvent<HTMLFormElement>, areas: string[]) => {
    ev.preventDefault()
    const $form = ev.currentTarget
    const formData = new FormData($form)

    const profesionalToSend: ProfesionalMed = {
      id: formData.get("id") as string,
      nombreCompleto: formData.get("nombreCompleto") as string,
      dni: formData.get("dni") as string,
      numeroContacto: Number(formData.get("numeroContacto") as string),
      areas: areas,
      numMatricula: Number(formData.get("matricula")), 
      consultorio: Number(formData.get("consultorio") as string),
      horarios: Horario.getStringsFromScheduleBlock(formData.get("horarios") as string)
    }

    const returned = await handleRequest("/profesional", "PUT", profesionalToSend)
    setReturnValue(returned as HandledResponse<ReturnResponseType>)
  }

  return {returnValue, sendPutRequest}
}

export function useSearchProffesionals(urlParams: URLSearchParams) {
  const [getResponse, setGetResponse] = useState<HandledResponse<GetResponseType>>()
  const [searchParams, setSearchParams] = useState<SearchProffesional>({
    search: urlParams.get("search") || "",
    matricula: urlParams.get("matricula") || "",
    area: urlParams.get("area") || ""
  })

  const getParams = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    const newParam: SearchProffesional = {
      search: urlParams.get("search") || "",
      matricula: urlParams.get("matricula") || "",
      area: urlParams.get("area") || ""
    }
    setSearchParams(newParam)
  }

  useEffect(() => {
    const route = "/profesional/search" + generateSearchRoute(searchParams)

    handleRequest(route, "GET").then(response => {
      setGetResponse(response as HandledResponse<GetResponseType>)
    })
  }, [searchParams])

  return {getParams, getResponse}
}
