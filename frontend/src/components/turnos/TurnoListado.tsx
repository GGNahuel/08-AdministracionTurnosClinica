import { FilterProfesionalsByArea, FilterTurnosByAreas } from "../../functions/FilterFunctions";
import { useGetAllAreas } from "../../hooks/AreaRequests";
import { useGetAllProfesionales } from "../../hooks/ProfesionalRequests";
import { useGetAllTurnos } from "../../hooks/TurnoRequests";
import { AreaProfesional, ProfesionalMed, Turno } from "../../types/Entities";

export function TurnoListado() {
  const allTurnos = useGetAllTurnos() // cambiar por turnos del día
  const turnos = allTurnos.results as Turno[]
  const allAreas = useGetAllAreas().results as AreaProfesional[]
  const allProfesionales = useGetAllProfesionales()?.results as ProfesionalMed[]
  const turnosByAreas = FilterTurnosByAreas(allAreas, turnos)

  const obtenerHorarios = (nombreArea: string) => {
    const profesionales = FilterProfesionalsByArea(nombreArea, allProfesionales, allAreas)
    if (profesionales == null) return null

    const listaHorarios = profesionales.map(profesional => profesional.horarios || []).flat()

    return listaHorarios
  }

  return (
    <section id="dailyTurnos">
      <h2>Turnos del día</h2>
      {allAreas.map(areaDto => {
        const nombreArea = areaDto.nombre
        const listaHorarios = obtenerHorarios(nombreArea)
        const turnosExistentes = turnosByAreas ? turnosByAreas[nombreArea] : null

        return (
          <details>
            <summary>
              <h3>{nombreArea.toUpperCase()}</h3>
              <div className="detailsExpandButton"></div>
            </summary>
            <section className="horariosContainer">
              {listaHorarios?.map((horario, i) => {
                const turnoExistente = turnosExistentes?.find(turno => turno.horario === horario);
                return turnoExistente ? (
                  <CasillaTurno key={turnoExistente.id} turno={turnoExistente} />
                ) : (
                  <CasillaTurno key={i} horario={horario} />
                );
              })}
            </section>
          </details>
        )
      })}
    </section>
  )
}

function CasillaTurno(props: { turno?: Turno, horario?: string, fecha?: Date }) {
  const { turno, horario } = props
  const classIfHasTurno = turno ? " unavailable" : ""
  return (
    <article className={"grid dailyTurno" + classIfHasTurno}>
      <p className="horario">{turno?.horario || horario}</p>
      <div className="info">
        <p>Paciente: {turno?.pacienteDto.nombreCompleto}</p>
        <p>Profesional: {turno?.profesionalDto.nombreCompleto}</p>
        <p>Fecha: {turno?.fecha || "asd"}</p>
        <p>Consultorio: {turno?.consultorio || ""}</p>
      </div>
    </article>
  )
}
