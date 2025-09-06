import { API_PREFIX } from "../constants/Utilities"
import { UserBackend } from "../types/Entities"
import { getCookie } from "./RequestHandler"

export async function sessionSetter(setLoggedUser: React.Dispatch<React.SetStateAction<UserBackend | null>>) {
  const response = await fetch(API_PREFIX + "/user/session", {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-XSRF-TOKEN" : getCookie("XSRF-TOKEN")
    },
    credentials: "include"
  })
  
  const data = response.status != 204 ? await response.json() : null
  if (data && response.status == 200) {
    setLoggedUser(data as UserBackend)
  }
  else if(response.status == 500){
    console.error("No se ha podido obtener la sesión del usuario desde el servidor")
  }
}
