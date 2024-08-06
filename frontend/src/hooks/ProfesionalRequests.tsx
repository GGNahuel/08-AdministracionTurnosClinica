import { useEffect, useState } from "react";
import { GetResponseType, ReturnResponseType } from "../types/APIResponses";
import { API_PREFIX } from "../constants/VariablesEntorno";
import { ProfesionalMed } from "../types/Entities";

export function useGetAllProfesionales() {
  const [getResponse, setGetResponse] = useState<GetResponseType | null>(null)

  useEffect(() => {
    async function getData() {
      const response = await fetch(API_PREFIX + "/profesional")
      const data : GetResponseType = await response.json()

      setGetResponse(data)
    }
    getData()
  }, [])

  return getResponse
}

export function useGetProfesionalsByArea(nombreArea:string) {
  const [getResponse, setGetResponse] = useState<GetResponseType | null>(null)

  useEffect(() => {
    async function getData() {
      const response = await fetch(API_PREFIX + "/profesional/area/" + nombreArea)
      const data : GetResponseType = await response.json()

      setGetResponse(data)
    }
    getData()
  }, [nombreArea])

  return getResponse
}

export function usePostProfesional() {
  const [returnedPost, setReturnedPost] = useState<ReturnResponseType | null>(null)

  const sendProfesionalToPost = async (ev: React.FormEvent<HTMLFormElement>, areas: string[]) => {
    ev.preventDefault()
    const $form = ev.currentTarget
    const formData = new FormData($form)

    const profesionalToSend: ProfesionalMed = {
      nombreCompleto: formData.get('nombreCompleto') as string,
      dni: formData.get('dni') as string,
      numeroContacto: Number(formData.get('numeroContacto') as string),
      areas: areas,
      numMatricula: 13, 
      consultorio: Number(formData.get('consultorio') as string)
    };

    const request = await fetch(API_PREFIX + "/profesional", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(profesionalToSend)
    })
    const returned : ReturnResponseType = await request.json()
    setReturnedPost(returned)
  }

  return {returnedPost, sendProfesionalToPost}
}
