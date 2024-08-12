import { useGetProfesionalsByArea } from "../../hooks/ProfesionalRequests"
import { ProfesionalMed, Turno } from "../../types/Entities"

export function CasillaTurno(props: { turno?: Turno, horario?: string, fecha?: Date }) {
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

export function CasillaTurnoPorOrdenDeLlegada(props: { turnos?: Turno[], horarios: string, fecha?: Date, nombreArea: string }) {
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

export function CasillaDiaAgenda(props: {fecha: string, horarios: string[], turnos?: Turno[]}) {
  const {fecha, horarios, turnos} = props

  // verificacion de que los turnos lleguen con la misma fecha

  return (
    <article>
      <header>
        <h3>{fecha}</h3>
      </header>
      {horarios.map(horario => {
        const turnoAssigned = turnos?.find(turno => turno.horario == horario && turno.fecha == fecha)

        return (
          <article className={"grid dailyTurno journal" + (turnoAssigned ? "unavailable" : "")}>
            <p>{horario}</p>
            <p>{turnoAssigned ? turnoAssigned.pacienteDto.nombreCompleto : "---"}</p>
          </article>
        )
      })}
    </article>
  )
}
