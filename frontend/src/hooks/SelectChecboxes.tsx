import { useState } from "react"
import { FatherCheckboxes } from "../types/Others"

/* ej selectedCheckboxes: 
{
  consultorios: {
    consultorio_1: true,
    consultorio_2: false
  },
  areas: {
    Odontología: true,
    ...
  }
}
*/
export function useSelectedCheckboxesObject() {
  const [selectedCheckboxes, setSeletedCheckboxes] = useState<Record<FatherCheckboxes, Record<string, boolean>>>({
    consultorios: {}, 
    areas: {}, 
    pacientes: {}, 
    turnos: {}, 
    profesionales: {} 
  })

  return {selectedCheckboxes, setSeletedCheckboxes}
}