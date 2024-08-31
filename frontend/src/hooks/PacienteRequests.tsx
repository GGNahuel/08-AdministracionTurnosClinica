import { useEffect, useState } from "react";
import { GetResponseType, ReturnResponseType } from "../types/APIResponses";
import { API_PREFIX } from "../constants/VariablesEntorno";
import { Paciente } from "../types/Entities";

export function useGetAllPacientes() {
  const [getResponse, setGetResponse] = useState<GetResponseType | null>(null)

  useEffect(() => {
    async function generateData() {
      const response = await fetch(API_PREFIX + "/paciente")
      const data : GetResponseType = await response.json()

      setGetResponse(data)
    }
    generateData()
  }, [])

  return getResponse
}

export function useGetPacienteByDni(dniPaciente : string) {
  const [getResponse, setGetResponse] = useState<GetResponseType | null>(null)

  useEffect(() => {
    async function getData() {
      const response = await fetch(API_PREFIX + "/paciente/" + dniPaciente)
      const data : GetResponseType = await response.json()

      setGetResponse(data)
    }
    getData()
  }, [dniPaciente])

  return getResponse
}

export function useGetPacientesByName(nombre: string) {
  const [getResponse, setGetResponse] = useState<GetResponseType | null>(null)

  useEffect(() => {
    async function generateData() {
      const response = await fetch(API_PREFIX + "/paciente/nombre/" + nombre)
      const data : GetResponseType = await response.json()

      setGetResponse(data)
    }
    if (nombre != null && nombre != "") generateData()
    else setGetResponse(prev => ({
      ...prev,
      results: []
    } as GetResponseType))
  }, [nombre])

  return getResponse
}

export function usePostPaciente() {
  const [returnedPost, setReturnedPost] = useState<ReturnResponseType | null>(null)

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

    const request = await fetch(API_PREFIX + "/paciente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pacienteToSend)
    })
    const returned : ReturnResponseType = await request.json()
    setReturnedPost(returned)
  }

  return {returnedPost, sendPacienteToPost}
}

export function usePutPaciente() {
  const [returnedValue, setReturnedValue] = useState<ReturnResponseType | null>(null)

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

    const request = await fetch(API_PREFIX + "/paciente", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pacienteToSend)
    })
    const returned : ReturnResponseType = await request.json()
    console.log(returned)
    setReturnedValue(returned)
  }

  return {returnedValue, sendPutRequest}
}