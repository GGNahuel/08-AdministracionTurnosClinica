import { useEffect } from "react";
import { API_PREFIX } from "../constants/VariablesEntorno";

export function useCsrfTokenSetter() {
  useEffect(() => {
    fetch(API_PREFIX + "/user/csrf-token").then(request => request.json()).then(data => {
      const tokenValue = data.token as string

      document.cookie = `XSRF-TOKEN=${tokenValue}; path=/`
    })
  }, [])
}