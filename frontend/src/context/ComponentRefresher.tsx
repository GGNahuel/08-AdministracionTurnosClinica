import { createContext, useState } from "react";

export interface ComponentRefresherInterface {
  refresher: number,
  setRefresher: React.Dispatch<React.SetStateAction<number>> | null
}

export const ComponentRefresher = createContext<ComponentRefresherInterface>({refresher: 0, setRefresher: null})

export function ComponentRefresherProvider({children} : {children: React.ReactNode}) {
  const [refresher, setRefresher] = useState<number>(0)

  return (
    <ComponentRefresher.Provider value={{refresher, setRefresher}}>
      {children}
    </ComponentRefresher.Provider>
  )
}