import { useContext, useEffect, useRef, useState } from "react";
import { Horario } from "../../classes/Horario";
import { dateToInputFormat, dateInputValueToDBFormat } from "../../functions/DateFunctions";
import { cutPascalCase, normaliceString } from "../../functions/Utilities";
import { useGetAreasByActiveStatus, useGetAreasByName, useGetAreasByProffesionalDni } from "../../requests/AreaRequests";
import { useGetPacientesByName } from "../../requests/PacienteRequests";
import { useGetProfesionalByDni, useGetProfesionalsByArea } from "../../requests/ProfesionalRequests";
import { usePutTurno } from "../../requests/TurnoRequests";
import { EstadoPago } from "../../types/BackendEnums";
import { AreaProfesional, Paciente, ProfesionalMed, Turno } from "../../types/Entities";
import { SearchVar } from "../utilities/Searchvar";
import { SchedulePicker } from "./SchedulePicker";
import Message from "../utilities/Message";
import { SessionContext, SessionContextInterface } from "../../context/SessionContext";

export function EditTurnForm(props : {fieldsValuesState: Turno, handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void}) {
  const {fieldsValuesState, handleOnChange} = props

  const scrollRef = useRef<HTMLDivElement>(null)
  const [areaSelected, setAreaSelected] = useState<{name: string, needSchedule: boolean}>({name: fieldsValuesState.areaProfesional, needSchedule: false})
  const [searchPaciente, setSearchPaciente] = useState<string>(fieldsValuesState.pacienteDto.nombreCompleto)
  const [pacienteSelectedObraSocial, setPacienteSelected] = useState<string>("")
  const [turnDate, setTurnDate] = useState<{date: string, hour: string}>({date: fieldsValuesState.fecha, hour: fieldsValuesState.horario})
  const [playInputAnimation, setPlayInputAnimation] = useState(false)

  const {loggedUser} = useContext(SessionContext) as SessionContextInterface

  const areaInForm = useGetAreasByName(normaliceString(fieldsValuesState.areaProfesional))?.results[0] as AreaProfesional
  const proffesionalAreas = useGetAreasByProffesionalDni(loggedUser && loggedUser.role == "PROFFESIONAL" ? loggedUser.proffesionalDni : "")
  const activeAreas = useGetAreasByActiveStatus(true)?.results as AreaProfesional[]
  const pacientesList = useGetPacientesByName(searchPaciente)?.results as Paciente[]
  const profesionalesByAreas = useGetProfesionalsByArea(areaSelected.name)?.results as ProfesionalMed[]
  const loggedProffesional = useGetProfesionalByDni(loggedUser && loggedUser.role == "PROFFESIONAL" ? loggedUser.proffesionalDni : "")?.results[0] as ProfesionalMed
  
  const {sendPutRequest, returnValue} = usePutTurno()

  useEffect(() => {
    setAreaSelected({name: areaInForm.nombre, needSchedule: areaInForm.necesitaTurno})
  }, [areaInForm])

  useEffect(() => {
    const pacienteSelected = pacientesList?.filter(paciente => paciente.nombreCompleto.toLowerCase().includes(searchPaciente.toLowerCase()))[0]
    setPacienteSelected(pacienteSelected?.obraSocial || "")
  }, [searchPaciente, pacientesList])

  return (
    <section>
      {returnValue?.message?.text && <Message messageObject={returnValue.message} />}
      {(fieldsValuesState.profesionalDto.dni == loggedUser?.proffesionalDni || loggedUser?.role != "PROFFESIONAL") && <><form onSubmit={(ev) => {
        sendPutRequest(ev, areaSelected.name, turnDate)
      }}>
        <input type="hidden" name="id" value={fieldsValuesState.id}/>
        <label>
          Servicio: 
          <select required onChange={(ev) => {
            const [name, needSchedule] = ev.target.value.split("##")
            setAreaSelected({name: name, needSchedule: needSchedule == "true"})
          }} >
            <option value={""}>Seleccione un área</option>
            {proffesionalAreas ?
              (proffesionalAreas.results as AreaProfesional[]).map(area => (
                <option key={area.nombre} value={area.nombre + "##" + area.necesitaTurno.toString()} selected={area.nombre == fieldsValuesState.areaProfesional}>{area.nombre}</option>
              )) :
              activeAreas?.map(area => (
                <option 
                  key={area.nombre} value={area.nombre + "##" + area.necesitaTurno.toString()} 
                  selected={area.nombre == fieldsValuesState.areaProfesional}
                >{area.nombre}</option>
              ))
            }
          </select>
        </label>
        <label>
          Profesional: 
          <select name="profesional" required>
            {
              loggedProffesional ?
                <option key={loggedProffesional.dni} value={loggedProffesional.dni} defaultChecked={loggedProffesional.id == fieldsValuesState.profesionalDto.id}>{loggedProffesional.nombreCompleto}</option>
              : areaSelected.name != "" ?
                profesionalesByAreas?.map(profesional => (
                  <option key={profesional.dni} value={profesional.dni} defaultChecked={profesional.id == fieldsValuesState.profesionalDto.id}>{profesional.nombreCompleto}</option>
                )) :
                <option value={""}>Seleccione un área para ver los profesionales disponibles</option>
            }
          </select>
        </label>
        <label>
          Nombre del paciente:
          <div className="grid autoColumns">
            <SearchVar onChangeFunction={(ev) => setSearchPaciente(ev.target.value)} placeholder="Búsqueda del paciente"/>
            <select name="paciente" required onChange={e => {
              const pacienteSelected = pacientesList.find(paciente => paciente.dni == e.target.value)
              setPacienteSelected(pacienteSelected?.obraSocial || "")
            }}>
              {pacientesList?.length == 0 && <option value={""}>Ingrese un nombre para seleccionar el paciente</option>}
              {pacientesList?.map(paciente => (
                <option key={paciente.dni} value={paciente.dni} defaultChecked={paciente.id == fieldsValuesState.pacienteDto.id}>{paciente.nombreCompleto}</option>
              ))}
            </select>
          </div>
        </label>
        <label>
          Obra social del paciente:
          <input type="text" disabled value={pacienteSelectedObraSocial}/>
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
          <select name="estadoPago" required defaultValue={fieldsValuesState.estadoPago}>
            {EstadoPago.map(estado => (<option key={estado} value={estado}>{cutPascalCase(estado)}</option>))}
          </select>
        </label>
        <label>
          Comentario: 
          <textarea name="comentario" cols={3} value={fieldsValuesState.comentario} onChange={(e) => handleOnChange(e)}/>
        </label>
        <button type="submit">Enviar</button>
      </form>
      <SchedulePicker areaSelected={areaSelected} profesionalesByAreas={profesionalesByAreas} turnDateState={{turnDate, setTurnDate}} 
      scrollRef={scrollRef} setPlayInputAnimation={setPlayInputAnimation}/></>}
    </section>
  )
}