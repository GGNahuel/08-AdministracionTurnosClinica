import { meses } from "../constants/Others";

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
