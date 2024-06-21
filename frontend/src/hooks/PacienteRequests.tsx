import { useEffect, useState } from "react";
import { GetResponseType, MessageInterface, ReturnResponseType } from "../types/APIResponses";
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

export function usePostPaciente() {
  const [returnedPost, setReturnedPost] = useState<ReturnResponseType>({
    message: {} as MessageInterface, returnValue: {}
  })

  const sendPacienteToPost = async (ev: React.FormEvent<HTMLFormElement>) => {
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
    const returned : ReturnResponseType = await request.json()
    setReturnedPost({
      message: {
        text: returned.message.text,
        messageType: returned.message.messageType,
        exceptionCause: returned.message.exceptionCause
      },
      returnValue: returned.returnValue
    })
  }

  return {returnedPost, sendPacienteToPost}
}