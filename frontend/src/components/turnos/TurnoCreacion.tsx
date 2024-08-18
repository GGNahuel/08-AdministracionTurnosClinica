import { useRef, useState } from "react";

import { Horario } from "../../classes/Horario";
import { dateInputValueToDBFormat, dateToInputFormat } from "../../functions/DateFunctions";

import { useGetAreasByActiveStatus } from "../../hooks/AreaRequests";
import { useGetPacientesByName } from "../../hooks/PacienteRequests";
import { useGetProfesionalsByArea } from "../../hooks/ProfesionalRequests";
import { usePostTurno } from "../../hooks/TurnoRequests";

import { AreaProfesional, Paciente, ProfesionalMed } from "../../types/Entities";

import Message from "../utilities/Message";
import { SchedulePicker } from "./SchedulePicker";
import { EstadoPago } from "../../types/BackendEnums";
import { cutPascalCase } from "../../functions/Utilities";

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

  return (
    <section className="registerSection" ref={scrollRef}>
      <h1>Registrar turno</h1>
      {returnedPost?.message.text && <Message messageObject={returnedPost.message}/>}
      <form id="turnoForm" onSubmit={(ev) => {
        sendData(ev, areaSelected.name, turnDate)
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
              {pacientesList?.length == 0 && <option value={""}>Ingrese un nombre para seleccionar el paciente</option>}
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
        <label>
          Estado pago: 
          <select name="estadoPago" required>
            {EstadoPago.map(estado => (<option key={estado} value={estado}>{cutPascalCase(estado)}</option>))}
          </select>
        </label>
        <label>
          Comentario: 
          <textarea name="comentario" cols={3} />
        </label>
        <button type="submit">Enviar</button>
      </form>
      <SchedulePicker areaSelected={areaSelected} profesionalesByAreas={profesionalesByAreas} turnDateState={{turnDate, setTurnDate}} 
      scrollRef={scrollRef} setPlayInputAnimation={setPlayInputAnimation}/>
    </section>
  )
}
