import { Navbar } from "./components/navigation/Navbar"
import { PacienteListado } from "./components/pacientes/PacienteListado"
import { TurnoListado } from "./components/turnos/TurnoListado"

function App() {
  return (
    <>
      <Navbar></Navbar>
      <PacienteListado></PacienteListado>
      <TurnoListado />
    </>
  )
}

export default App
