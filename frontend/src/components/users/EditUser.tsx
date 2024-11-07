import { ChangeEvent, useContext, useState } from "react";
import { SessionContext, SessionContextInterface } from "../../context/SessionContext";
import { UserEdition } from "../../types/Entities";
import Message from "../utilities/Message";
import { useEditUser } from "../../requests/UserRequests";

export function EditUser() {
  const {loggedUser} = useContext(SessionContext) as SessionContextInterface
  const [editedUser, setEditedUser] = useState<UserEdition | null>(loggedUser ? {
    id: loggedUser.id,
    username: loggedUser.username,
    email: loggedUser.email,
    isProffesional: loggedUser.role == "PROFFESIONAL",
    proffesionalDni: loggedUser.proffesionalDni || "",
    role: loggedUser.role
  } : null)
  const {response, handlePutRequest} = useEditUser()

  const handleOnchangeInputs = (e: ChangeEvent<HTMLInputElement>, isCheckbox?: boolean) => {
    const name = e.target.name as keyof UserEdition
    const value = !isCheckbox ? e.target.value : e.target.checked

    setEditedUser(prev => ({
      ...prev,
      [name]: value
    } as UserEdition))
  }

  return loggedUser && editedUser ? (
    <section>
      <h2>Editar perfil</h2>
      {response && <Message messageObject={response?.message}/>}
      <form onSubmit={e => handlePutRequest(e, editedUser)}>
        <label>Nombre de usuario<input type="text" name="username" value={editedUser.username} onChange={e => handleOnchangeInputs(e)}/></label>
        <label>E-mail<input type="email" name="email" value={editedUser.email} onChange={e => handleOnchangeInputs(e)} /></label>
        {/*         <label>Soy profesional de salud
          <input type="checkbox" name="isProffesional" checked={editedUser.isProffesional} onChange={e => handleOnchangeInputs(e, true)}></input>
        </label>
        {editedUser.isProffesional && (
          <label>Dni<input type="text" name="proffesionalDni" value={editedUser.proffesionalDni} onChange={e => handleOnchangeInputs(e)}/></label>
        )} */}
        <button type="submit">Aplicar cambios</button>
      </form>
    </section>
  ) : <h2>Error: Inicie sesión para editar perfil</h2>
}