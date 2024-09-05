import { useSelectedCheckboxesObject } from "../../hooks/SelectChecboxes"
import { Entities } from "../../types/Entities"
import { FatherCheckboxes } from "../../types/Others"
import { SelectItemCheckbox } from "./ListSelector"

import { useRef, useState } from "react"
import editIcon from "../../assets/pencilSvg.svg"
import deleteIcon from "../../assets/trashCanSvg.svg"
import { EditModal } from "./EditModal"

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
  const [isOpen, setIsOpen] = useState(false)

  const handleDialog = () => {
    if (!dialogRef.current) return
    if (dialogRef.current.open) {
      dialogRef.current.close()
    } else {
      dialogRef.current.showModal()
    }
    setIsOpen(dialogRef.current.open)
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
      {selectedEntities[entityType].length == 1 &&
        <EditModal entity={selectedEntities[entityType][0]} ref={dialogRef} handleDialog={handleDialog} isOpen={isOpen}/>
      }
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
