import { Navbar } from "./components/navigation/Navbar"
import { TurnoListado } from "./components/turnos/TurnoListado"
import { TurnoCreacion } from "./components/turnos/TurnoCreacion"

function App() {
  return (
    <>
      <Navbar></Navbar>
      <main>
        <TurnoListado />
        <TurnoCreacion />
      </main>
    </>
  )
}

export default App
