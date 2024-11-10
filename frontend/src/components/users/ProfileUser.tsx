import { ChangeEvent, useContext, useState } from "react";
import { SessionContext, SessionContextInterface } from "../../context/SessionContext";
import { EditUser } from "./EditUser";
import { useChangeUserPassword } from "../../requests/UserRequests";
import Message from "../utilities/Message";
import { checkPasswordSecurity } from "../../functions/Utilities";

export function ProfileUser() {
  const {loggedUser} = useContext(SessionContext) as SessionContextInterface
  const {response, handlePatchRequest} = useChangeUserPassword()

  const [samePassword, setSamePassword] = useState<{value: string, secondValue: string, areEquals: boolean}>({
    value: "", secondValue: "", areEquals: true})
  const handle2PasswordOnChange = (e: ChangeEvent<HTMLInputElement>, isFirstPassword: boolean) => {
    const value = e.currentTarget.value
    setSamePassword(prev => {
      if (isFirstPassword) return ({
        ...prev,
        value,
        areEquals: value === prev.secondValue
      })
      else return ({
        ...prev,
        secondValue: value,
        areEquals: value === prev.value
      })
    })
  }

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
          <label>Contraseña<input type="password" name="password" onChange={e => handle2PasswordOnChange(e, true)}/></label>
          {checkPasswordSecurity(samePassword.value) != null && <p>{checkPasswordSecurity(samePassword.value)}</p>}
          <label>Repetir contraseña<input type="password" name="password2" onChange={e => handle2PasswordOnChange(e, false)}/></label>
          {!samePassword.areEquals && <p>Las contraseñas no coinciden</p>}
          <button type="submit">Aplicar</button>
        </form>
      </details>
    </section>
  ) : <h3>Error: Debe iniciar sesión para ingresar a este sitio</h3>
}