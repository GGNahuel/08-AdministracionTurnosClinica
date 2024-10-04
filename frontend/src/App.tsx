import { Outlet } from "react-router-dom"
import { Navbar } from "./components/navigation/Navbar"
import { useCsrfTokenSetter } from "./hooks/Security"

function App() {
  useCsrfTokenSetter()

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
