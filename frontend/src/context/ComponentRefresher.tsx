import { createContext, useState } from "react";

export interface ComponentRefresherInterface {
  refresher: 0 | 1,
  setRefresher: React.Dispatch<React.SetStateAction<0 | 1>> | null
}

export const ComponentRefresher = createContext<ComponentRefresherInterface>({refresher: 0, setRefresher: null})

export function ComponentRefresherProvider({children} : {children: React.ReactNode}) {
  const [refresher, setRefresher] = useState<0 | 1>(0)

  return (
    <ComponentRefresher.Provider value={{refresher, setRefresher}}>
      {children}
    </ComponentRefresher.Provider>
  )
}