import { useEffect, useState } from "react";
import { GetResponseType, MessageInterface } from "../types/APIResponses";
import { AreaProfesional } from "../types/Entities";
import { API_PREFIX } from "../constants/VariablesEntorno";

export function useGetAllAreas() {
  const [getResponse, setGetResponse] = useState<GetResponseType>({message: {} as MessageInterface, results: [] as AreaProfesional[]})

  useEffect(() => {
    async function getData() {
      const response = await fetch(API_PREFIX + "/area")
      const data : GetResponseType = await response.json()
      console.log(data)
      setGetResponse({
        message: data.message,
        results: data.results
      })
    }
    getData()
  }, [])

  return getResponse
}