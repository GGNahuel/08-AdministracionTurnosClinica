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

export function cutPascalCase(string: string) : string {
  const result: string[] = []
  string.split("").forEach((char, indx) => {
    if (indx > 0 && char == char.toUpperCase()) {
      result.push(" ")
    }
    result.push(indx == 0 ? char : char.toLowerCase())
  })

  return result.join("")
}

export function normaliceString(input: string): string {
  if (!input) return input

  let normalized = input.toLowerCase();
  normalized = normalized.normalize("NFD");
  normalized = normalized.replace(/[\u0300-\u036f]/g, "");

  return normalized;
}

export function generateSearchRoute(params: object): string {
  let result = ""
  const entries = Object.entries(params)
  const values = Object.values(params)

  if (values.some(value => value != "" && value)) {
    result += "?"
  
    entries.forEach((entrie, index) => {
      const [key, value] = entrie

      result += value && value != "" ? 
        index != 0 && entries[index - 1][1] != "" ?
          `&${key}=${value}` : `${key}=${value}`
        : ""
    })
  }

  return result
}
