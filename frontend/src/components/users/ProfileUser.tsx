import { useContext } from "react";
import { SessionContext, SessionContextInterface } from "../../context/SessionContext";
import { EditUser } from "./EditUser";
import { useChangeUserPassword } from "../../requests/UserRequests";
import Message from "../utilities/Message";

export function ProfileUser() {
  const {loggedUser} = useContext(SessionContext) as SessionContextInterface
  const {response, handlePatchRequest} = useChangeUserPassword()

  return loggedUser != null ? (
    <section className="registerSection" id="userProfile">
      <header>
        <h1>Perfil de usuario</h1>
        <h2>Usted ha iniciado sesión como {loggedUser.username}</h2>
      </header>
      <EditUser/>
      <details>
        <summary>Cambiar contraseña</summary>
        <h2>Ingrese la nueva contraseña que desea ingresar</h2>
        {response?.message && <Message messageObject={response.message} />}
        <form onSubmit={e => handlePatchRequest(e, loggedUser)}>
          <label>Nueva contraseña: <input type="password" name="password" /></label>
          <label>Repetición de contraseña: <input type="password" name="password2" /></label>
          <button type="submit">Aplicar</button>
        </form>
      </details>
    </section>
  ) : <h3>Error: Debe iniciar sesión para ingresar a este sitio</h3>
}