import { useGetAllPacientes } from "../../hooks/PacienteRequests"
import { useGetTurnosByPaciente } from "../../hooks/TurnoRequests"
import { Paciente } from "../../types/Entities"

export function PacienteListado() {
  const allPacientes = useGetAllPacientes()
  const results = allPacientes?.results || []

  const { pacienteSelectedByDni, setPacienteSelected } = useGetTurnosByPaciente()
  const showTurnos = (dniPaciente: string) => {
    setPacienteSelected(prevState => ({
      ...prevState,
      dni: dniPaciente
    }))
  }

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
            <article key={paciente2.id} className="list paciente" style={{ border: "2px solid black", margin: "10px" }}>
              <p>{paciente2.nombreCompleto}</p>
              <p>{paciente2.dni}</p>
              <p>{paciente2.numeroContacto}</p>
              <p>{paciente2.obraSocial}</p>
              <div onClick={() => showTurnos(paciente2.dni)}>
                <p>Ver turnos: </p>
              </div>
              <div>
                {pacienteSelectedByDni.dni === paciente2.dni && pacienteSelectedByDni.turnos?.map((turno) => (
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
    </>
  )
}
