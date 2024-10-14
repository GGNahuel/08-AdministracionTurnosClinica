import { Link } from "react-router-dom"
import { navListItems } from "../../constants/NavigationComponents"
import { NavbarDetails, NavItem } from "../../types/NavbarSections"

import { useContext } from "react"
import { routes } from "../../constants/NavigationRoutes"
import { SessionContext, SessionContextInterface } from "../../context/SessionContext"
import { useLogOut } from "../../requests/UserRequests"
import { Roles } from "../../types/BackendEnums"
import { UserBackend } from "../../types/Entities"
import { ConfigIcon, LanguageIcon, LogInIcon, LogOutIcon, UserIcon } from "../utilities/Icons"
import { ProtectedLink } from "../utilities/ProtectedLink"
import { useGetWindowSize } from "../../hooks/WindowProperties"

export function Navbar() {
  const {loggedUser} = useContext(SessionContext) as SessionContextInterface
  const {logout} = useLogOut()
  const {windowSize} = useGetWindowSize()

  const LinkToMainPage = ({img, h2} : {img?: boolean, h2?: boolean}) => (
    <Link to="/">
      {img && <img src="/logoEjemplo.png" alt="Logo de la clinica" className="logo" />}
      {h2 && <h2>Nombre clinica</h2>}
    </Link>
  )

  const NavigationLinks = () => (
    <ul className="linkList">
      {Object.entries(navListItems).map(details => (
        <NavItemComponent key={details[0]} navItem={details[1]} loggedUser={loggedUser} />
      ))}
    </ul>
  )

  const ButtonList = () => (
    <ul className="buttonList">
      <li><div><button className="iconButton"><ConfigIcon /></button><p>Configuración</p></div></li>
      <li><div><button className="iconButton"><LanguageIcon /></button><p>Idioma</p></div></li>
      {loggedUser ? <>
        <li><div><Link to={routes.usuario.profile}><button className="iconButton"><UserIcon /></button></Link><p>Perfil de usuario</p></div></li>
        <li><div><button className="iconButton" onClick={() => {logout()}}><LogOutIcon /></button><p>Cerrar sesión</p></div></li></>
        : <>
        <li><div><Link to={routes.usuario.login}><button className="iconButton"><LogInIcon /></button></Link><p>Iniciar sesión</p></div></li>
        <li><div><Link to={routes.usuario.signup}><button className="iconButton"><LogInIcon /></button></Link><p>Registrarse</p></div></li></>
      }
    </ul>
  )

  return (
    <nav id="mainNavbar">
      {windowSize.width > 1024 && windowSize.height >= 680 ? 
      <><header>
        <LinkToMainPage img h2/>
        <h3 className={!loggedUser ? "emptySession" : ""}>{loggedUser?.username}</h3>
      </header>
      <section>
        <NavigationLinks />
      </section>
      <footer>
        <ButtonList />
      </footer></> 
      :
      <><LinkToMainPage img/>
      <section className="row1">
        <LinkToMainPage h2/>
        <ButtonList />
      </section>
      <NavigationLinks /></>
      }
    </nav>
  )
}

function NavItemComponent({ navItem, loggedUser } : { navItem: NavbarDetails, loggedUser: UserBackend | null}) {
  const items: NavItem[] = Object.values(navItem.items)
  const finalItems = items.filter(item => 
    (!loggedUser && !item.protected.value) || !item.protected.value || (loggedUser && item.protected.roles?.includes(loggedUser.role))
  )

  return (
    <li>
      <details name="navItem">
        <summary><h3>{navItem.summaryName}</h3></summary>
        <ul>
          {finalItems.map((item, index) => 
            <li key={index}>
              {item.protected.value ?
                item.protected.roles ?
                  <ProtectedLink path={item.route} allowedRoles={item.protected.roles as Roles[]} content={item.name} /> :
                  <p>Error de configuración de permisos</p> :
                <Link to={item.route}>{item.name}</Link>
              }
            </li>
          )}
        </ul>
      </details>
    </li>
  )
}