import { Outlet } from "react-router-dom"
import { Navbar } from "./components/navigation/Navbar"

function App() {
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
