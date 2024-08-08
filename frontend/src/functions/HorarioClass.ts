import { SCHEDULE_BLOCK_FORMAT, SCHEDULE_FORMAT } from "../constants/VariablesEntorno"
import { horas, minutos } from "../types/Others"

const SCHEDULE_BLOCK_SEPARATOR = ", "
const SCHEDULE_BLOCK_FROM_TO = "-"

export class Horario {
  hora: horas
  minutos: minutos

  constructor(hora: horas, minutos: minutos) {
    Horario.checkHoraIsValid(hora)
    Horario.checkMinutosIsValid(minutos)

    this.hora = hora
    this.minutos = minutos
  }

  private static checkHoraIsValid(hora: number) {
    if (!(hora >= 0 && hora <= 23))
      throw new Error("El campo ingresado como hora no es válido")
  }

  private static checkMinutosIsValid(minutos: number) {
    if (minutos != 0 && minutos != 15 && minutos != 30 && minutos != 45)
      throw new Error("El campo ingresado como minutos no es válido")
  }

  toFormattedString() : string {
    return `${String(this.hora).padStart(2, '0')}:${String(this.minutos).padStart(2, '0')}`
  }

  toDate() : Date {
    const dateHorario = new Date()
    dateHorario.setHours(this.hora)
    dateHorario.setMinutes(this.minutos)

    return dateHorario
  }

  getDifferenceInMinutes(horario2 : Horario) : number {
    const hourDifference = this.hora - horario2.hora
    const minutesDifference = this.minutos - horario2.minutos

    return minutesDifference + (60 * hourDifference)
  }

  newHorarioByMinutes(minutes : minutos) : Horario {
    /* 
    18:10 - 
    */
    Horario.checkMinutosIsValid(minutes)

    const totalMinutes = this.minutos + minutes
    const hoursDifference = Math.floor(totalMinutes / 60)

    const newHour = this.hora + hoursDifference as horas
    const newMinutes = totalMinutes - (60 * hoursDifference) as minutos

    return new Horario(newHour, newMinutes)
  }

  static parse(horarioString : string) : Horario {
    if (!SCHEDULE_FORMAT.test(horarioString)) throw new Error("No se puede transformar el string debido a que no cumple con el formato")

    const horaFromString = Number.parseInt(horarioString.slice(0,2)) as horas
    const minutosFromString = Number.parseInt(horarioString.slice(3)) as minutos

    Horario.checkHoraIsValid(horaFromString)
    Horario.checkMinutosIsValid(minutosFromString)

    const hora : horas =  horaFromString
    const minutos : minutos = minutosFromString

    return new Horario(hora, minutos)
  }

  static getScheduleBlocksFromStrings(horarios : string[]) : string {
    // return example: "08:30-12:00, 16:00-19:30"
    const parsedArray = horarios.map(horarioString => Horario.parse(horarioString))
    let retorno = ""
    for(let index=0; index < parsedArray.length; index++) {
      const horario = parsedArray[index]
      
      if (index == 0) {
        retorno = horario.toFormattedString()
        continue
      }
      
      const previousHorario = parsedArray[index-1]
      const differenceInMillisecondsWithPrevious = horario.toDate().getTime() - previousHorario.toDate().getTime()
      const differenceInMinutesWithPrevious = (differenceInMillisecondsWithPrevious / 1000) / 60
      
      if (differenceInMinutesWithPrevious >= 60) {
        retorno += SCHEDULE_BLOCK_SEPARATOR + horario.toFormattedString()
        continue
      }

      if (index != parsedArray.length-1) {
        const nextHorario = parsedArray[index + 1]
        const differenceInMinutesWithNext = ((nextHorario.toDate().getTime() - horario.toDate().getTime()) / 1000) / 60

        if (differenceInMinutesWithNext >= 60) {
          retorno += SCHEDULE_BLOCK_FROM_TO + horario.toFormattedString()
        }
      } else {
        retorno += SCHEDULE_BLOCK_FROM_TO + horario.toFormattedString()
      }
    }

    return retorno
  }

  static getStringsFromScheduleBlock(scheduleBlocks: string) : string[] {
    if (!SCHEDULE_BLOCK_FORMAT.test(scheduleBlocks)) throw new Error("El block enviado no es válido")

    const retorno : string[] = []
    const timeIntervals = scheduleBlocks.split(SCHEDULE_BLOCK_SEPARATOR)

    timeIntervals.forEach(interval => {
      console.log(interval)

      const rangeOfHorarios : [string, string] = interval.split(SCHEDULE_BLOCK_FROM_TO) as [string, string]
      if (rangeOfHorarios.length > 1) {
        if (rangeOfHorarios.length > 2) throw new Error("No puede haber un rango anexado a otro. Ej: '08:00-11:00-12:00' es inválido")

        const start = Horario.parse(rangeOfHorarios[0])
        const finish = Horario.parse(rangeOfHorarios[1])
        const iterations = Math.floor(finish.getDifferenceInMinutes(start) / 30)

        for (let i = 0; i < iterations; i ++) {
          if (i == 0) retorno.push(start.toFormattedString())

          const lastHorario = Horario.parse(retorno[retorno.length-1])
          retorno.push(lastHorario.newHorarioByMinutes(30).toFormattedString())
        }
      } else {
        retorno.push(interval)
      }
    })
    
    return retorno
  }
}