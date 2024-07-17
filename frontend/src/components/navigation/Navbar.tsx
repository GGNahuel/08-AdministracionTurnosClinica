import { view_NavComponent } from "../../constants/NavigationComponents"
import { useViewContext } from "../../context/NavigationContext"
import { NavbarChildRoutes, NavbarDetails, NavbarFatherRoutes } from "../../types/NavigationAndView"

function NavItem({ viewNav_Item, fatherRoute } : { viewNav_Item: NavbarDetails, fatherRoute: NavbarFatherRoutes}) {
  const itemContent : string[] = Object.values(viewNav_Item.items).map(nameAndView => nameAndView.name)
  const itemRoutes: string[] = Object.keys(viewNav_Item.items)
  const {setCurrentView} = useViewContext()

  const changeCurrentViewInContext = (route: [NavbarFatherRoutes, NavbarChildRoutes]) => {
    console.log(route)
    setCurrentView(route)
  }

  return (
    <li>
      <details name="navItem">
        <summary><h3>{viewNav_Item.summaryName}</h3></summary>
        <ul>
          {itemContent.map((name, index) =>
            <li 
              key={name} 
              onClick={() => itemRoutes[index] ? 
                changeCurrentViewInContext([fatherRoute, itemRoutes[index] as NavbarChildRoutes]) : null
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
          {Object.entries(view_NavComponent).map(details => (
            <NavItem key={details[0]} viewNav_Item={details[1]} fatherRoute={details[0] as NavbarFatherRoutes} />
          ))}
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