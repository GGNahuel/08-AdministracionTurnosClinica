import { Link } from "react-router-dom"
import { formatDate, generateArrayOfNextDays, getMonthName } from "../../functions/DateFunctions"
import { getSchedulesInSpecificArea } from "../../functions/FilterFunctions"
import { useGetNextTurnosByArea } from "../../requests/TurnoRequests"
import { ProfesionalMed, Turno } from "../../types/Entities"
import { CasillaDiaAgenda } from "./CasillaTurno"
import { routes } from "../../constants/NavigationRoutes"
import { useState } from "react"

export function SchedulePicker(props:{
  areaSelected: {name: string, needSchedule: boolean},
  profesionalesByAreas: ProfesionalMed[],
  scrollRef: React.RefObject<HTMLDivElement>,
  turnDateState: {
    turnDate: {
      date: string;
      hour: string;
    },
    setTurnDate: React.Dispatch<React.SetStateAction<{
      date: string;
      hour: string;
    }>>
  }
  setPlayInputAnimation: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const {areaSelected, setPlayInputAnimation, profesionalesByAreas, scrollRef} = props
  const {turnDate, setTurnDate} = props.turnDateState

  const [availableFilter, setFilter] = useState(false)
  const handleOnChangeAvailableFilter = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(ev.currentTarget.checked)
  }

  const todayDate = formatDate(new Date())
  const nextTurnos = useGetNextTurnosByArea(todayDate, areaSelected.name)?.results as Turno[]
  const actualMonthNumber = new Date().getMonth()
  const actualYearNumber = new Date().getFullYear()
  const nextMonths = [getMonthName(actualMonthNumber), getMonthName(actualMonthNumber + 1), getMonthName(actualMonthNumber + 2)]
  const scheduleList = getSchedulesInSpecificArea(areaSelected.name, profesionalesByAreas, areaSelected.needSchedule)

  const nextMonthLenghts = [
    generateArrayOfNextDays(actualMonthNumber, actualYearNumber, new Date().getDate()), 
    generateArrayOfNextDays(actualMonthNumber + 1, actualYearNumber),
    generateArrayOfNextDays(actualMonthNumber + 2, actualYearNumber)
  ]

  const handleSelectSchedule = (fecha: string, horario: string) => {
    setTurnDate({date: fecha, hour: horario})
    if (scrollRef.current) scrollRef.current.scrollTop = 0
    setPlayInputAnimation(true)
    setTimeout(() => {
      setPlayInputAnimation(false)
    }, 400); // animation length
  }

  return (
    <section id="turnPicker">
      <header>
        <h2>Seleccionar horario</h2>
        <label><input type="checkbox" checked={availableFilter} onChange={(e) => handleOnChangeAvailableFilter(e)}/>Mostrar solo horarios disponibles</label>
      </header>
      {areaSelected.name == "" ? 
        <p>Seleccione un area para ver la agenda</p> :
        nextMonths.map((monthName, index) => (
          <details key={monthName} name="monthSelected" className="mainDetails">
            <summary className="turnsSummary"><h3>{monthName}</h3><div className="detailsExpandButton"></div></summary>
            <section className={`schedulePicker ${scheduleList && scheduleList.length > 0 ? "" : "noSchedule"}`}>
              {scheduleList && scheduleList.length > 0 ?
                nextMonthLenghts[index].map(dayNumber => (
                  <CasillaDiaAgenda 
                    key={dayNumber}
                    fecha={new Date(actualYearNumber, actualMonthNumber + index, dayNumber)} 
                    horarios={scheduleList} turnos={nextTurnos} dateState={turnDate}
                    onClickFunction={handleSelectSchedule} activeFilter={availableFilter}
                  />
                )) :
                <p>No existen horarios designados en este área, revisar servicio. <Link to={routes.area_consultorio.list} target="blank">Ver especialidades</Link></p>
              }
            </section>
          </details>
        ))
      }
    </section>
  )
}