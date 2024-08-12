import { useState } from "react";
import { useGetAllAreas } from "../../hooks/AreaRequests";
import { useGetNextTurnosByArea, usePostTurno } from "../../hooks/TurnoRequests";
import { AreaProfesional, Paciente, ProfesionalMed, Turno } from "../../types/Entities";
import { useGetProfesionalsByArea } from "../../hooks/ProfesionalRequests";
import { useGetPacientesByName } from "../../hooks/PacienteRequests";
import Message from "../utilities/Message";
import { formatDate, getMonthName } from "../../functions/formatDate";

export function TurnoCreacion() {
  const [areaSelected, setAreaSelected] = useState<string>("")
  const [searchPaciente, setSearchPaciente] = useState<string>("")

  const {returnedPost, sendData} = usePostTurno()
  const allAreas = useGetAllAreas()?.results as AreaProfesional[]
  const pacientesList = useGetPacientesByName(searchPaciente)?.results as Paciente[]

  const profesionalesByAreas = useGetProfesionalsByArea(areaSelected)?.results as ProfesionalMed[]

  const todayDate = formatDate(new Date())
  const nextTurnos = useGetNextTurnosByArea(todayDate, areaSelected)?.results as Turno[]
  const actualMonthNumber = new Date().getMonth()
  const nextMonths = [getMonthName(actualMonthNumber), getMonthName(actualMonthNumber + 1), getMonthName(actualMonthNumber + 2)]

  return (
    <section className="registerSection">
      <h1>Registrar turno</h1>
      {returnedPost?.message.text && <Message messageObject={returnedPost.message}/>}
      <form id="turnoForm" onSubmit={(ev) => {
        sendData(ev)
      }}>
        <label>
          Servicio: 
          <select name="area" onChange={(ev) => setAreaSelected(ev.target.value)} required>
            <option value={""}>Seleccione un área</option>
            {allAreas.map(area => (
              <option key={area.nombre} value={area.nombre}>{area.nombre}</option>
            ))}
          </select>
        </label>
        <label>
          Profesional: 
          <select name="profesional" required>
            {areaSelected != "" ?
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
        {areaSelected == "" ? 
          <p>Seleccione un area para ver la agenda</p> :
          nextMonths.map(monthName => (
            <details>
              <summary>{monthName}</summary>
              <section className="schedulePicker">
                
              </section>
            </details>
          ))
        }
      </section>
    </section>
  )
}