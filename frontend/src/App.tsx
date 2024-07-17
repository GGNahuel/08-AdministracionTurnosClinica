import { Navbar } from "./components/navigation/Navbar"
import { TurnoCreacion } from "./components/turnos/TurnoCreacion"

function App() {
  // const { currentView } = useViewContext()
  // const element = view_NavComponent[currentView[0] as NavbarFatherRoutes].items[currentView[1] as NavbarChildRoutes].viewElement

  return (
    <>
      <Navbar></Navbar>
      <main>
        {/* {element && element()} */}
        <TurnoCreacion />
      </main>
    </>
  )
}

export default App
