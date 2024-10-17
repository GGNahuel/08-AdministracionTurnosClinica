import { useSelectedCheckboxesObject } from "../../hooks/SelectChecboxes"
import { AreaProfesional, Entities, Turno } from "../../types/Entities"
import { FatherCheckboxes } from "../../types/Others"
import { SelectItemCheckbox } from "./ListSelector"

import { useRef, useState } from "react"
import { PencilIcon, TrashCanIcon } from "./Icons"
import { EditModal } from "./EditModal"
import { useGetSearchedTurns } from "../../requests/TurnoRequests"
import { useChangeAreaActiveStatus } from "../../requests/AreaRequests"

export function TableOptions(props : 
  {
    entityType: FatherCheckboxes, selectedCheckboxesState: ReturnType<typeof useSelectedCheckboxesObject>, 
    childs: Entities[], selectedEntities: Record<FatherCheckboxes, Entities[]>, 
    selectedEntitiesFunction: (params : {entityType: FatherCheckboxes, inputChecked: boolean, entity?: Entities, entities?: Entities[]}) => void,
    desactivateButton?: boolean
  }
) {
  const {entityType, selectedCheckboxesState, childs, selectedEntities, selectedEntitiesFunction, desactivateButton} = props
  const editDialogRef = useRef<HTMLDialogElement>(null)
  const desactivateDialogRef = useRef<HTMLDialogElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleEditDialog = () => {
    if (!editDialogRef.current) return
    if (editDialogRef.current.open) {
      editDialogRef.current.close()
    } else {
      editDialogRef.current.showModal()
    }
    setIsOpen(editDialogRef.current.open)
  }

  const handleDesactivate = () => {
    if (!desactivateDialogRef.current) return
    if (desactivateDialogRef.current.open) {
      desactivateDialogRef.current.close()
    } else {
      desactivateDialogRef.current.showModal()
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
      <button disabled={selectedEntities[entityType].length != 1} className="iconButton" onClick={handleEditDialog}>
        <PencilIcon />Editar
      </button>
      {selectedEntities[entityType].length == 1 &&
        <EditModal entity={selectedEntities[entityType][0]} ref={editDialogRef} handleDialog={handleEditDialog} isOpen={isOpen}/>
      }
      {desactivateButton && 
      <button disabled={selectedEntities[entityType].length != 1} className="iconButton" onClick={handleDesactivate}>
        <TrashCanIcon />Dar de baja
      </button>}
      {desactivateButton && selectedEntities[entityType].length == 1 &&
        <dialog ref={desactivateDialogRef}>
          Los siguientes turnos se verán afectados si da de baja esta entidad:
          {entityType == "areas" && <DialogAreaContent areaDto={(selectedEntities[entityType][0] as AreaProfesional)} closeFn={() => {
            if (desactivateDialogRef.current) desactivateDialogRef.current.close()
          }}/>}
        </dialog>
      }
      <button disabled={selectedEntities[entityType].length == 0} className="iconButton">
        <TrashCanIcon />Eliminar
      </button>
    </nav>
  )
}

function DialogAreaContent({areaDto, closeFn} : {areaDto: AreaProfesional, closeFn: () => void}) {
  const [turnsActionForDesactivate, setTurnsAction] = useState<boolean>(false)
  const turnsInArea = useGetSearchedTurns({searchName: "", areaName: areaDto.nombre, estadoPago: "", date: ""})?.results as Turno[]
  const {handleChangeActiveStatus} = useChangeAreaActiveStatus()

  return (<>
    <table className="table">
      <thead><tr>
        <th>Fecha</th>
        <th>Horario</th>
        <th>Paciente</th>
        <th>Profesional</th>
        <th>Estado de pago</th>
      </tr></thead>
      <tbody>
        {turnsInArea?.map(turn => (
          <tr key={turn.id}>
            <td>{turn.fecha}</td>
            <td>{turn.horario}</td>
            <td>{turn.pacienteDto.nombreCompleto}</td>
            <td>{turn.profesionalDto.nombreCompleto}</td>
            <td>{turn.estadoPago}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <form onSubmit={e => handleChangeActiveStatus(e, areaDto, turnsActionForDesactivate)}>
      ¿Desea darlos de baja también?
      <div>
        <button type="submit" onClick={() => {setTurnsAction(true)}}>Sí</button>
        <button type="submit" onClick={() => {setTurnsAction(false)}}>No</button>
        <button onClick={closeFn}>Cancelar</button>
      </div>
    </form>
    </>
  )
}