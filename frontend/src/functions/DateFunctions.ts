import { meses } from "../constants/Others";
import { DATE_FORMAT, DATE_INPUT_FORMAT } from "../constants/VariablesEntorno";

export function formatDate(fecha : Date) {
  const day = String(fecha.getDate()).padStart(2, '0')
  const month = String(fecha.getMonth() + 1).padStart(2, '0')
  const year = fecha.getFullYear()

  return `${day}/${month}/${year}`;
}

export function getMonthName(monthNumber: number) {
  if (monthNumber < 0) throw new Error("El número de mes ingresado no es válido")
  
  const actualMonthNumber = monthNumber <= 11 ? monthNumber : monthNumber - 12

  return meses[actualMonthNumber]
}

export function convertStringToDate(fecha: string) {
  if (!DATE_FORMAT.test(fecha)) return null

  const [day, month, year] = fecha.split("/").map(string => Number(string))

  return new Date(year, month - 1, day)
}

export function generateArrayOfNextDays(actualMonth: number, actualYear: number, actualDay?: number) {
  const returnedArray: number[] = []

  const newMonthNumber = (actualMonth + 1) <= 11 ? actualMonth + 1 : actualMonth - 12
  const monthLength = (new Date(actualYear, newMonthNumber, 0)).getDate()

  for (let dayNumber = actualDay || 1; dayNumber <= monthLength; dayNumber++) {
    returnedArray.push(dayNumber)
  }

  return returnedArray
}

export function dateInputValueToDBFormat(date: string) {
  if (!DATE_INPUT_FORMAT.test(date)) return ""

  const [year, month, day] = date.split("-")

  return `${day}/${month}/${year}`
}

export function dateToInputFormat(date: string) {
  if (!DATE_FORMAT.test(date)) throw new Error("La fecha se recibió desde el calendario con un formato desconocido: " + date)

  const [day, month, year] = date.split("/")

  return `${year}-${month}-${day}`
}