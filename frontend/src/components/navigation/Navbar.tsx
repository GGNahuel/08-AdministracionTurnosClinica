import { Link } from "react-router-dom"
import { navListItems } from "../../constants/NavigationComponents"
import { NavbarDetails } from "../../types/NavbarSections"

import { ConfigIcon, LanguageIcon, LogInIcon } from "../utilities/Icons"
import { routes } from "../../constants/NavigationRoutes"

function NavItem({ navItem } : { navItem: NavbarDetails, route: string}) {
  const itemsNames : string[] = Object.values(navItem.items).map(linkObj => linkObj.name)
  const itemsRoutes = Object.values(navItem.items).map(linkObj => linkObj.route)

  return (
    <li>
      <details name="navItem">
        <summary><h3>{navItem.summaryName}</h3></summary>
        <ul>
          {itemsNames.map((name, index) =>
            <li key={index}><Link to={itemsRoutes[index]}>{name}</Link></li>
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
        <Link to="/">
          <img src="/logoEjemplo.png" alt="Logo de la clinica" />
          <h2>Nombre clinica</h2>
        </Link>
      </header>
      <section>
        <ul className="linkList">
          {Object.entries(navListItems).map(details => (
            <NavItem key={details[0]} navItem={details[1]} route={details[0]} />
          ))}
        </ul>
      </section>
      <footer>
        <ul className="buttonList">
          <li><button className="iconButton"><ConfigIcon /></button></li>
          <li><button className="iconButton"><LanguageIcon /></button></li>
          <li><button className="iconButton"><LogInIcon /></button></li>
          <li><Link to={routes.usuario.signup}><button className="iconButton"><LogInIcon />Registro</button></Link></li>
        </ul>
      </footer>
    </nav>
  )
}