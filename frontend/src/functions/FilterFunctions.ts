import { AreaProfesional, ProfesionalMed, Turno } from "../types/Entities";
import { Horario } from "../classes/Horario";

export function filterTurnosByAreas(areasExistentes : AreaProfesional[], listadoDeTurnos : Turno[]) {
  if (!areasExistentes || !listadoDeTurnos) throw new Error("Los campos de la función de filtrado de turnos no pueden ser vacíos o nulos")
  if (areasExistentes.length == 0 || listadoDeTurnos.length == 0) throw new Error("Los campos de la función de filtrado de turnos no pueden ser vacíos o nulos")
  
  const returnedObject : Record<string, Turno[]> = {}
  
  for(let areaIndx = 0; areaIndx < areasExistentes.length; areaIndx ++) {
    const nombreArea = areasExistentes[areaIndx].nombre
    returnedObject[nombreArea] = listadoDeTurnos.filter((turno) => turno.areaProfesional == nombreArea)
  }

  return returnedObject
}

export function getSchedulesInAllAreas(profesionals: ProfesionalMed[], areas: AreaProfesional[]) {
  if (!areas || !profesionals) throw new Error("Los campos de la función para obtener los horarios de las areas no pueden ser nulos o vacíos")
  if (profesionals.length == 0) throw new Error("Los campos de la función para obtener los horarios de las areas no pueden ser nulos o vacíos")

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

export function getSchedulesInSpecificArea(areaName: string , profesionalsInArea: ProfesionalMed[], necesitaTurno: boolean) {
  if (!areaName || areaName == "") return null
  if (!profesionalsInArea) return null

  const listaHorarios = profesionalsInArea.map(profesional => profesional.horarios || []).flat()
  //agregar corrección en el caso que haya horarios duplicados
  
  const formattedHorarios: [string] = [Horario.getScheduleBlocksFromStrings(listaHorarios)]

  return necesitaTurno ? listaHorarios : formattedHorarios
}