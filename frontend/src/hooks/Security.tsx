import { useContext, useEffect } from "react";
import { API_PREFIX } from "../constants/Utilities";
import { SessionContext, SessionContextInterface } from "../context/SessionContext";
import { useNavigate } from "react-router-dom";
import { routes } from "../constants/NavigationRoutes";

export function useCsrfTokenSetter() {
  useEffect(() => {
    fetch(API_PREFIX + "/user/csrf-token").then(request => request.json()).then(data => {
      const tokenValue = data.token as string

      document.cookie = `XSRF-TOKEN=${tokenValue}; path=/`
    })
  }, [])
}

export function useRedirectDailyTurns() {
  const {loggedUser} = useContext(SessionContext) as SessionContextInterface
  const navigateTo = useNavigate()

  useEffect(() => {
    if (loggedUser && loggedUser.role == "PROFFESIONAL") navigateTo(routes.turno.todayOfProffesional)
  }, [loggedUser, navigateTo])
}