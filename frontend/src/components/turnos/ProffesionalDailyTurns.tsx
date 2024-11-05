import { useContext } from "react"
import { SessionContext, SessionContextInterface } from "../../context/SessionContext"
import { formatDate } from "../../functions/DateFunctions"
import { useGetAreasByProffesionalDni } from "../../requests/AreaRequests"
import { useGetTurnosByProffesionalAndDate } from "../../requests/TurnoRequests"
import { AreaProfesional, ProfesionalMed, Turno } from "../../types/Entities"
import { filterTurnosByAreas, getSchedulesInAllAreas } from "../../functions/FilterFunctions"
import { useGetProfesionalByDni } from "../../requests/ProfesionalRequests"
import { DailyTurnsInArea } from "./DailyTurns"

export function ProffesionalTurns() {
  const {loggedUser} = useContext(SessionContext) as SessionContextInterface
  const loggedProffesionalDNI = loggedUser?.proffesionalDni || ""

  const turns = useGetTurnosByProffesionalAndDate(loggedProffesionalDNI, formatDate(new Date()))?.results as Turno[]
  const loggedProffesional = useGetProfesionalByDni(loggedProffesionalDNI)?.results[0] as ProfesionalMed
  const proffesionalAreas = useGetAreasByProffesionalDni(loggedProffesionalDNI)?.results as AreaProfesional[]

  const filteredTurns = filterTurnosByAreas(proffesionalAreas, turns)
  const schedulesInAreas = getSchedulesInAllAreas([loggedProffesional], proffesionalAreas)

  return loggedUser ? (
    <section id="dailyTurnsProffesional">
      <header>
        <h1>Mis turnos</h1>
        <h2>{formatDate(new Date)}</h2>
      </header>
      {(filteredTurns && schedulesInAreas) && proffesionalAreas.map(area => (
        <DailyTurnsInArea key={area.id} areaDto={area} turnos={filteredTurns[area.nombre]} horarios={schedulesInAreas[area.nombre]}/>
      ))}
    </section>
  ) : (
    <section>
      <h2>Necesita iniciar sesión para poder acceder a esta página</h2>
    </section>
  )
}