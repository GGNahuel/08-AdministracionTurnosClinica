import { usePostArea } from "../../hooks/AreaRequests"
import { usePostConsultorio } from "../../hooks/ConsultorioRequests"

export function AreaConsCreate() {
  const {returnedPost : returnedConsultorio, sendConsultorioToPost} = usePostConsultorio()
  const {returnedPost : returnedArea, sendAreaToPost} = usePostArea()

  return (
    <section className="registrSection">
      <header>
        <h1>Registrar consultorios y/o áreas</h1>
      </header>
      <section className="registerForm">
        <h2>Registro de Consultorio</h2>
        <form onSubmit={(ev) => sendConsultorioToPost(ev)}>
          <label>Número de consultorio<input type="number" name="numeroConsultorio"/></label>
          <button type="submit">Enviar</button>
        </form>

      </section>
      <section className="registerForm">
        <h2>Registro de Área profesional</h2>
        <form onSubmit={(ev) => sendAreaToPost(ev)}>
          <label>Nombre<input type="text" name="nombre"/></label>
          <label>Desmarque la casilla si el área es por orden de llegada<input type="checkbox" name="necesitaTurno"/></label>
          <button type="submit">Enviar</button>
        </form>
      </section>
    </section>
  )
}
