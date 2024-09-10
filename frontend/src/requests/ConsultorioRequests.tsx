import { useEffect, useState } from "react"
import { GetResponseType, HandledResponse, ReturnResponseType } from "../types/APIResponses"
import { handleRequest } from "../functions/RequestHandler"

export function useGetAllConsultorios() {
  const [getResponse, setGetResponse] = useState<HandledResponse<GetResponseType>>()

  useEffect(() => {
    handleRequest("/consultorio","GET").then(response => {
      setGetResponse(response as HandledResponse<GetResponseType>)
    })
  }, [])

  return getResponse
}

export function usePostConsultorio() {
  const [returnedPost, setReturnedPost] = useState<HandledResponse<ReturnResponseType> | null>(null)

  const sendConsultorioToPost = (ev : React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const formData = new FormData(ev.currentTarget)
    const number = formData.get("numeroConsultorio") as string
    
    handleRequest(`/consultorio?number=${number}`, "POST").then(returned => {
      setReturnedPost(returned as HandledResponse<ReturnResponseType>)
    })
  }

  return {returnedPost, sendConsultorioToPost}
}

export function usePutConsultorio() {
  const [returnValue, setReturnValue] = useState<HandledResponse<ReturnResponseType> | null>(null)

  const sendPutRequest = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const formData = new FormData(ev.currentTarget)
    const id = formData.get("id") as string
    const number = Number (formData.get("numeroConsultorio"))

    handleRequest(`/consultorio?id=${id}&number=${number}`, "PUT").then(returned => {
      setReturnValue(returned as HandledResponse<ReturnResponseType>)
    })
  }

  return {returnValue, sendPutRequest}
}