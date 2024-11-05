import { Link } from "react-router-dom"
import { navListItems } from "../../constants/NavigationComponents"
import { NavbarDetails, NavItem } from "../../types/NavbarSections"

import { isValidElement, ReactNode, useContext, useEffect, useRef, useState } from "react"
import { routes } from "../../constants/NavigationRoutes"
import { SessionContext, SessionContextInterface } from "../../context/SessionContext"
import { useLogOut } from "../../requests/UserRequests"
import { Roles } from "../../types/BackendEnums"
import { UserBackend } from "../../types/Entities"
import { LanguageIcon, LogInIcon, LogOutIcon, UserIcon } from "../utilities/Icons"
import { ProtectedLink } from "../utilities/ProtectedLink"
import { useGetWindowSize } from "../../hooks/WindowProperties"
import React from "react"

export function Navbar() {
  const {loggedUser} = useContext(SessionContext) as SessionContextInterface
  const {logout} = useLogOut()
  const {windowSize} = useGetWindowSize()

  const LinkToMainPage = ({img, h2} : {img?: boolean, h2?: boolean}) => (
    <Link to={routes.turno.today}>
      {img && <img src="/logoEjemplo.png" alt="Logo de la clinica" className="logo" />}
      {h2 && <h2>Centro de salud</h2>}
    </Link>
  )

  const NavigationLinks = () => (
    <ul className={windowSize.width > 1024 && windowSize.height > 720 ? "linkList" : "linkList responsive"}>
      {Object.entries(navListItems).map(details => (
        <NavItemComponent key={details[0]} navItem={details[1]} loggedUser={loggedUser} windowSize={windowSize} />
      ))}
    </ul>
  )

  const ButtonList = () => (
    <ul className="buttonList">
      {/* <li><div><button className="iconButton"><ConfigIcon /></button><p>Configuración</p></div></li> */}
      <li><div><button className="iconButton"><LanguageIcon /></button><p>Idioma</p></div></li>
      {loggedUser ? <>
        <li><div><Link to={routes.usuario.profile}><button className="iconButton"><UserIcon isDark/></button></Link><p>Perfil de usuario</p></div></li>
        <li><div><button className="iconButton" onClick={() => {logout()}}><LogOutIcon /></button><p>Cerrar sesión</p></div></li></>
        : <>
        <li><div><Link to={routes.usuario.login}><button className="iconButton"><LogInIcon /></button></Link><p>Iniciar sesión</p></div></li>
        <li><div><Link to={routes.usuario.signup}><button className="iconButton"><LogInIcon /></button></Link><p>Registrarse</p></div></li></>
      }
    </ul>
  )

  return (
    <nav id="mainNavbar">
      {windowSize.width > 1024 && windowSize.height >= 720 ? 
      <><header>
        <LinkToMainPage img h2/>
        {loggedUser && <div><Link to={routes.usuario.profile}><UserIcon /><h3 className={!loggedUser ? "emptySession" : ""}>{loggedUser.username}</h3></Link></div>}
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

function NavItemComponent({ navItem, loggedUser, windowSize } : { navItem: NavbarDetails, loggedUser: UserBackend | null, windowSize: {width: number, height: number}}) {
  const items: NavItem[] = Object.values(navItem.items)
  const finalItems = items.filter(item => 
    (!loggedUser && !item.protected.value) || !item.protected.value || (loggedUser && item.protected.roles?.includes(loggedUser.role))
  )
  const isNavbarUp = windowSize.width < 1024 || windowSize.height < 680

  const NavItemContainer = ({children} : {children: ReactNode}) => {
    return isNavbarUp ? 
    <ExternalDetails>
      {children}
    </ExternalDetails> :
    <details name="navItem">
      {children}
    </details>
  }

  return (
    <li>
      <NavItemContainer>
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
      </NavItemContainer>
    </li>
  )
}

function ExternalDetails({children} : {children: ReactNode}) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const extractSummary = (children: ReactNode) => {
    let summaryContent = null;
    const filteredChildren = React.Children.map(children, (child) => {
      if (isValidElement(child) && child.type === 'summary') {
        summaryContent = child.props.children;
        return null
      }
      return child
    })

    return { summaryContent, filteredChildren };
  }

  const { summaryContent, filteredChildren } = extractSummary(children);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [])

  return (
    <div className="floatingDetails">
      <div onClick={toggleDropdown} className="summaryDiv">
        {summaryContent || 'Haz click para desplegar contenido'}
      </div>
      {isOpen && (
        <div ref={dropdownRef} className="floatingContent">
          {filteredChildren}
        </div>
      )}
    </div>
  );
}