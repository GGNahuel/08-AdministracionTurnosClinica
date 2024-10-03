import { Outlet } from "react-router-dom"
import { Navbar } from "./components/navigation/Navbar"
import { useCsrfTokenSetter } from "./hooks/Security"
import { SessionContextProvider } from "./context/SessionContext"

function App() {
  useCsrfTokenSetter()

  return (
    <SessionContextProvider>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </SessionContextProvider>
  )
}

export default App
