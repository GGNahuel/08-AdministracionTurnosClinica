import { obtenerHorarios, filterTurnosByAreas } from "../../functions/FilterFunctions";
import { useGetAllAreas } from "../../hooks/AreaRequests";
import { useGetAllProfesionales } from "../../hooks/ProfesionalRequests";
import { useGetAllTurnos } from "../../hooks/TurnoRequests";
import { AreaProfesional, ProfesionalMed, Turno } from "../../types/Entities";
import { CasillaTurno, CasillaTurnoPorOrdenDeLlegada } from "./CasillaTurno";

export function TurnoListado() {
  const allTurnos = useGetAllTurnos() // cambiar por turnos del día
  const turnos = allTurnos.results as Turno[]
  const allAreas = useGetAllAreas()?.results as AreaProfesional[]
  const allProfesionales = useGetAllProfesionales()?.results as ProfesionalMed[]
  const turnosByAreas = filterTurnosByAreas(allAreas, turnos)

  return (
    <section id="dailyTurnos">
      <header>
        <h1>Turnos del día</h1>
        <h3>Seleccione el área para ver los turnos asociados</h3>
      </header>
      {allAreas?.map(areaDto => {
        if (areaDto.activa == false) return
        const nombreArea = areaDto.nombre
        const necesitaTurno = areaDto.necesitaTurno
        const listaHorarios = obtenerHorarios(nombreArea, necesitaTurno, allProfesionales, allAreas)
        const turnosExistentes = turnosByAreas ? turnosByAreas[nombreArea] : null

        const turnosElements = listaHorarios != null && listaHorarios.length > 0 ? 
          (necesitaTurno ?
            listaHorarios.map((horario, i) => {
              const turnoExistente = turnosExistentes?.find(turno => turno.horario === horario);
              return turnoExistente ? (
                <CasillaTurno key={turnoExistente.id} turno={turnoExistente} />
              ) : (
                <CasillaTurno key={i} horario={horario} />
              )
            })
            : <CasillaTurnoPorOrdenDeLlegada horarios={listaHorarios[0]} nombreArea={nombreArea}/>
          ) : <p>No hay horarios para esta área, revisar horarios de profesionales</p>

        return (
          <details key={nombreArea}>
            <summary>
              <h3>{nombreArea.toUpperCase()}</h3>
              <div className="detailsExpandButton"></div>
            </summary>
            <section className="horariosContainer">
              {turnosElements}
            </section>
          </details>
        )
      })}
    </section>
  )
}
