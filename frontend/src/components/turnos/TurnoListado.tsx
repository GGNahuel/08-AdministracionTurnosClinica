import { FilterTurnosByArea } from "../../functions/FilterTurnosByArea";
import { useGetAllAreas } from "../../hooks/AreaRequests";
import { useGetAllTurnos } from "../../hooks/TurnoRequests";
import { AreaProfesional, Turno } from "../../types/Entities";

export function TurnoListado() {
  const allTurnos = useGetAllTurnos()
  const turnos = allTurnos.results as Turno[]
  const allAreas = useGetAllAreas().results as AreaProfesional[]
  const turnosByAreas = FilterTurnosByArea(allAreas, turnos)
  const turnosByAreasArray = turnosByAreas != null ? Object.entries(turnosByAreas) : null
  console.log(turnosByAreas)

  return (
    <section>
      <h2>Turnos del día</h2>
      {turnosByAreasArray?.map(turnosFiltrados => {
        const nombreArea = turnosFiltrados[0]
        const turnosEnArea = turnosFiltrados[1] as Turno[]

        return (
          <details>
            <summary>{nombreArea}</summary>
            {turnosEnArea?.map(turno => (
              <article>
                <p>Consultorio: {turno.consultorio}</p>
                <p>Paciente: {turno.pacienteDto.nombreCompleto}</p>
                <p>Profesional: {turno.profesionalDto.nombreCompleto}</p>
              </article>
            ))}
          </details>
        )
      })}
    </section>
  )
}

