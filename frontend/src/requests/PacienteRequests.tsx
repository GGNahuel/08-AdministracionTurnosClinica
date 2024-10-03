import { useEffect, useState } from "react";
import { handleRequest } from "../functions/RequestHandler";
import { GetResponseType, HandledResponse, ReturnResponseType } from "../types/APIResponses";
import { Paciente } from "../types/Entities";
import { SearchPaciente } from "../types/SearchFormTypes";
import { generateSearchRoute } from "../functions/Utilities";

export function useGetAllPacientes() {
  const [getResponse, setGetResponse] = useState<HandledResponse<GetResponseType> | null>(null)

  useEffect(() => {
    handleRequest("/paciente", "GET", {}).then(response => {
      setGetResponse(response as HandledResponse<GetResponseType>)
    })
  }, [])

  return getResponse
}

export function useGetPacienteByDni(dniPaciente : string) {
  const [getResponse, setGetResponse] = useState<HandledResponse<GetResponseType> | null>(null)

  useEffect(() => {
    handleRequest("/paciente/" + dniPaciente, "GET", {}).then(response => {
      setGetResponse(response as HandledResponse<GetResponseType>)
    })
  }, [dniPaciente])

  return getResponse
}

export function useGetPacientesByName(nombre: string) {
  const [getResponse, setGetResponse] = useState<HandledResponse<GetResponseType> | null>(null)

  useEffect(() => {
    if (nombre != null && nombre != "") 
      handleRequest("/paciente/nombre/" + nombre, "GET", {}).then(response => {
        setGetResponse(response as HandledResponse<GetResponseType>)
      })
    else 
      setGetResponse(prev => ({
        ...prev,
        results: [],
        status: 200
      } as HandledResponse<GetResponseType>))
  }, [nombre])

  return getResponse
}

export function usePostPaciente() {
  const [returnedPost, setReturnedPost] = useState<HandledResponse<ReturnResponseType> | null>(null)

  const sendPacienteToPost = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const $form = ev.currentTarget
    const formData = new FormData($form)

    const pacienteToSend: Paciente = {
      nombreCompleto: formData.get('nombreCompleto') as string,
      dni: formData.get('dni') as string,
      numeroContacto: Number(formData.get('numeroContacto') as string),
      obraSocial: formData.get('obraSocial') as string
    };

    const returned = await handleRequest("/paciente", "POST", {body: pacienteToSend})
    setReturnedPost(returned as HandledResponse<ReturnResponseType>)
  }

  return {returnedPost, sendPacienteToPost}
}

export function usePutPaciente() {
  const [returnValue, setReturnValue] = useState<HandledResponse<ReturnResponseType> | null>(null)

  const sendPutRequest = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const $form = ev.currentTarget
    const formData = new FormData($form)

    const pacienteToSend: Paciente = {
      id: formData.get("id") as string,
      nombreCompleto: formData.get('nombreCompleto') as string,
      dni: formData.get('dni') as string,
      numeroContacto: Number(formData.get('numeroContacto') as string),
      obraSocial: formData.get('obraSocial') as string
    };

    const returned = await handleRequest("/paciente", "PUT", {body: pacienteToSend})
    setReturnValue(returned as HandledResponse<ReturnResponseType>)
  }

  return {returnValue, sendPutRequest}
}

export function useSearchPatients(urlParams: URLSearchParams) {
  const [getResponse, setGetResponse] = useState<HandledResponse<GetResponseType>>()
  const [searchParams, setSearchParams] = useState<SearchPaciente>({
    search: urlParams.get("search") || "", 
    obraSocial: urlParams.get("obraSocial") || ""
  })

  const getSearchParams = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    const newParams = {
      search: urlParams.get("search") || "", 
    obraSocial: urlParams.get("obraSocial") || ""
    }

    setSearchParams(newParams)
  }

  useEffect(() => {
    const route = "/paciente/search" + generateSearchRoute(searchParams)
    
    handleRequest(route,"GET", {}).then(response => setGetResponse(response as HandledResponse<GetResponseType>))
  }, [searchParams])

  return {getResponse, getSearchParams}
}