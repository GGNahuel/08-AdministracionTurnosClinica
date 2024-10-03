import { createContext, ReactNode, useState } from "react";
import { UserBackend } from "../types/Entities";

export interface SessionContextInterface {
  loggedUser: UserBackend | null,
  setLoggedUser: React.Dispatch<React.SetStateAction<UserBackend | null>>
}

export const SessionContext = createContext<SessionContextInterface | undefined>(undefined)

export function SessionContextProvider({children} : {children: ReactNode}) {
  const [loggedUser, setLoggedUser] = useState<UserBackend | null>(null)

  return (
    <SessionContext.Provider value={{loggedUser, setLoggedUser}}>
      {children}
    </SessionContext.Provider>
  )
}