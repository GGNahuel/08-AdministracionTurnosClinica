import { useState } from "react";
import { useGetAreasByActiveStatus } from "../../hooks/AreaRequests";
import { useGetNextTurnosByArea, usePostTurno } from "../../hooks/TurnoRequests";
import { AreaProfesional, Paciente, ProfesionalMed, Turno } from "../../types/Entities";
import { useGetProfesionalsByArea } from "../../hooks/ProfesionalRequests";
import { useGetPacientesByName } from "../../hooks/PacienteRequests";
import Message from "../utilities/Message";
import { formatDate, generateArrayOfNextDays, getMonthName } from "../../functions/DateFunctions";
import { getSchedulesInSpecificArea } from "../../functions/FilterFunctions";
import { CasillaDiaAgenda } from "./CasillaTurno";

export function TurnoCreacion() {
  const [areaSelected, setAreaSelected] = useState<{name: string, needSchedule: boolean}>({name: "", needSchedule: false})
  const [searchPaciente, setSearchPaciente] = useState<string>("")

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

  return (
    <section className="registerSection">
      <h1>Registrar turno</h1>
      {returnedPost?.message.text && <Message messageObject={returnedPost.message}/>}
      <form id="turnoForm" onSubmit={(ev) => {
        sendData(ev)
      }}>
        <label>
          Servicio: 
          <select name="area" required onChange={(ev) => {
            const [name, needSchedule] = ev.target.value.split("##")
            console.log(name, needSchedule, areaSelected)
            setAreaSelected({name: name, needSchedule: needSchedule == "true"})
          }}>
            <option>Seleccione un área</option>
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
              {pacientesList?.length == 0 && <option value={""}>Ingrese el nombre para seleccionar el paciente</option>}
              {pacientesList?.map(paciente => (
                <option key={paciente.dni} value={paciente.dni}>{paciente.nombreCompleto}</option>
              ))}
            </select>
          </div>
        </label>
        <label>
            Fecha: 
            <input type="date" name="fecha" placeholder="Horario"/>
        </label>
        <h5>Para los campos de horario y fecha puede ingresarlos manualmente o a traves de la agenda que aparece al final</h5>
        <button type="submit">Enviar</button>
      </form>
      <section id="turnPicker">
        <h2>Seleccionar horario</h2>
        {areaSelected.name == "" ? 
          <p>Seleccione un area para ver la agenda</p> :
          nextMonths.map((monthName, index) => (
            <details key={monthName}>
              <summary>{monthName}</summary>
              <section className="schedulePicker">
                {nextMonthLenghts[index].map(dayNumber => (
                  <CasillaDiaAgenda fecha={new Date(actualYearNumber, actualMonthNumber + index, dayNumber)} horarios={scheduleList} turnos={nextTurnos}/>
                ))}
              </section>
            </details>
          ))
        }
      </section>
    </section>
  )
}
