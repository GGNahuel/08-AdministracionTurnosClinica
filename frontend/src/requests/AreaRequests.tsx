import { useEffect, useState } from "react";
import { handleRequest } from "../functions/RequestHandler";
import { GetResponseType, HandledResponse, ReturnResponseType } from "../types/APIResponses";
import { AreaProfesional } from "../types/Entities";

export function useGetAllAreas() {
  const [getResponse, setGetResponse] = useState<HandledResponse<GetResponseType>>()

  useEffect(() => {
    handleRequest("/area", "GET").then(response => {
      setGetResponse(response as HandledResponse<GetResponseType>)
    })
  }, [])

  return getResponse
}

export function useGetAreasByName(name: string, areaSelectedSetter?: React.Dispatch<React.SetStateAction<{
  name: string;
  needSchedule: boolean;
}>>) {
  const [getResponse, setGetResponse] = useState<HandledResponse<GetResponseType> | null>(null)

  useEffect(() => {
    if (name != "") {
      handleRequest("/area/" + encodeURIComponent(name), "GET").then(response => {
        setGetResponse(response as HandledResponse<GetResponseType>)
        
        if (areaSelectedSetter && !response.message) {
          const returnedArea = (response as GetResponseType).results[0] as AreaProfesional
          areaSelectedSetter({name: returnedArea.nombre, needSchedule: returnedArea.necesitaTurno})
        }
      })
    }
  }, [name, areaSelectedSetter])

  return getResponse
}

export function useGetAreasByActiveStatus(active: boolean) {
  const [getResponse, setGetResponse] = useState<HandledResponse<GetResponseType> | null>(null)

  useEffect(() => {
    handleRequest(`/area/actives?valor=${String(active)}`, "GET").then(response => {
      setGetResponse(response as HandledResponse<GetResponseType>)
    })
  }, [active])

  return getResponse
}

export function usePostArea() {
  const [returnedPost, setReturnedPost] = useState<HandledResponse<ReturnResponseType> | null>(null)

  const sendAreaToPost = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const formData = new FormData(ev.currentTarget)
    
    const nombre = formData.get("nombre") as string
    const necesitaTurno = Boolean (formData.get("necesitaTurno"))

    const returned = await handleRequest(`/area?nombre=${nombre}&necesitaTurno=${necesitaTurno}`, "POST")

    setReturnedPost(returned as HandledResponse<ReturnResponseType>)
  }

  return {returnedPost, sendAreaToPost}
}

export function usePutArea() {
  const [returnValue, setReturnValue] = useState<HandledResponse<ReturnResponseType> | null>(null)

  const sendPutRequest = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const formData = new FormData(ev.currentTarget)

    const id = formData.get("id") as string
    const name = formData.get("nombre") as string
    const needSchedule = Boolean (formData.get("necesitaTurno") as string)

    const response = await handleRequest(`/area?id=${id}&nombre=${name}&necesitaTurno=${needSchedule}`, "GET")
    setReturnValue(response as HandledResponse<ReturnResponseType>)
  }

  return {returnValue, sendPutRequest}
}