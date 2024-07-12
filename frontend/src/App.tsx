import { Navbar } from "./components/navigation/Navbar"
import { TurnoListado } from "./components/turnos/TurnoListado"

function App() {
  return (
    <>
      <Navbar></Navbar>
      <main>
        <TurnoListado />
      </main>
    </>
  )
}

export default App
