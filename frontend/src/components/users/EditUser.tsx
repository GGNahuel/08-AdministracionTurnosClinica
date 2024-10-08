import { ChangeEvent, useContext, useState } from "react";
import { SessionContext, SessionContextInterface } from "../../context/SessionContext";
import { UserRegistration } from "../../types/Entities";

export function EditUser() {
  const {loggedUser} = useContext(SessionContext) as SessionContextInterface
  const [editedUser, setEditedUser] = useState<UserRegistration | null>(loggedUser ? {
    username: loggedUser.username,
    password: "",
    password2: "",
    email: loggedUser.email,
    isProffesional: loggedUser.role == "PROFFESIONAL",
    proffesionalDni: loggedUser.proffesionalDni,
    role: loggedUser.role
  } : null)

  const handleOnchangeInputs = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof UserRegistration
    const value = e.target.value

    setEditedUser(prev => ({
      ...prev,
      [name]: value
    } as UserRegistration))
  }

  return loggedUser && editedUser ? (
    <form>
      <label><input type="text" name="username" value={editedUser.username} onChange={e => handleOnchangeInputs(e)}/></label>
      <label><input type="email" name="email" value={editedUser.email} onChange={e => handleOnchangeInputs(e)} /></label>
      <label>Soy profesional de salud
        <input type="checkbox" name="isProffesional" checked={editedUser.isProffesional} onChange={e => handleOnchangeInputs(e)}></input>
      </label>
      {editedUser.isProffesional && (
        <label><input type="text" name="proffesionalDni" value={editedUser.proffesionalDni} onChange={e => handleOnchangeInputs(e)}/></label>
      )}
      <button type="submit">Aplicar cambios</button>
    </form>
  ) : <></>
}