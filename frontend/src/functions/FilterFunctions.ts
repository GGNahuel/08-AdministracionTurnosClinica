import { AreaProfesional, Turno } from "../types/Entities";

export function FilterTurnosByArea(areasExistentes : AreaProfesional[], listadoDeTurnos : Turno[]) {
  if (!areasExistentes || !listadoDeTurnos) return null
  if (areasExistentes.length == 0 || listadoDeTurnos.length == 0) return null
  
  const returnedObject : Record<string, Turno[]> = {}
  
  for(let areaIndx = 0; areaIndx < areasExistentes.length; areaIndx ++) {
    const nombreArea = areasExistentes[areaIndx].nombre
    returnedObject[nombreArea] = listadoDeTurnos.filter((turno) => turno.areaProfesional == nombreArea)
  }

  return returnedObject
}

