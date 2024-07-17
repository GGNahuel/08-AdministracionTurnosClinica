import { useEffect, useState } from "react";
import { GetResponseType } from "../types/APIResponses";
import { API_PREFIX } from "../constants/VariablesEntorno";

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
  
}