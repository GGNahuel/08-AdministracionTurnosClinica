import { forwardRef, ReactNode, useState } from "react"
import { getEntityType } from "../../functions/Validations"
import { AreaProfesional, Consultorio, Entities, Paciente, ProfesionalMed, Turno } from "../../types/Entities"
import { EditAreaForm } from "../area_consultorio/AreaEdit"
import { EditConsultorioForm } from "../area_consultorio/ConsultorioEdit"
import { EditPacienteForm } from "../pacientes/PacienteEdit"
import { EditProfesionalForm } from "../profesionales/ProfesionalEdit"
import { EditTurnForm } from "../turnos/TurnEdit"

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
      turno: <EditTurnForm fieldsValuesState={fieldsValues as Turno} handleOnChange={handleOnChange}/>
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
