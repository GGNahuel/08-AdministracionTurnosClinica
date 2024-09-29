import { useEffect, useState } from "react"
import { GetResponseType, HandledResponse, ReturnResponseType } from "../types/APIResponses"
import { handleRequest } from "../functions/RequestHandler"
import { Consultorio, ProfesionalMed } from "../types/Entities"

export function useGetAllConsultorios() {
  const [getResponse, setGetResponse] = useState<HandledResponse<GetResponseType>>()

  useEffect(() => {
    handleRequest("/consultorio","GET", {}).then(response => {
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
    
    handleRequest(`/consultorio?number=${number}`, "POST", {}).then(returned => {
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

    handleRequest(`/consultorio?id=${id}&number=${number}`, "PUT", {}).then(returned => {
      setReturnValue(returned as HandledResponse<ReturnResponseType>)
    })
  }

  return {returnValue, sendPutRequest}
}

export function useSearchConsulrory() {
  const [allConsultories, setAllConsultories] = useState<Consultorio[]>([])
  const [results, setResults] = useState<Consultorio[]>([])

  const filterOcuppedConsultories = (ev: React.FormEvent<HTMLFormElement>, proffesionals: ProfesionalMed[]) => {
    ev.preventDefault()
    const formData = new FormData(ev.currentTarget)
    const inputValue = formData.get("ocupped")
    const value = inputValue == "true" ? true : inputValue == "" ? null : false

    const filteredConsultories = allConsultories.filter(consultory => {
      return value ? 
        proffesionals.some(proffesional => proffesional.consultorio == consultory.numeroConsultorio) : 
        proffesionals.every(proffesional => proffesional.consultorio != consultory.numeroConsultorio)
    })
  
    setResults(value != null ?
      filteredConsultories :
      allConsultories)
  }

  useEffect(() => {
    handleRequest("/consultorio", "GET", {}).then(response => {
      const results = (response as HandledResponse<GetResponseType>).results as Consultorio[]
      setAllConsultories(results)
      setResults(results)
    })
  }, [])

  return {results, filterOcuppedConsultories}
}