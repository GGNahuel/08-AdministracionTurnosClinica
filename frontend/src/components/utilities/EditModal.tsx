import { forwardRef, ReactNode, useState } from "react"
import { getEntityType } from "../../functions/Validations"
import { AreaProfesional, Consultorio, Entities, Paciente, ProfesionalMed } from "../../types/Entities"
import { useGetAllAreas } from "../../hooks/AreaRequests"
import { useGetAllConsultorios } from "../../hooks/ConsultorioRequests"
import { EditConsultorioForm } from "../area_consultorio/ConsultorioEdit"

export const EditModal = forwardRef<HTMLDialogElement, {entity: Entities, handleDialog: () => void}>(
  ({entity, handleDialog}, ref) => {
    const [fieldsValues, setFieldsValues] = useState<Entities>(entity)
    const entityType = getEntityType(entity)

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.currentTarget.value
      const field = e.currentTarget.name

      if (Object.keys(entity).includes(field)) {
        setFieldsValues(prev => ({
          ...prev,
          [field]: newValue
        }))
      } else throw new Error("Se está intentando acceder a una propiedad de la entidad que no existe.")
    }

    const formComponent: Record<ReturnType<typeof getEntityType>, ReactNode> = {
      paciente: <EditPacienteForm fieldsValuesState={fieldsValues as Paciente} handleOnChange={handleOnChange}/>,
      profesional: <EditProfesionalForm fieldsValuesState={fieldsValues as ProfesionalMed} handleOnChange={handleOnChange}/>,
      consultorio: <EditConsultorioForm fieldsValuesState={fieldsValues as Consultorio} handleOnChange={handleOnChange}/>,
      area: <EditAreaForm fieldsValuesState={fieldsValues as AreaProfesional} handleOnChange={handleOnChange}/>,
      turno: <p></p>
    }

    return (
      <dialog ref={ref}>
        <section>
          <h2>Editar {entityType}</h2>
          {formComponent[entityType]}
        </section>
        <button onClick={handleDialog}>✖️</button>
      </dialog>
    )
  }
)


function EditPacienteForm(props : {fieldsValuesState: Paciente, handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
  const {fieldsValuesState, handleOnChange} = props
  // const fieldsNames: (keyof Paciente)[] = [...fieldsValuesState]

  return (
    <form>
      <input type="hidden" name="id" value={fieldsValuesState.id} />
      <label>Nombre completo: <input type="text" name="nombreCompleto" value={fieldsValuesState.nombreCompleto} onChange={(e) => handleOnChange(e)}/></label>
      <label>DNI: <input type="text" name="dni" value={fieldsValuesState.dni} onChange={(e) => handleOnChange(e)}/></label>
      <label>Número de telefono: <input type="number" name="numeroContacto" value={fieldsValuesState.numeroContacto} onChange={(e) => handleOnChange(e)}/></label>
      <label>Obra social: <input type="text" name="obraSocial" value={fieldsValuesState.obraSocial} onChange={(e) => handleOnChange(e)}/></label>
    </form>
  )
}


function EditProfesionalForm(props : {fieldsValuesState: ProfesionalMed, handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
  const {fieldsValuesState, handleOnChange} = props

  const [selectedAreas, setSelectedAreas] = useState<string[]>(fieldsValuesState.areas)
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
    <form>
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
            return <option key={numero} value={numero}>{numero}</option>
          })}
        </select>
      </label>
      <div className="grid allWidth">Áreas de ocupación:
        <div className="grid autoColumns checkboxContainer">
          {areas?.map(area => area.activa && (
            <div key={area.id}><label><input type="checkbox" name={area.nombre} onChange={handleOnChangeAreasInput} />{area.nombre}</label></div>
          ))}
        </div>
      </div>
      <label className="moreInfoLabel">Horarios: 
        <input type="text" name="horarios" value={fieldsValuesState.horarios} onChange={(e) => handleOnChange(e)}/>
      </label>
      <div className="moreInfo">
        <p>Los horarios deben tener el siguiente formato: "hora":"minutos" (formato de 24 horas).</p>
        <p>Se puede indicar un rango de horarios usando el "-". Ej: 08:00-12:30. Para separar horarios use ", " (coma seguida de un espacio).</p>
        <p>Ej: "08:00-12:30, 16:00-18:30, 20:00" significa que trabaja de 8 a 12:30, de 16 a 18:30, y a las 20hs.</p>
      </div>
    </form>
  )
}


function EditAreaForm(props : {fieldsValuesState: AreaProfesional, handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
  const {fieldsValuesState, handleOnChange} = props
  const [checkboxFieldsValues, setCheckboxFieldValues] = useState({active: fieldsValuesState.activa || false, needSchedule: fieldsValuesState.necesitaTurno})

  const handleOnChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>, field: keyof typeof checkboxFieldsValues) => {
    const newValue = e.currentTarget.checked

    setCheckboxFieldValues(prev => ({
      ...prev,
      [field]: newValue
    }))
  }

  return (
    <form>
      <input type="hidden" name="id" value={fieldsValuesState.id} />
      <label>Número de consultorio
        <input type="text" name="nombre" value={fieldsValuesState.nombre} onChange={(e) => handleOnChange(e)}/>
        <input type="number" name="nombre" value={fieldsValuesState.nombre} onChange={(e) => handleOnChange(e)}/>
        <label>Desmarque la casilla si el área es por orden de llegada
          <input type="checkbox" name="necesitaTurno" checked={checkboxFieldsValues.needSchedule} onChange={(e) => handleOnChangeCheckbox(e, "needSchedule")}/>
        </label>
        <label>Área en actividad
          <input type="checkbox" name="activa" checked={checkboxFieldsValues.active} onChange={(e) => handleOnChangeCheckbox(e, "active")}/>
        </label>
      </label>
    </form>
  )
}