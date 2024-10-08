import { ChangeEvent, useState } from "react"
import { useGetAllProfesionales } from "../../requests/ProfesionalRequests"
import { useLogIn, useRegisterUser } from "../../requests/UserRequests"
import { ProfesionalMed } from "../../types/Entities"
import Message from "../utilities/Message"
import { checkPasswordSecurity } from "../../functions/Utilities"

export function LogInForm() {
  const {sendLogInData, errorInterface} = useLogIn()

  return (
    <section className="registerSection">
      <h1>Iniciar sesión</h1>
      {errorInterface && <Message messageObject={errorInterface} />}
      <form onSubmit={e =>sendLogInData(e)}>
        <label>Nombre de usuario:<input type="text" name="username" /></label>
        <label>Contraseña: <input type="password" name="password" /></label>
        <button type="submit">Iniciar sesión</button>
      </form>
    </section>
  )
}

export function RegisterForm() {
  const [samePassword, setSamePassword] = useState<{value: string, secondValue: string, areEquals: boolean}>({
    value: "", secondValue: "", areEquals: true})
  const [isProffesional, setIsProffesional] = useState(false)
  const proffesionals = useGetAllProfesionales()?.results as ProfesionalMed[]
  const {handleFormSubmit, response} = useRegisterUser()

  const handleIsProffesionalOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.checked
    setIsProffesional(newValue)
  }

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

  return (
    <section className="registerSection">
      <h1>Registrarse</h1>
      {response?.message.text && <Message messageObject={response.message} />}
      <form onSubmit={e => handleFormSubmit(e, isProffesional)}>
        <label>Nombre de usuario<input type="text" name="username" /></label>
        <label>Contraseña<input type="password" name="password" onChange={e => handle2PasswordOnChange(e, true)}/></label>
        {checkPasswordSecurity(samePassword.value) != null && <p>{checkPasswordSecurity(samePassword.value)}</p>}
        <label>Repetir contraseña<input type="password" name="password2" onChange={e => handle2PasswordOnChange(e, false)}/></label>
        {!samePassword.areEquals && <p>Las contraseñas no coinciden</p>}
        <label>Correo electrónico<input type="email" name="email" /></label>
        <div>
          <label>
            <input type="checkbox" name="isProffesional" checked={isProffesional} onChange={e => handleIsProffesionalOnChange(e)}/>
            Marque si usted es un profesional de salud
          </label>
          {isProffesional && 
            <select name="proffesionalDNI">
              {proffesionals?.map(proffesional => <option value={proffesional.dni}>{proffesional.nombreCompleto}</option>)}
            </select>
          }
        </div>
        <button type="submit" disabled={!samePassword.areEquals}>Registrar</button>
      </form>
    </section>
  )
}