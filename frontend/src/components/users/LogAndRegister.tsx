import { ChangeEvent, useState } from "react"
import { useGetAllProfesionales } from "../../requests/ProfesionalRequests"
import { ProfesionalMed } from "../../types/Entities"
import { useRegisterUser } from "../../requests/UserRequests"

export function LogInForm() {
  return (
    <section className="registerSection">
      <form>

      </form>
    </section>
  )
}

export function RegisterForm() {
  const [isProffesional, setIsProffesional] = useState(false)
  const proffesionals = useGetAllProfesionales()?.results as ProfesionalMed[]
  const {handleFormSubmit} = useRegisterUser()

  const handleIsProffesionalOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.checked
    setIsProffesional(newValue)
  }

  return (
    <section className="registerSection">
      <form onSubmit={e => handleFormSubmit(e, isProffesional)}>
        <label>Nombre de usuario<input type="text" name="username" /></label>
        <label>Contraseña<input type="password" name="password" /></label>
        <label>Repetir contraseña<input type="password" name="password2" /></label>
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
        <button type="submit">Registrar</button>
      </form>
    </section>
  )
}