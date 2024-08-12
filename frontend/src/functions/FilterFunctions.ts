import { AreaProfesional, ProfesionalMed, Turno } from "../types/Entities";
import { Horario } from "../classes/Horario";

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

export function getSchedulesInAllAreas(profesionals: ProfesionalMed[], areas: AreaProfesional[]) {
  if (!areas || !profesionals) return null
  if (profesionals.length == 0) return null

  const returnedObject: Record<string, string[]> = {}

  for(let areaIndx = 0; areaIndx < areas.length; areaIndx++) {
    const nombreArea = areas[areaIndx].nombre
    const profesionalsInArea: ProfesionalMed[] = profesionals.filter((profesional) => profesional.areas.includes(nombreArea))

    const listaHorarios = profesionalsInArea.map(profesional => profesional.horarios || []).flat()
    //agregar corrección en el caso que haya horarios duplicados
  
    const formattedHorarios: [string] = [Horario.getScheduleBlocksFromStrings(listaHorarios)]

    returnedObject[nombreArea] = areas[areaIndx].necesitaTurno ? listaHorarios : formattedHorarios
  }

  return returnedObject
}

export function getSchedulesInSpecificArea(area: AreaProfesional, profesionalsInArea: ProfesionalMed[]) {
  const listaHorarios = profesionalsInArea.map(profesional => profesional.horarios || []).flat()
  //agregar corrección en el caso que haya horarios duplicados
  
  const formattedHorarios: [string] = [Horario.getScheduleBlocksFromStrings(listaHorarios)]

  return area.necesitaTurno ? listaHorarios : formattedHorarios
}