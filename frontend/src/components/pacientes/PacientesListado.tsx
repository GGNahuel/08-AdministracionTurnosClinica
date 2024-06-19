import { useGetAllPacienteRequest, usePostPaciente } from "../../hooks/PacienteRequests"
import { useGetTurnosByPaciente } from "../../hooks/TurnoRequests"
import { Paciente } from "../../types/Entities"

export function ResultadosPaciente() {
  const allPacientes = useGetAllPacienteRequest()
  const results = allPacientes?.results || []

  const {pacienteSelectedByDni, setPacienteSelected} = useGetTurnosByPaciente()
  const showTurnos = (dniPaciente : string) => {
    setPacienteSelected(prevState => ({
      ...prevState,
      dni: dniPaciente
    }))
  }

  const {returnedPost, sendPacienteToPost} = usePostPaciente()

  return (
    <>
    <section>
      <h2>Listado de pacientes</h2>
      <header className="list_header list paciente">
        <span>Nombre del paciente</span>
        <span>Dni</span>
        <span>Número de contacto</span>
        <span>Obra social</span>
        <span>Turnos</span>
      </header>
      {results?.map((paciente) => {
        const paciente2 = paciente as Paciente
        return (
        <article key={paciente2.id} className="list paciente" style={{border: "2px solid black", margin: "10px"}}>
          <p>{paciente2.nombreCompleto}</p>
          <p>{paciente2.dni}</p>
          <p>{paciente2.numeroContacto}</p>
          <p>{paciente2.obraSocial}</p>
          <div onClick={() => showTurnos(paciente2.dni)}>
            <p>Ver turnos: </p>
          </div>
          <div>
            {pacienteSelectedByDni.dni === paciente2.dni &&  pacienteSelectedByDni.turnos?.map((turno) => (
              <div className="list turno">
                <strong>{turno.id}</strong>
                <p>{turno.fecha} - {turno.fecha}</p>
                <p>{turno.horario}:{turno.horario}</p>
                <p>{turno.areaProfesional}</p>
              </div>
            ))}
          </div>
        </article>
        )
      })}
    </section>
    <section>
    {returnedPost.message.text && <h2>{returnedPost.message.text}</h2>}
    {/* {returnedPost.results?.map((element, index) => <p key={index}>{element as string}</p>)} */}
      <form id="pacienteForm" onSubmit={(ev) => sendPacienteToPost(ev)}>
        <input type="text" name="nombreCompleto" placeholder="Ingrese el nombre" />
        <input type="text" name="dni" placeholder="Ingrese el dni" />
        <input type="number" name="numeroContacto" placeholder="Ingrese el número de teléfono" />
        <input type="text" name="obraSocial" placeholder="Obra social" />
        <button type="submit">Enviar</button>
      </form>
      {returnedElement(returnedPost.returnValue as Paciente)}
    </section>
    </>
  )
}

const returnedElement = (returnedPost : Paciente) => {
  if (!returnedPost) return
  const pacienteRegistrado = returnedPost

  return (
    <article key={pacienteRegistrado.id} className="list paciente" style={{border: "2px solid black", margin: "10px"}}>
      <p>{pacienteRegistrado.id}</p>
      <p>{pacienteRegistrado.nombreCompleto}</p>
      <p>{pacienteRegistrado.dni}</p>
      <p>{pacienteRegistrado.numeroContacto}</p>
      <p>{pacienteRegistrado.obraSocial}</p>
    </article>
  )
}
