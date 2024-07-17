import { view_Nav } from "../../constants/NavigationComponents"
import { useViewContext } from "../../context/NavigationContext"
import { NavbarItem } from "../../types/NavigationAndView"

function NavItem({ summary, viewNav_Item } : { summary: string, viewNav_Item: NavbarItem}) {
  const itemNames : string[] = Object.values(viewNav_Item).map(nameAndView => nameAndView.name)
  const itemRoutes = Object.entries(viewNav_Item)
  const {setCurrentView} = useViewContext()

  const changeCurrentViewInContext = () => {
    // setCurrentView(element)
    console.log(itemRoutes)
  }

  return (
    <li>
      <details name="navItem">
        <summary><h3>{summary}</h3></summary>
        <ul>
          {itemNames.map((name, index) =>
            <li 
              key={name} 
              onClick={() => itemRoutes[index] ? 
                changeCurrentViewInContext() : null
              }>{name}</li>
          )}
        </ul>
      </details>
    </li>
  )
}

export function Navbar() {
  return (
    <nav id="mainNavbar">
      <header>
        <img src="/logoEjemplo.png" alt="Logo de la clinica" />
        <h2>Nombre clinica</h2>
      </header>
      <section>
        <ul className="linkList">
          <NavItem summary="Turnos" viewNav_Item={view_Nav.turno}/>
          <NavItem summary="Paciente" viewNav_Item={view_Nav.paciente}/>
          <NavItem summary="Profesional médico" viewNav_Item={view_Nav.profesional}/>
          <NavItem summary="Consultorios y áreas" viewNav_Item={view_Nav.area_consultorio}/>
        </ul>
      </section>
      <footer>
        <ul className="buttonList">
          <li><button className="navButton">⚙️</button></li>
          <li><button className="navButton">🚹</button></li>
          <li><button className="navButton">🌐</button></li>
        </ul>
      </footer>
    </nav>
  )
}