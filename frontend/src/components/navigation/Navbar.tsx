import { Link } from "react-router-dom"
import { navListItems } from "../../constants/NavigationComponents"
import { NavbarDetails, protectedProps, RouteValues } from "../../types/NavbarSections"

import { ConfigIcon, LanguageIcon, LogInIcon, LogOutIcon } from "../utilities/Icons"
import { routes } from "../../constants/NavigationRoutes"
import { useContext } from "react"
import { SessionContext, SessionContextInterface } from "../../context/SessionContext"
import { useLogOut } from "../../requests/UserRequests"
import { ProtectedLink } from "../utilities/ProtectedLink"
import { Roles } from "../../types/BackendEnums"
import { UserBackend } from "../../types/Entities"

function NavItem({ navItem, loggedUser } : { navItem: NavbarDetails, loggedUser: UserBackend | null}) {
  const itemsNames : string[] = Object.values(navItem.items).map(linkObj => linkObj.name)
  const itemsRoutes: RouteValues[] = Object.values(navItem.items).map(linkObj => linkObj.route)
  const itemsProtectValues: protectedProps[] = Object.values(navItem.items).map(linkObj => linkObj.protected)

  const finalItems = itemsNames.filter((_, index) => 
    (!loggedUser && !itemsProtectValues[index].value) || !itemsProtectValues[index].value || (loggedUser && itemsProtectValues[index].roles?.includes(loggedUser.role))
  )

  return (
    <li>
      <details name="navItem">
        <summary><h3>{navItem.summaryName}</h3></summary>
        <ul>
          {itemsNames.map((name, index) => 
            <li key={index}>
              {itemsProtectValues[index].value ?
                itemsProtectValues[index].roles ?
                  <ProtectedLink path={itemsRoutes[index]} allowedRoles={itemsProtectValues[index].roles as Roles[]} content={name} /> :
                  <p>Error de configuración de permisos</p> :
                <Link to={itemsRoutes[index]}>{name}</Link>
              }
            </li>
          )}
        </ul>
      </details>
    </li>
  )
}

export function Navbar() {
  const {loggedUser} = useContext(SessionContext) as SessionContextInterface
  const {logout} = useLogOut()

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
            <NavItem key={details[0]} navItem={details[1]} loggedUser={loggedUser} />
          ))}
        </ul>
      </section>
      <footer>
        <ul className="buttonList">
          <li><div><button className="iconButton"><ConfigIcon /></button><p>Configuración</p></div></li>
          <li><div><button className="iconButton"><LanguageIcon /></button><p>Idioma</p></div></li>
          {loggedUser ?
            <li><div><button className="iconButton" onClick={() => {logout()}}><LogOutIcon /></button><p>Cerrar sesión</p></div></li>
            : <>
            <li><div><Link to={routes.usuario.login}><button className="iconButton"><LogInIcon /></button></Link><p>Iniciar sesión</p></div></li>
            <li><div><Link to={routes.usuario.signup}><button className="iconButton"><LogInIcon /></button></Link><p>Registrarse</p></div></li></>
          }
        </ul>
      </footer>
    </nav>
  )
}