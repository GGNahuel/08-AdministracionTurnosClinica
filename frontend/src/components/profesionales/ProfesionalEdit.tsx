import { useState } from "react"
import { useGetAllAreas } from "../../requests/AreaRequests"
import { useGetAllConsultorios } from "../../requests/ConsultorioRequests"
import { ProfesionalMed, AreaProfesional, Consultorio } from "../../types/Entities"
import { usePutProfesional } from "../../requests/ProfesionalRequests"
import { Horario } from "../../classes/Horario"

export function EditProfesionalForm(props : {fieldsValuesState: ProfesionalMed, handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
  const {fieldsValuesState, handleOnChange} = props
  const {sendPutRequest} = usePutProfesional()

  const [selectedAreas, setSelectedAreas] = useState(fieldsValuesState.areas)
  const [scheduleBlock, setScheduleBlock] = useState(fieldsValuesState.horarios ? Horario.getScheduleBlocksFromStrings(fieldsValuesState.horarios) : "")
  const areas = useGetAllAreas()?.results as AreaProfesional[]
  const consultorios = useGetAllConsultorios()?.results as Consultorio[]

  const handleOnChangeAreasInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = ev.target

    setSelectedAreas(prev => checked ?
      [...prev, name] :
      prev.filter(areaName => areaName !== name)
    )
  }

  return (
    <form onSubmit={(e) => sendPutRequest(e, selectedAreas)}>
      <input type="hidden" name="id" value={fieldsValuesState.id} />
      <label>Nombre completo: 
        <input type="text" name="nombreCompleto" value={fieldsValuesState.nombreCompleto} onChange={(e) => handleOnChange(e)}/>
      </label>
      <label>DNI: 
        <input type="text" name="dni" value={fieldsValuesState.dni} onChange={(e) => handleOnChange(e)}/>
      </label>
      <label>Número de telefono: 
        <input type="number" name="numeroContacto" value={fieldsValuesState.numeroContacto} onChange={(e) => handleOnChange(e)}/>
      </label>
      <label>Número de matricula: 
        <input type="number" name="matricula" value={fieldsValuesState.numMatricula} onChange={(e) => handleOnChange(e)}/>
      </label>
      <label>Consultorio: 
        <select name="consultorio">
          {consultorios?.map(consultorio => {
            const numero = consultorio.numeroConsultorio
            return <option key={numero} value={numero} defaultChecked={numero == fieldsValuesState.consultorio}>{numero}</option>
          })}
        </select>
      </label>
      <div className="grid allWidth">Áreas de ocupación:
        <div className="grid autoColumns checkboxContainer">
          {areas?.map(area => area.activa && (
            <div key={area.id}><label>
              <input type="checkbox" name={area.nombre} checked={selectedAreas.includes(area.nombre)} onChange={handleOnChangeAreasInput} />{area.nombre}
            </label></div>
          ))}
        </div>
      </div>
      <label className="moreInfoLabel">Horarios: 
        <input type="text" name="horarios" value={scheduleBlock} onChange={(e) => setScheduleBlock(e.target.value)}/>
      </label>
      <div className="moreInfo">
        <p>Los horarios deben tener el siguiente formato: "hora":"minutos" (formato de 24 horas).</p>
        <p>Se puede indicar un rango de horarios usando el "-". Ej: 08:00-12:30. Para separar horarios use ", " (coma seguida de un espacio).</p>
        <p>Ej: "08:00-12:30, 16:00-18:30, 20:00" significa que trabaja de 8 a 12:30, de 16 a 18:30, y a las 20hs.</p>
      </div>
      <button type="submit">Aplicar</button>
    </form>
  )
}
