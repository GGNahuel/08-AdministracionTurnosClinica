import { useState } from "react"
import { concatArrays } from "../functions/Utilities"
import { Entities } from "../types/Entities"
import { FatherCheckboxes } from "../types/Others"
import { SelectItemCheckbox } from "../components/utilities/ListSelector"
import { useSelectedCheckboxesObject } from "./SelectChecboxes"

export function useTableOptions() {
  const [selectedEntities, setSelectedEntities] = useState<Record<FatherCheckboxes, Entities[]>>({
    turnos: [],
    pacientes: [],
    profesionales: [],
    consultorios: [],
    areas: []
  })

  const selectedEntitiesFunction = (params : {entityType: FatherCheckboxes, inputChecked: boolean, entity?: Entities, entities?: Entities[]}) => {
    const {entityType, inputChecked, entity, entities} = params

    if ((entity == undefined && entities == undefined) || (entity != undefined && entities != undefined)) 
      throw new Error("La función debe recibir o una entidad o una lista de entidades")

    let updatedEntities: Entities[] = []

    if (inputChecked) {
      if (entity != undefined) {
        const temporalArray: Entities[] = []
        temporalArray.push(entity)
        updatedEntities = concatArrays(selectedEntities[entityType], temporalArray) as Entities[]
      } else if (entities != undefined) {
        entities.forEach(entitySelected => {
          updatedEntities.push(entitySelected)
        })
      }
    } else {
      updatedEntities = entity != undefined ? selectedEntities[entityType].filter(entitySelected => entitySelected.id != entity.id) : []
    }

    setSelectedEntities(prev => ({
        ...prev,
        [entityType]: updatedEntities 
      })
    )
  }

  const component = (props : {entityType: FatherCheckboxes, selectedCheckboxesState: ReturnType<typeof useSelectedCheckboxesObject>, childs: Entities[]}) => {
    const {entityType, selectedCheckboxesState, childs} = props
    
    return (
      <nav>
        <div className="checkbox">
          <SelectItemCheckbox 
            selectedCheckboxesObject={selectedCheckboxesState} 
            fatherName={entityType} fatherOrChild="father" 
            childElements={childs} markSelectedEntitiesFunction={selectedEntitiesFunction} 
          />
        </div>
        <button disabled={selectedEntities[entityType].length != 1}>Editar</button>
        <button disabled={selectedEntities[entityType].length == 0}>Dar de baja</button>
        <button disabled={selectedEntities[entityType].length == 0}>Eliminar</button>
      </nav>
    )
  }

  return {component, selectedEntitiesFunction}
}