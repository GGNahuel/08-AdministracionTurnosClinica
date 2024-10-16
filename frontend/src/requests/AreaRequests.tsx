import { FormEvent, useEffect, useState } from "react";
import { handleRequest } from "../functions/RequestHandler";
import { GetResponseType, HandledResponse, ReturnResponseType } from "../types/APIResponses";
import { SearchArea } from "../types/SearchFormTypes";
import { AreaProfesional } from "../types/Entities";

export function useGetAllAreas() {
  const [getResponse, setGetResponse] = useState<HandledResponse<GetResponseType>>()

  useEffect(() => {
    handleRequest("/area", "GET", {}).then(response => {
      setGetResponse(response as HandledResponse<GetResponseType>)
    })
  }, [])

  return getResponse
}

export function useGetAreasByName(name: string) {
  const [getResponse, setGetResponse] = useState<HandledResponse<GetResponseType> | null>(null)

  useEffect(() => {
    if (name != "") {
      handleRequest("/area/" + encodeURIComponent(name), "GET", {}).then(response => {
        setGetResponse(response as HandledResponse<GetResponseType>)
      })
    }
  }, [name])

  return getResponse
}

export function useGetAreasByActiveStatus(active: boolean) {
  const [getResponse, setGetResponse] = useState<HandledResponse<GetResponseType> | null>(null)

  useEffect(() => {
    handleRequest(`/area/actives?valor=${String(active)}`, "GET", {}).then(response => {
      setGetResponse(response as HandledResponse<GetResponseType>)
    })
  }, [active])

  return getResponse
}

export function useGetAreasByProffesionalDni(dni: string) {
  const [getResponse, setGetResponse] = useState<HandledResponse<GetResponseType> | null>(null)

  useEffect(() => {
    if (dni != "")
      handleRequest("/area/profesional?dni=" + dni, "GET", {}).then(data => setGetResponse(data as HandledResponse<GetResponseType>))
  }, [dni])

  return getResponse
}

export function usePostArea() {
  const [returnedPost, setReturnedPost] = useState<HandledResponse<ReturnResponseType> | null>(null)

  const sendAreaToPost = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const formData = new FormData(ev.currentTarget)
    
    const nombre = formData.get("nombre") as string
    const necesitaTurno = Boolean (formData.get("necesitaTurno"))

    const returned = await handleRequest(`/area?nombre=${nombre}&necesitaTurno=${necesitaTurno}`, "POST", {})

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

    const response = await handleRequest(`/area?id=${id}&nombre=${name}&necesitaTurno=${needSchedule}`, "PUT", {})
    setReturnValue(response as HandledResponse<ReturnResponseType>)
  }

  return {returnValue, sendPutRequest}
}

export function useSearchArea(urlParams: URLSearchParams) {
  const status = urlParams.get("status")
  const schedule = urlParams.get("schedule")

  const [getResponse, setGetResponse] = useState<HandledResponse<GetResponseType> | null>(null)
  const [searchParams, setSearchParams] = useState<SearchArea>({
    status: status != undefined ? status == "true" : null,
    schedule: schedule != undefined ? schedule == "true" : null
  })

  const sendSearchParams = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    const params: SearchArea = {
      status: status != undefined ? status == "true" : null,
      schedule: schedule != undefined ? schedule == "true" : null
    }
    
    setSearchParams(params)
  }
  
  useEffect(() => {
    const requestRoute = 
      "/area/search" + (searchParams.status != null || searchParams.schedule != null ? "?" : "") +
      (searchParams.status != null ? ("status=" + searchParams.status) : "") +
      (searchParams.status != null && searchParams.schedule != null ? "&" : "") +
      (searchParams.schedule != null ? ("schedule=" + searchParams.schedule) : "")

    
    handleRequest(requestRoute, "GET", {}).then(response => {
      setGetResponse(response as HandledResponse<GetResponseType>)
    })
  }, [searchParams])

  return {getResponse, sendSearchParams}
}

export function useChangeAreaActiveStatus() {
  const [getResponse, setGetResponse] = useState<HandledResponse<GetResponseType>>()
  const [valuesForRequest, setValuesForRequest] = useState<{id: string, statusValue: boolean, turnsAction: boolean}>()

  const handleChangeActiveStatus = (e: FormEvent<HTMLFormElement>, areaDto: AreaProfesional, turnsAction: boolean) => {
    e.preventDefault()

    setValuesForRequest({
      id: areaDto.id as string,
      statusValue: !areaDto.activa || true,
      turnsAction: turnsAction
    })
  }

  useEffect(() => {
    if (valuesForRequest)
      handleRequest(`/area?id=${valuesForRequest.id}&valor=${valuesForRequest.statusValue}&turnsAction=${valuesForRequest.turnsAction}`, "PATCH", {})
      .then(data => setGetResponse(data as HandledResponse<GetResponseType>))
  }, [valuesForRequest])

  return {handleChangeActiveStatus, getResponse}
}