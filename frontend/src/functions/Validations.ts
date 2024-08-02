import { Entities } from "../types/Entities";

export function getEntityType(entity: Entities) {
  const keys = Object.keys(entity)
  if (keys.includes("fecha")) return "turno"
  if (keys.includes("nombreCompleto") && !keys.includes("numMatricula")) return "paciente"
  if (keys.includes("numMatricula")) return "profesional"
  if (keys.includes("necesitaTurno")) return "area"
  if (keys.includes("numeroConsultorio")) return "consultorio"

  throw new Error("La entidad no es de un tipo válido")
}