import { usePostArea } from "../../hooks/AreaRequests"
import { usePostConsultorio } from "../../hooks/ConsultorioRequests"
import Message from "../navbar&UI/Message"

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
        <form onSubmit={(ev) => sendConsultorioToPost(ev)}>
          <label>Número de consultorio<input type="number" name="numeroConsultorio" required/></label>
          <button type="submit">Enviar</button>
        </form>
        {returnedConsultorio && <Message messageObject={returnedConsultorio.message}/>}
      </section>

      <section>
        <h2>Registro de Área profesional</h2>
        <form onSubmit={(ev) => sendAreaToPost(ev)}>
          <label>Nombre<input type="text" name="nombre" required/></label>
          <label>Desmarque la casilla si el área es por orden de llegada<input type="checkbox" name="necesitaTurno" defaultChecked required/></label>
          <button type="submit">Enviar</button>
        </form>
        {returnedArea && <Message messageObject={returnedArea.message}/>}
      </section>
    </section>
  )
}
