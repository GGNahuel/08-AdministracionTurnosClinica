import { createContext, ReactNode, useContext, useState } from "react";
import { NavbarChildRoutes, NavbarFatherRoutes } from "../types/NavigationAndView";

type ViewContexType = {
  currentView: [NavbarFatherRoutes, NavbarChildRoutes],
  setCurrentView: React.Dispatch<React.SetStateAction<[NavbarFatherRoutes, NavbarChildRoutes]>>
}

export const ViewContext = createContext<ViewContexType | undefined>(undefined)

export function ViewContextProvider({children} : {children: ReactNode}) : JSX.Element {
  const [currentView, setCurrentView] = useState<[NavbarFatherRoutes, NavbarChildRoutes]>(["turno", "today"])

  return (
    <ViewContext.Provider value={{currentView, setCurrentView}}>
      {children}
    </ViewContext.Provider>
  )
}

export const useViewContext = (): ViewContexType => {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error('useViewContext must be used within a ViewContextProvider');
  }
  return context;
}