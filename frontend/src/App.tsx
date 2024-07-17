import { Navbar } from "./components/navigation/Navbar"
import { useViewContext } from "./context/NavigationContext"

function App() {
  const { currentView } = useViewContext()

  return (
    <>
      <Navbar></Navbar>
      <main>
        {currentView}
      </main>
    </>
  )
}

export default App
