import { meses } from "../constants/Others";
import { DATE_FORMAT } from "../constants/VariablesEntorno";

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

export function getMaxDaysOfMonth(month: number, year: number) {
  const actualMonthNumber = (month + 1) <= 11 ? month + 1 : month - 12

  return (new Date(year, actualMonthNumber, 0)).getDate()
}