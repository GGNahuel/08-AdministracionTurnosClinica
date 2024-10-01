import { json } from "react-router-dom";
import { API_PREFIX } from "../constants/VariablesEntorno";
import { HandledResponse, ResponseType } from "../types/APIResponses";

type ReqBodyHeaders = Record<string, string> | {
  "Content-Type": "application/x-www-form-urlencoded" | "application/json"
}

export async function handleRequest(
  path: string, method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE", {headers, body, alternativeBody} : {
    headers?: ReqBodyHeaders,
    body?: unknown, alternativeBody?: BodyInit
  }
) {
  const requestBody: RequestInit = {
    method: method,
    headers: {
      ...headers
    },
    body: alternativeBody ? alternativeBody : body ? JSON.stringify(body) : undefined,
    credentials: "include"
  }

  if (method != "GET" && !headers?.["Content-Type"])
    requestBody.headers = {...requestBody.headers, "Content-Type": "application/json"}
  if (getCookie("XSRF-TOKEN") != "") {
    requestBody.headers = {
      ...requestBody.headers,
      "X-XSRF-TOKEN" : getCookie("XSRF-TOKEN")
    }
  }

  const request = await fetch(API_PREFIX + path, requestBody)
  const status = request.status
  const response: ResponseType = await request.json()
  
  if (response.message != null && response.message.messageType == "warn") {
    // en lugar del console error iria algo para registrar ese error en algún lugar
    console.warn(response.message.text)
    
    throw json({
      text: "Ocurrió un error inesperado en el servidor, vuelva a intentarlo más tarde"
    }, {status: 500})
  }
  
  console.log([request, {...response, status}, requestBody])
  return {...response, status} as HandledResponse<ResponseType>
}

export function getCookie(name: string) : string {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  // const check = parts.pop()?.split(';').shift()
  return parts.length === 2 ? parts[1] : ""
}
