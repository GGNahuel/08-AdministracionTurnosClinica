import { useRef, useState } from "react";
import { Horario } from "../../classes/Horario";
import { dateToInputFormat, dateInputValueToDBFormat } from "../../functions/DateFunctions";
import { cutPascalCase, normaliceString } from "../../functions/Utilities";
import { useGetAreasByActiveStatus, useGetAreasByName } from "../../hooks/AreaRequests";
import { useGetPacientesByName } from "../../hooks/PacienteRequests";
import { useGetProfesionalsByArea } from "../../hooks/ProfesionalRequests";
// import { usePutTurno } from "../../hooks/TurnoRequests";
import { EstadoPago } from "../../types/BackendEnums";
import { AreaProfesional, Paciente, ProfesionalMed, Turno } from "../../types/Entities";
import { SearchVar } from "../utilities/Searchvar";
import { SchedulePicker } from "./SchedulePicker";

export function EditTurnForm(props : {entity: Turno}) {
  const {entity} = props

  const scrollRef = useRef<HTMLDivElement>(null)
  const [areaSelected, setAreaSelected] = useState<{name: string, needSchedule: boolean}>({name: entity.areaProfesional, needSchedule: false})
  const [searchPaciente, setSearchPaciente] = useState<string>(entity.pacienteDto.nombreCompleto)
  const [turnDate, setTurnDate] = useState<{date: string, hour: string}>({date: entity.fecha, hour: entity.horario})
  const [playInputAnimation, setPlayInputAnimation] = useState(false)

  // const {sendPutRequest} = usePutTurno()
  const activeAreas = useGetAreasByActiveStatus(true)?.results as AreaProfesional[]
  const pacientesList = useGetPacientesByName(searchPaciente)?.results as Paciente[]
  const profesionalesByAreas = useGetProfesionalsByArea(areaSelected.name)?.results as ProfesionalMed[]
  useGetAreasByName(normaliceString(entity.areaProfesional), setAreaSelected)

  return (
    <section>
      <form onSubmit={(ev) => {
        // sendPutRequest(ev, areaSelected.name, turnDate)
      }}>
        <input type="hidden" name="id" value={entity.id}/>
        <label>
          Servicio: 
          <select required onChange={(ev) => {
            const [name, needSchedule] = ev.target.value.split("##")
            setAreaSelected({name: name, needSchedule: needSchedule == "true"})
          }} >
            <option value={""}>Seleccione un área</option>
            {activeAreas?.map(area => (
              <option 
                key={area.nombre} value={area.nombre + "##" + area.necesitaTurno.toString()} 
                selected={area.nombre == entity.areaProfesional}
              >{area.nombre}</option>
            ))}
          </select>
        </label>
        <label>
          Profesional: 
          <select name="profesional" required>
            {areaSelected.name != "" ?
              profesionalesByAreas?.map(profesional => (
                <option key={profesional.dni} value={profesional.dni} selected={profesional.id == entity.profesionalDto.id}>{profesional.nombreCompleto}</option>
              )) :
              <option value={""}>Seleccione un área para ver los profesionales disponibles</option>
            }
          </select>
        </label>
        <label>
          Nombre del paciente:
          <div className="grid autoColumns">
            <SearchVar onChangeFunction={(ev) => setSearchPaciente(ev.target.value)} placeholder="Búsqueda del paciente"/>
            <select name="paciente" required>
              {pacientesList?.length == 0 && <option value={""}>Ingrese un nombre para seleccionar el paciente</option>}
              {pacientesList?.map(paciente => (
                <option key={paciente.dni} value={paciente.dni} defaultChecked={paciente.id == entity.pacienteDto.id}>{paciente.nombreCompleto}</option>
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
            {EstadoPago.map(estado => (<option key={estado} value={estado} selected={entity.estadoPago == estado}>{cutPascalCase(estado)}</option>))}
          </select>
        </label>
        <label>
          Comentario: 
          <textarea name="comentario" cols={3} value={entity.comentario}/>
        </label>
        <button type="submit">Enviar</button>
      </form>
      <SchedulePicker areaSelected={areaSelected} profesionalesByAreas={profesionalesByAreas} turnDateState={{turnDate, setTurnDate}} 
      scrollRef={scrollRef} setPlayInputAnimation={setPlayInputAnimation}/>
    </section>
  )
}