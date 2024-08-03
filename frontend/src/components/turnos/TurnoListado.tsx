import { filterProfesionalsByArea, filterTurnosByAreas } from "../../functions/FilterFunctions";
import { Horario } from "../../functions/HorarioClass";
import { useGetAllAreas } from "../../hooks/AreaRequests";
import { useGetAllProfesionales, useGetProfesionalsByArea } from "../../hooks/ProfesionalRequests";
import { useGetAllTurnos } from "../../hooks/TurnoRequests";
import { AreaProfesional, ProfesionalMed, Turno } from "../../types/Entities";

export function TurnoListado() {
  const allTurnos = useGetAllTurnos() // cambiar por turnos del día
  const turnos = allTurnos.results as Turno[]
  const allAreas = useGetAllAreas()?.results as AreaProfesional[]
  const allProfesionales = useGetAllProfesionales()?.results as ProfesionalMed[]
  const turnosByAreas = filterTurnosByAreas(allAreas, turnos)

  const obtenerHorarios = (nombreArea: string, necesitaTurnoArea: boolean) => {
    const profesionales = filterProfesionalsByArea(nombreArea, allProfesionales, allAreas)
    if (profesionales == null) return null

    const listaHorarios = profesionales.map(profesional => profesional.horarios || []).flat()
    //agregar corrección en el caso que haya horarios duplicados

    const formattedHorarios: [string] = [Horario.getScheduleBlocksFromStrings(listaHorarios)]

    return necesitaTurnoArea ? listaHorarios : formattedHorarios
  }

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
        const listaHorarios = obtenerHorarios(nombreArea, necesitaTurno)
        const turnosExistentes = turnosByAreas ? turnosByAreas[nombreArea] : null

        const turnosElements = listaHorarios != null && (necesitaTurno 
          ? listaHorarios.map((horario, i) => {
            const turnoExistente = turnosExistentes?.find(turno => turno.horario === horario);
            return turnoExistente ? (
              <CasillaTurno key={turnoExistente.id} turno={turnoExistente} />
            ) : (
              <CasillaTurno key={i} horario={horario} />
            )
          })
          : <CasillaTurnoPorOrdenDeLlegada horarios={listaHorarios[0]} nombreArea={nombreArea}/>
        )

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

// exportar estos elementos en archivos a parte

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

function CasillaTurnoPorOrdenDeLlegada(props: { turnos?: Turno[], horarios: string, fecha?: Date, nombreArea: string }) {
  const { turnos, horarios, nombreArea } = props
  const profesionalesInArea = useGetProfesionalsByArea(nombreArea)?.results as ProfesionalMed[]
  const horariosFormatted = horarios.split("-")
  return (
    <article className={"grid dailyTurno byArrivalOrder"}>
      <p className="horario">{horariosFormatted[0] + " - " + horariosFormatted[1]}</p>
      <div className="info">
        <p>Profesional/es:<strong>{profesionalesInArea?.map(profesionalDto => " " + profesionalDto.nombreCompleto)}</strong></p>
        <p>Consultorio: </p>
        <section className="registeredTurns">
          {turnos?.map(turno => (
            <div>
              <p>{turno.pacienteDto.nombreCompleto}</p>
              <p>{turno.pacienteDto.dni}</p>
            </div>
          ))}  
        </section>      
      </div>
    </article>
  )
}
