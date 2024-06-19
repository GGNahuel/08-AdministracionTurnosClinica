import { useEffect, useState } from "react";
import { GetResponseType } from "../types/APIResponses";
import { API_PREFIX } from "../constants/VariablesEntorno";

export function useGetAllPacienteRequest() {
  const [getResponse, setGetResponse] = useState<GetResponseType>()

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