import { useSelectedCheckboxesObject } from "../../hooks/SelectChecboxes"
import { Entities, Paciente } from "../../types/Entities"
import { FatherCheckboxes } from "../../types/Others"
import { SelectItemCheckbox } from "./ListSelector"

import editIcon from "../../assets/pencilSvg.svg"
import deleteIcon from "../../assets/trashCanSvg.svg"
import React, { forwardRef, useRef, useState } from "react"
import { getEntityType } from "../../functions/Validations"

export function TableOptions(props : 
  {
    entityType: FatherCheckboxes, selectedCheckboxesState: ReturnType<typeof useSelectedCheckboxesObject>, 
    childs: Entities[], selectedEntities: Record<FatherCheckboxes, Entities[]>, 
    selectedEntitiesFunction: (params : {entityType: FatherCheckboxes, inputChecked: boolean, entity?: Entities, entities?: Entities[]}) => void,
    desactivateButton?: boolean
  }
) {
  const {entityType, selectedCheckboxesState, childs, selectedEntities, selectedEntitiesFunction, desactivateButton} = props
  const dialogRef = useRef<HTMLDialogElement>(null)

  const handleDialog = () => {
    if (!dialogRef.current) return
    if (dialogRef.current.open) {
      dialogRef.current.close()
    } else {
      dialogRef.current.showModal()
    }
  }
  
  return (
    <nav className="tableNavbar">
      <div className="checkbox">
        <SelectItemCheckbox 
          selectedCheckboxesObject={selectedCheckboxesState} 
          fatherName={entityType} fatherOrChild="father" 
          childElements={childs} markSelectedEntitiesFunction={selectedEntitiesFunction} 
        />
      </div>
      <button disabled={selectedEntities[entityType].length != 1} className="iconButton" onClick={handleDialog}>
        <img src={editIcon} className="icon"/>Editar
      </button>
      {selectedEntities[entityType].length == 1 && <EditModal entity={selectedEntities[entityType][0]} ref={dialogRef}/>}
      {desactivateButton && 
      <button disabled={selectedEntities[entityType].length == 0} className="iconButton">
        <img src={deleteIcon} className="icon"/>Dar de baja
      </button>}
      <button disabled={selectedEntities[entityType].length == 0} className="iconButton">
        <img src={deleteIcon} className="icon"/>Eliminar
      </button>
    </nav>
  )
}

export const EditModal = forwardRef<HTMLDialogElement, {entity: Entities}>(
  ({entity}, ref) => {
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

    return (
      <dialog ref={ref}>
        <section>
          <h2>Editar {entityType}</h2>
          <form>
            <input type="hidden" value={fieldsValues.id} />
            <label>Nombre completo: <input type="text" name="nombreCompleto" value={(fieldsValues as Paciente).nombreCompleto} onChange={(e) => handleOnChange(e)}/></label>
            <label>DNI: <input type="text" name="dni" value={(fieldsValues as Paciente).dni} onChange={(e) => handleOnChange(e)}/></label>
            <label>Número de telefono: <input type="number" name="numeroContacto" value={(fieldsValues as Paciente).numeroContacto} onChange={(e) => handleOnChange(e)}/></label>
            <label>Obra social: <input type="text" name="obraSocial" value={(fieldsValues as Paciente).obraSocial} onChange={(e) => handleOnChange(e)}/></label>
          </form>
        </section>
      </dialog>
    )
  }
)

/* para edicion:
al hacer click primero se deberá abrir un modal, 
  este modal será un componente que recibirá por parametro una entidad.

Tendrá un formulario con los campos que pueden ser editados, y estaran pre-completados con los datos de la entidad que
  que se le pasó como prop al componente.

El modal se puede minimizar (solo puede haber un model de edición abierto)
El formulario de dentro llama a la petición de la api que corresponda a la edición a travez del submit
*/