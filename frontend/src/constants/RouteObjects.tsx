import { RouteObject } from "react-router-dom";
import { PacienteCreacion } from "../components/pacientes/PacienteCreacion";
import { TurnoCreacion } from "../components/turnos/TurnoCreacion";
import { TurnoListado } from "../components/turnos/TurnoListado";
import { routes } from "./NavigationRoutes"

export const turnoRoutes : RouteObject[] = [
  {
    index: true,
    element: <TurnoListado/>,
    id: "turno_today"
  },
  {
    path: routes.turno.create,
    element: <TurnoCreacion/>,
    id: "turno_register"
  },
]

export const pacienteRoutes : RouteObject[] = [
  {
    path: routes.paciente.register,
    element: <PacienteCreacion/>,
    id: "paciente_register"
  }
]