import { RouteObject } from "react-router-dom";
import { routes } from "./NavigationRoutes"

import { DailyTurns } from "../components/turnos/DailyTurns";
import { TurnoCreacion } from "../components/turnos/TurnoCreacion";

import { PacienteListado } from "../components/pacientes/PacienteListado";
import { PacienteCreacion } from "../components/pacientes/PacienteCreacion";

import { ProfesionalListado } from "../components/profesionales/ProfesionalListado";
import { ProfesionalCreacion } from "../components/profesionales/ProfesionalCreacion";

import { AreaConsList } from "../components/area_consultorio/AreaConsultorioList";
import { AreaConsCreate } from "../components/area_consultorio/AreaConsultorioCreate";
import { SearchTurnos } from "../components/turnos/SearchTurnos";
import { LogInForm, RegisterForm } from "../components/users/LogAndRegister";

export const turnoRoutes : RouteObject[] = [
  {
    index: true,
    element: <DailyTurns/>,
    id: "turno_today"
  },
  {
    path: routes.turno.create,
    element: <TurnoCreacion/>,
    id: "turno_register"
  },
  {
    path: routes.turno.search,
    element: <SearchTurnos />,
    id: "turno_search"    
  }
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

export const AreaConsultorioRoutes : RouteObject[] = [
  {
    path: routes.area_consultorio.list,
    element: <AreaConsList />,
    id: "areaCons_list"
  },
  {
    path: routes.area_consultorio.create,
    element: <AreaConsCreate />,
    id: "areaCons_register"
  }
]

export const UsuarioRoutes: RouteObject[] = [
  {
    path: routes.usuario.login,
    element: <LogInForm />,
    id: "user_login"
  },
  {
    path: routes.usuario.signup,
    element: <RegisterForm />,
    id: "user_register"
  }
]