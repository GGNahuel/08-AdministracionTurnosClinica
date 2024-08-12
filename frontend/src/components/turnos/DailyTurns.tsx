import { getSchedulesInAllAreas, filterTurnosByAreas } from "../../functions/FilterFunctions";
import { useGetAreasByActiveStatus } from "../../hooks/AreaRequests";
import { useGetAllProfesionales } from "../../hooks/ProfesionalRequests";
import { useGetAllTurnos } from "../../hooks/TurnoRequests";
import { AreaProfesional, ProfesionalMed, Turno } from "../../types/Entities";
import { CasillaTurno, CasillaTurnoPorOrdenDeLlegada } from "./CasillaTurno";

export function DailyTurns() {
  const allTurnos = useGetAllTurnos() // cambiar por turnos del día
  const turnos = allTurnos.results as Turno[]
  const activeAreas = useGetAreasByActiveStatus(true)?.results as AreaProfesional[]
  const allProfesionales = useGetAllProfesionales()?.results as ProfesionalMed[]

  const listaHorarios = getSchedulesInAllAreas(allProfesionales, activeAreas)
  const turnosByAreas = filterTurnosByAreas(activeAreas, turnos)

  return (
    <section id="dailyTurnos">
      <header>
        <h1>Turnos del día</h1>
        <h3>Seleccione el área para ver los turnos asociados</h3>
      </header>
      {activeAreas?.map(areaDto => (
        <DailyTurnsInArea 
          areaDto={areaDto} 
          turnos={turnosByAreas ? turnosByAreas[areaDto.nombre] : null} 
          horarios={listaHorarios ? listaHorarios[areaDto.nombre] : null}
        />
      ))}
    </section>
  )
}

function DailyTurnsInArea(props: {areaDto: AreaProfesional, turnos: Turno[] | null, horarios: string[] | null}) {
  const {areaDto, turnos, horarios} = props

  const nombreArea = areaDto.nombre
  const necesitaTurno = areaDto.necesitaTurno

  const turnosElements = horarios != null && horarios.length > 0 ? 
    (necesitaTurno ?
      horarios.map((horario, i) => {
        const turnoExistente = turnos?.find(turno => turno.horario === horario)

        return turnoExistente ? (
          <CasillaTurno key={turnoExistente.id} turno={turnoExistente} />
        ) : (
          <CasillaTurno key={i} horario={horario} />
        )
      })
      : <CasillaTurnoPorOrdenDeLlegada horarios={horarios[0]} nombreArea={nombreArea}/>
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
}
