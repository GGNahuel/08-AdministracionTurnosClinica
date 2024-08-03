import { AreaProfesional, Consultorio, Entities, Paciente, ProfesionalMed, Turno } from "../types/Entities"
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
    const {fecha, horario, consultorio } = entity as Turno
    return `${fecha}_${horario}_${consultorio}` 
  } else
  if (type == "paciente") {
    const {dni} = entity as Paciente
    return dni
  } else
  if (type == "profesional") {
    const {dni} = entity as ProfesionalMed
    return dni
  } else
  if (type == "area") {
    return (entity as AreaProfesional).nombre
  } else {
    return String ((entity as Consultorio).numeroConsultorio)
  }
}