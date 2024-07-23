import { RouteObject } from "react-router-dom";
import { PacienteCreacion } from "../components/pacientes/PacienteCreacion";
import { TurnoCreacion } from "../components/turnos/TurnoCreacion";
import { TurnoListado } from "../components/turnos/TurnoListado";
import { routes } from "./NavigationRoutes"
import { PacienteListado } from "../components/pacientes/PacienteListado";
import { ProfesionalListado } from "../components/profesionales/ProfesionalListado";
import { ProfesionalCreacion } from "../components/profesionales/ProfesionalCreacion";

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
  },
  {
    path: routes.paciente.search,
    element: <PacienteListado />,
    id: "paciente_search"
  }
]

export const profesionalRoutes : RouteObject[] = [
  {
    path: routes.profesional.register,
    element: <ProfesionalCreacion />,
    id: "profesional_register"
  },
  {
    path: routes.profesional.search,
    element: <ProfesionalListado />,
    id: "profesional_search"
  }
]