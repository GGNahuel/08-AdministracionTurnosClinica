import { useEffect, useState } from "react";
import { GetResponseType, MessageInterface, ReturnResponseType } from "../types/APIResponses";
import { AreaProfesional } from "../types/Entities";
import { API_PREFIX } from "../constants/VariablesEntorno";

export function useGetAllAreas() {
  const [getResponse, setGetResponse] = useState<GetResponseType>({message: {} as MessageInterface, results: [] as AreaProfesional[]})

  useEffect(() => {
    async function getData() {
      const response = await fetch(API_PREFIX + "/area")
      const data : GetResponseType = await response.json()

      setGetResponse({
        message: data.message,
        results: data.results
      })
    }
    getData()
  }, [])

  return getResponse
}

export function usePostArea() {
  const [returnedPost, setReturnedPost] = useState<ReturnResponseType | null>(null)

  const sendAreaToPost = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const $form = ev.currentTarget
    const formData = new FormData($form)
    
    const nombre = formData.get("nombre") as string
    const necesitaTurno = Boolean (formData.get("necesitaTurno"))

    const response = await fetch(API_PREFIX + `/area?nombre=${nombre}&necesitaTurno=${necesitaTurno}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const returned: ReturnResponseType = await response.json()

    setReturnedPost(returned)
  }

  return {returnedPost, sendAreaToPost}
}