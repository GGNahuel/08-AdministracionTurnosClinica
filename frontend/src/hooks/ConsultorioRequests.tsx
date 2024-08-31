import { useEffect, useState } from "react"
import { GetResponseType, ReturnResponseType } from "../types/APIResponses"
import { API_PREFIX } from "../constants/VariablesEntorno"

export function useGetAllConsultorios() {
  const [getResponse, setGetResponse] = useState<GetResponseType>()

  useEffect(() => {
    async function getData() {
      const response = await fetch(API_PREFIX + "/consultorio")
      const data : GetResponseType = await response.json()

      setGetResponse(data)
    }
    getData()
  }, [])

  return getResponse
}

export function usePostConsultorio() {
  const [returnedPost, setReturnedPost] = useState<ReturnResponseType | null>(null)

  const sendConsultorioToPost = async (ev : React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const $form = ev.currentTarget
    const formData = new FormData($form)
    const consultorio = formData.get("numeroConsultorio") as string
    
    const response = await fetch(API_PREFIX + `/consultorio?number=${consultorio}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const returned: ReturnResponseType = await response.json()
    setReturnedPost(returned)
  }

  return {returnedPost, sendConsultorioToPost}
}

export function usePutConsultorio() {
  const [returnValue, setReturnValue] = useState<ReturnResponseType | null>(null)

  const sendPutRequest = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const $form = new FormData(ev.currentTarget)
    const id = $form.get("id") as string
    const number = Number ($form.get("numeroConsultorio"))

    const response = await fetch(API_PREFIX + `/consultorio?id=${id}&number=${number}`, {
      method: "PUT"
    })
    const returned: ReturnResponseType = await response.json();

    setReturnValue(returned)
  }

  return {returnValue, sendPutRequest}
}