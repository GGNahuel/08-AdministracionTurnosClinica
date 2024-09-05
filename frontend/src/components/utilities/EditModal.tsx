import { forwardRef, ReactNode } from "react"
import { getEntityType } from "../../functions/Validations"
import { AreaProfesional, Consultorio, Entities, Paciente, ProfesionalMed, Turno } from "../../types/Entities"
import { EditAreaForm } from "../area_consultorio/AreaEdit"
import { EditConsultorioForm } from "../area_consultorio/ConsultorioEdit"
import { EditPacienteForm } from "../pacientes/PacienteEdit"
import { EditProfesionalForm } from "../profesionales/ProfesionalEdit"
import { EditTurnForm } from "../turnos/TurnEdit"

export const EditModal = forwardRef<HTMLDialogElement, {entity: Entities, handleDialog: () => void, isOpen: boolean}>(
  ({entity, handleDialog, isOpen}, ref) => {
    const entityType = getEntityType(entity)

    const formComponent: Record<ReturnType<typeof getEntityType>, ReactNode> = {
      paciente: <EditPacienteForm entity={entity as Paciente}/>,
      profesional: <EditProfesionalForm entity={entity as ProfesionalMed}/>,
      consultorio: <EditConsultorioForm entity={entity as Consultorio}/>,
      area: <EditAreaForm entity={entity as AreaProfesional}/>,
      turno: <EditTurnForm entity={entity as Turno}/>
    }

    return (
      <dialog ref={ref} className="editDialog">
        <section className="registerSection">
          <h2>Editar {entityType}</h2>
          {isOpen && formComponent[entityType]}
        </section>
        <button onClick={handleDialog} className="iconButton">×</button>
      </dialog>
    )
  }
)
