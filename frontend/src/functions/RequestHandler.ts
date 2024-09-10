import { json } from "react-router-dom";
import { API_PREFIX } from "../constants/VariablesEntorno";
import { HandledResponse, ResponseType } from "../types/APIResponses";

export async function handleRequest(
  path: string, method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  body?: BodyInit
) {
  const requestBody: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: body && JSON.stringify(body)
  }

  const request = await fetch(API_PREFIX + path, body == undefined && method == "GET" ? undefined : requestBody)
  const status = request.status
  const response: ResponseType = await request.json()
  console.log(response)

  if (response.message != null && response.message.messageType == "warn") {
    // en lugar del console error iria algo para registrar ese error en algún lugar
    console.error(response.message.text)

    throw json({
      text: "Ocurrió un error inesperado en el servidor, vuelva a intentarlo más tarde"
    }, {status: 500})
  }

  return {...response, status} as HandledResponse<ResponseType>
}
