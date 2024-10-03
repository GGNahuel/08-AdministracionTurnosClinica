import { useEffect } from "react";
import { API_PREFIX } from "../constants/VariablesEntorno";
import { getCookie } from "../functions/RequestHandler";
import { UserBackend } from "../types/Entities";

export function useCsrfTokenSetter() {
  useEffect(() => {
    fetch(API_PREFIX + "/user/csrf-token").then(request => request.json()).then(data => {
      const tokenValue = data.token as string

      document.cookie = `XSRF-TOKEN=${tokenValue}; path=/`
    })
  }, [])
}

export function useSessionSetter(sessionContextSetter: React.Dispatch<React.SetStateAction<UserBackend | null>>) {
  useEffect(() => {
    fetch(API_PREFIX + "/user/session", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-XSRF-TOKEN" : getCookie("XSRF-TOKEN")
      },
      credentials: "include"
    })
    .then(response => response.json())
    .then(data => {
      if (data) sessionContextSetter(data as UserBackend)
      else console.error("No se ha podido obtener la sesión del usuario desde el servidor")
    })
  }, [sessionContextSetter])
}
