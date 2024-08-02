import { Entities, Turno } from "../types/Entities"
import { getEntityType } from "./Validations"

export function concatArrays(...arrays : unknown[][] ) : unknown[] {
  let returnedArray : unknown[] = []
  for (let index = 0; index < arrays.length; index++) {
    returnedArray = returnedArray.concat(arrays[index])
  }
  return returnedArray
}

export function selectNamingAttributeFromEntity(entity: Entities) {
  const type = getEntityType(entity)

  if (type == "turno") {
    const {fecha} = entity as Turno
    const {horario} = entity as Turno
    return `${fecha}`
  }
}