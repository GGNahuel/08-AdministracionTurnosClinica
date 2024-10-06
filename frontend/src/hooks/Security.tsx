import { useContext, useEffect } from "react";
import { API_PREFIX } from "../constants/VariablesEntorno";
import { getCookie } from "../functions/RequestHandler";
import { UserBackend } from "../types/Entities";
import { SessionContext, SessionContextInterface } from "../context/SessionContext";

export function useCsrfTokenSetter() {
  useEffect(() => {
    fetch(API_PREFIX + "/user/csrf-token").then(request => request.json()).then(data => {
      const tokenValue = data.token as string

      document.cookie = `XSRF-TOKEN=${tokenValue}; path=/`
    })
  }, [])
}

export function useSessionSetter() {
  const {setLoggedUser} = useContext(SessionContext) as SessionContextInterface

  const checkLoggedUser = async () => {
    const response = await fetch(API_PREFIX + "/user/session", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-XSRF-TOKEN" : getCookie("XSRF-TOKEN")
      },
      credentials: "include"
    })
    console.log(response)
    
    const data = response.status != 204 ? await response.json() : null
    if (data && response.status == 200) {
      console.log(data)
      setLoggedUser(data as UserBackend)
    }
    else if(response.status == 500){
      console.log(data)
      console.error("No se ha podido obtener la sesión del usuario desde el servidor")
    }
    
  }

  return {checkLoggedUser}
}
