import { useSelectedCheckboxesObject } from "../../hooks/SelectChecboxes"
import { AreaProfesional, Entities, Turno } from "../../types/Entities"
import { FatherCheckboxes } from "../../types/Others"
import { SelectItemCheckbox } from "./ListSelector"

import { useRef, useState } from "react"
import { useChangeAreaActiveStatus } from "../../requests/AreaRequests"
import { useChangeTurnActiveStatus, useGetSearchedTurns } from "../../requests/TurnoRequests"
import { EditModal } from "./EditModal"
import { CheckCheckIcon, CheckCrossIcon, CheckIcon, PencilIcon } from "./Icons"
import Message from "./Message"

export function TableOptions(props : 
  {
    entityType: FatherCheckboxes, selectedCheckboxesState: ReturnType<typeof useSelectedCheckboxesObject>, 
    children: Entities[], selectedEntities: Record<FatherCheckboxes, Entities[]>, 
    selectedEntitiesFunction: (params : {entityType: FatherCheckboxes, inputChecked: boolean, entity?: Entities, entities?: Entities[]}) => void,
    deactivateButton?: boolean, alternativeDeactivateFunction?: (...params: unknown[]) => void
  }
) {
  const {entityType, selectedCheckboxesState, children, selectedEntities, selectedEntitiesFunction, deactivateButton, alternativeDeactivateFunction} = props
  const editDialogRef = useRef<HTMLDialogElement>(null)
  const deactivateDialogRef = useRef<HTMLDialogElement>(null)
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

  const handleDeactivate = () => {
    if (!deactivateDialogRef.current) return
    if (deactivateDialogRef.current.open) {
      deactivateDialogRef.current.close()
    } else {
      deactivateDialogRef.current.showModal()
    }
  }
  
  return (
    <nav className="tableNavbar">
      <div className="checkbox">
        <SelectItemCheckbox 
          selectedCheckboxesObject={selectedCheckboxesState} 
          fatherName={entityType} fatherOrChild="father" 
          childElements={children} markSelectedEntitiesFunction={selectedEntitiesFunction} 
        />
      </div>
      <button disabled={selectedEntities[entityType].length != 1} className="iconButton" onClick={handleEditDialog}>
        <PencilIcon />Editar
      </button>
      {selectedEntities[entityType].length == 1 &&
        <EditModal entity={selectedEntities[entityType][0]} ref={editDialogRef} handleDialog={handleEditDialog} isOpen={isOpen}/>
      }
      {deactivateButton && 
      <button disabled={selectedEntities[entityType].length != 1} className="iconButton" onClick={alternativeDeactivateFunction || handleDeactivate}>
        {selectedEntities[entityType].length != 1 ? <CheckIcon />
          : (selectedEntities[entityType][0] as Turno | AreaProfesional).active ? <CheckCheckIcon /> : <CheckCrossIcon />
        }
        Cambiar estado de alta
      </button>}
      {deactivateButton && selectedEntities[entityType].length == 1 && 
        (entityType == "areas" ?
          <dialog ref={deactivateDialogRef}>
            <DialogAreaContent areaDto={selectedEntities[entityType][0] as AreaProfesional} closeFn={() => {
              if (deactivateDialogRef.current) deactivateDialogRef.current.close()
            }}/>
          </dialog>
        : entityType == "turnos" &&
          <dialog ref={deactivateDialogRef}>
            <DialogTurnContent turn={selectedEntities[entityType][0] as Turno} closeFn={() => {
              if (deactivateDialogRef.current) deactivateDialogRef.current.close()
            }} />
          </dialog>
        )
      }
      {/* <button disabled={selectedEntities[entityType].length == 0} className="iconButton">
        <TrashCanIcon />Eliminar
      </button> */}
    </nav>
  )
}

function DialogAreaContent({areaDto, closeFn} : {areaDto: AreaProfesional, closeFn: () => void}) {
  const [turnsActionForDeactivate, setTurnsAction] = useState<boolean>(false)
  const turnsInArea = useGetSearchedTurns({searchName: "", areaName: areaDto.nombre, estadoPago: "", date: ""})?.results as Turno[]
  const {handleChangeActiveStatus, getResponse} = useChangeAreaActiveStatus()

  return (<>
    {areaDto.active ? <h3>Dar de baja</h3> : <h3>Dar de alta</h3>}
    {getResponse?.message && <Message messageObject={getResponse.message}/>}
    Los siguientes turnos se podrían ver afectados si cambia el estado de alta de esta entidad:
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
    <form onSubmit={e => handleChangeActiveStatus(e, areaDto, turnsActionForDeactivate)}>
      ¿Desea cambiar su estado también?
      <div>
        <button type="submit" onClick={() => {setTurnsAction(true)}}>Sí</button>
        <button type="submit" onClick={() => {setTurnsAction(false)}}>No</button>
        <button onClick={closeFn}>Cancelar</button>
      </div>
    </form>
    </>
  )
}

function DialogTurnContent({turn, closeFn} : {turn: Turno, closeFn: () => void}) {
  const {response, handleDeactivate} = useChangeTurnActiveStatus()

  return (<>
    {turn.active ? <h3>Dar de baja</h3> : <h3>Dar de alta</h3>}
    {response?.message && <Message messageObject={response.message}/>}
    <form onSubmit={(e) => handleDeactivate(e, turn)}>
      ¿Desea confirmar esta acción?
      <button type="submit">Sí</button>
      <button onClick={closeFn}>No</button>
    </form>
    </>
  )
}