import { AreaProfesional, ProfesionalMed, Turno } from "../types/Entities";

export function filterTurnosByAreas(areasExistentes : AreaProfesional[], listadoDeTurnos : Turno[]) {
  if (!areasExistentes || !listadoDeTurnos) return null
  if (areasExistentes.length == 0 || listadoDeTurnos.length == 0) return null
  
  const returnedObject : Record<string, Turno[]> = {}
  
  for(let areaIndx = 0; areaIndx < areasExistentes.length; areaIndx ++) {
    const nombreArea = areasExistentes[areaIndx].nombre
    returnedObject[nombreArea] = listadoDeTurnos.filter((turno) => turno.areaProfesional == nombreArea)
  }

  return returnedObject
}

export function filterProfesionalsByArea(areaFiltro: string, listadoProfesionales: ProfesionalMed[], listadoAreas?: AreaProfesional[]) {
  if (!areaFiltro || !listadoProfesionales) return null
  if (listadoProfesionales.length == 0) return null
  if (!listadoAreas?.some(area => area.nombre == areaFiltro)) return null

  const returnedArray: ProfesionalMed[] = listadoProfesionales.filter((profesional) => profesional.areas.includes(areaFiltro))

  return returnedArray
}