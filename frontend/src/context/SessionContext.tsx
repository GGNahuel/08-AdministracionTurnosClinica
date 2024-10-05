import { createContext, ReactNode, useEffect, useState } from "react";
import { UserBackend } from "../types/Entities";
import { API_PREFIX } from "../constants/VariablesEntorno";
import { getCookie } from "../functions/RequestHandler";

export interface SessionContextInterface {
  loggedUser: UserBackend | null,
  setLoggedUser: React.Dispatch<React.SetStateAction<UserBackend | null>>
}

export const SessionContext = createContext<SessionContextInterface | undefined>(undefined)

export function SessionContextProvider({children} : {children: ReactNode}) {
  const [loggedUser, setLoggedUser] = useState<UserBackend | null>(null)

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
      if (data) setLoggedUser(data as UserBackend)
    })
  }, [])

  return (
    <SessionContext.Provider value={{loggedUser, setLoggedUser}}>
      {children}
    </SessionContext.Provider>
  )
}