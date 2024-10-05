import { meses } from "../constants/Others";
import { DATE_FORMAT, DATE_INPUT_FORMAT } from "../constants/VariablesEntorno";

export class DateExtension extends Date {
  // acá irían los métodos DateFunctions y TO_DO: ver los cambios de cómo se implementarían

  formatDate() {
    const day = String(this.getDate()).padStart(2, '0')
    const month = String(this.getMonth() + 1).padStart(2, '0')
    const year = this.getFullYear()
  
    return `${day}/${month}/${year}`;
  }
  
  static getMonthName(monthNumber: number) {
    if (monthNumber < 0) throw new Error("El número de mes ingresado no es válido")
    
    const actualMonthNumber = monthNumber <= 11 ? monthNumber : monthNumber - 12
  
    return meses[actualMonthNumber]
  }
  
  convertStringToDate(fecha: string) {
    if (!DATE_FORMAT.test(fecha)) return null
  
    const [day, month, year] = fecha.split("/").map(string => Number(string))
  
    return new Date(year, month - 1, day)
  }
  
  generateArrayOfNextDays(actualMonth: number, actualYear: number, actualDay?: number) {
    const returnedArray: number[] = []
  
    const newMonthNumber = (actualMonth + 1) <= 11 ? actualMonth + 1 : actualMonth - 12
    const monthLength = (new Date(actualYear, newMonthNumber, 0)).getDate()
  
    for (let dayNumber = actualDay || 1; dayNumber <= monthLength; dayNumber++) {
      returnedArray.push(dayNumber)
    }
  
    return returnedArray
  }
  
  dateInputValueToDBFormat(date: string) {
    if (!DATE_INPUT_FORMAT.test(date)) throw new Error("La fecha se recibió desde el input con un formato desconocido: " + date)
  
    const [year, month, day] = date.split("-")
  
    return `${day}/${month}/${year}`
  }
  
  dateToInputFormat(date: string) {
    if (!DATE_FORMAT.test(date)) throw new Error("La fecha se recibió desde el calendario con un formato desconocido: " + date)
  
    const [day, month, year] = date.split("/")
  
    return `${year}-${month}-${day}`
  }
}