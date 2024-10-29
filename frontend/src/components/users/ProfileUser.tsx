import { useContext } from "react";
import { SessionContext, SessionContextInterface } from "../../context/SessionContext";
import { EditUser } from "./EditUser";

export function ProfileUser() {
  const {loggedUser} = useContext(SessionContext) as SessionContextInterface

  return loggedUser != null ? (
    <section className="registerSection" id="user_profile">
      <header>
        <h1>Perfil de usuario</h1>
        <h2>Usted ha iniciado sesión como {loggedUser.username}</h2>
      </header>
      <EditUser/>
    </section>
  ) : <h3>Error: Debe iniciar sesión para ingresar a este sitio</h3>
}