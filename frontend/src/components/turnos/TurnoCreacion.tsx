import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Horario } from "../../classes/Horario";
import { routes } from "../../constants/NavigationRoutes";
import { dateInputValueToDBFormat, dateToInputFormat, formatDate, generateArrayOfNextDays, getMonthName } from "../../functions/DateFunctions";
import { getSchedulesInSpecificArea } from "../../functions/FilterFunctions";
import { useGetAreasByActiveStatus } from "../../hooks/AreaRequests";
import { useGetPacientesByName } from "../../hooks/PacienteRequests";
import { useGetProfesionalsByArea } from "../../hooks/ProfesionalRequests";
import { useGetNextTurnosByArea, usePostTurno } from "../../hooks/TurnoRequests";
import { AreaProfesional, Paciente, ProfesionalMed, Turno } from "../../types/Entities";
import Message from "../utilities/Message";
import { CasillaDiaAgenda } from "./CasillaTurno";

export function TurnoCreacion() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [areaSelected, setAreaSelected] = useState<{name: string, needSchedule: boolean}>({name: "", needSchedule: false})
  const [searchPaciente, setSearchPaciente] = useState<string>("")
  const [turnDate, setTurnDate] = useState<{date: string, hour: string}>({date: "", hour: ""})
  const [playInputAnimation, setPlayInputAnimation] = useState(false)

  const {returnedPost, sendData} = usePostTurno()
  const activeAreas = useGetAreasByActiveStatus(true)?.results as AreaProfesional[]
  const pacientesList = useGetPacientesByName(searchPaciente)?.results as Paciente[]

  const profesionalesByAreas = useGetProfesionalsByArea(areaSelected.name)?.results as ProfesionalMed[]

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
    }, 400);
  }

  return (
    <section className="registerSection" ref={scrollRef}>
      <h1>Registrar turno</h1>
      {returnedPost?.message.text && <Message messageObject={returnedPost.message}/>}
      <form id="turnoForm" onSubmit={(ev) => {
        sendData(ev)
      }}>
        <label>
          Servicio: 
          <select required onChange={(ev) => {
            const [name, needSchedule] = ev.target.value.split("##")
            setAreaSelected({name: name, needSchedule: needSchedule == "true"})
          }}>
            <option value={""}>Seleccione un área</option>
            {activeAreas?.map(area => (
              <option key={area.nombre} value={area.nombre + "##" + area.necesitaTurno.toString()}>{area.nombre}</option>
            ))}
          </select>
        </label>
        <label>
          Profesional: 
          <select name="profesional" required>
            {areaSelected.name != "" ?
              profesionalesByAreas?.map(profesional => (
                <option key={profesional.dni} value={profesional.dni}>{profesional.nombreCompleto}</option>
              )) :
              <option value={""}>Seleccione un área para ver los profesionales disponibles</option>
            }
          </select>
        </label>
        <label>
          Nombre del paciente: (Ingrese el nombre y seleccione de la lista)
          <div className="grid autoColumns">
            <input type="search" onChange={(ev) => setSearchPaciente(ev.target.value)}/>
            <select name="paciente" required>
              {pacientesList?.length == 0 && <option>Ingrese un nombre para seleccionar el paciente</option>}
              {pacientesList?.map(paciente => (
                <option key={paciente.dni} value={paciente.dni}>{paciente.nombreCompleto}</option>
              ))}
            </select>
          </div>
        </label>
        <label className={playInputAnimation ? "animate" : ""}>
          Fecha: 
          <input type="date" value={turnDate.date != "" ? dateToInputFormat(turnDate.date) : ""}
            onChange={(ev) => {
              setTurnDate(prev => ({...prev, date: dateInputValueToDBFormat(ev.target.value)}))
            }}
          />
        </label>
        <label className={playInputAnimation ? "animate" : ""}>
          Horario: 
          <input type="time" value={turnDate.hour}
            onChange={(ev) => {
              setTurnDate(prev => ({...prev, hour: Horario.roundMinutes(ev.target.value)}))
            }}
          />
        </label>
        <h5>Para los campos de horario y fecha puede ingresarlos manualmente o a traves de la agenda que aparece al final</h5>
        <button type="submit">Enviar</button>
      </form>
      <section id="turnPicker">
        <h2>Seleccionar horario</h2>
        {areaSelected.name == "" ? 
          <p>Seleccione un area para ver la agenda</p> :
          nextMonths.map((monthName, index) => (
            <details key={monthName} name="monthSelected">
              <summary className="turnsSummary"><h3>{monthName}</h3><div className="detailsExpandButton"></div></summary>
              <section className={`schedulePicker ${scheduleList && scheduleList.length > 0 ? "" : "noSchedule"}`}>
                {scheduleList && scheduleList.length > 0 ?
                  nextMonthLenghts[index].map(dayNumber => (
                    <CasillaDiaAgenda 
                      key={dayNumber}
                      fecha={new Date(actualYearNumber, actualMonthNumber + index, dayNumber)} 
                      horarios={scheduleList} turnos={nextTurnos} dateState={turnDate}
                      onClickFunction={handleSelectSchedule}
                    />
                  )) :
                  <p>No existen horarios designados en este área, revisar servicio. <Link to={routes.area_consultorio.list} target="blank">Ver especialidades</Link></p>
                }
              </section>
            </details>
          ))
        }
      </section>
    </section>
  )
}
