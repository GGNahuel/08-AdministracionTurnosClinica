import { usePostArea } from "../../requests/AreaRequests"
import { usePostConsultorio } from "../../requests/ConsultorioRequests"
import Message from "../utilities/Message"

export function AreaConsCreate() {
  const {returnedPost : returnedConsultorio, sendConsultorioToPost} = usePostConsultorio()
  const {returnedPost : returnedArea, sendAreaToPost} = usePostArea()

  return (
    <section className="registerSection">
      <header>
        <h1>Registrar consultorios y/o áreas</h1>
      </header>
      <section>
        <h2>Registro de Consultorio</h2>
        {returnedConsultorio && <Message messageObject={returnedConsultorio.message}/>}
        <form onSubmit={(ev) => sendConsultorioToPost(ev)}>
          <label>Número de consultorio<input type="number" name="numeroConsultorio" required/></label>
          <button type="submit">Enviar</button>
        </form>
      </section>

      <section>
        <h2>Registro de Área profesional</h2>
        {returnedArea && <Message messageObject={returnedArea.message}/>}
        <form onSubmit={(ev) => sendAreaToPost(ev)}>
          <label>Nombre<input type="text" name="nombre" required/></label>
          <label>Desmarque la casilla si el área es por orden de llegada<input type="checkbox" name="necesitaTurno" defaultChecked/></label>
          <button type="submit">Enviar</button>
        </form>
      </section>
    </section>
  )
}
