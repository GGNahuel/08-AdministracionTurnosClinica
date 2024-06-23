import { useEffect, useState } from "react"
import { GetResponseType } from "../types/APIResponses"
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