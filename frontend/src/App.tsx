import { Outlet } from "react-router-dom"
import { Navbar } from "./components/navbar&UI/Navbar"

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
