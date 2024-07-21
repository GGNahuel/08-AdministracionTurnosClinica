import { RouteObject } from "react-router-dom";
import { PacienteCreacion } from "../components/pacientes/PacienteCreacion";
import { TurnoCreacion } from "../components/turnos/TurnoCreacion";
import { TurnoListado } from "../components/turnos/TurnoListado";
import { NavbarItemsType } from "../types/NavigationAndView";

export const turnoRoutes : RouteObject[] = [
  {
    index: true,
    element: TurnoListado(),
    id: "turno_today"
  },
  {
    path: "/turno/registrar",
    element: TurnoCreacion(),
    id: "turno_register"
  },
]

export const pacienteRoutes : RouteObject[] = [
  {
    path: "paciente/registrar",
    element: PacienteCreacion(),
    id: "paciente_register"
  }
]

export const view_NavComponent : NavbarItemsType = {
  turno: {
    summaryName: "Turnos",
    items: {
      today: "Ver turnos del día",
      create: "Crear",
      update: "Modificar",
      search: "Buscar",
    }
  },
  paciente: {
    summaryName: "Pacientes",
    items: {
      register: "Registrar",
      update: "Editar datos",
      search: "Buscar datos",
    }
  },
  profesional: {
    summaryName: "Profesionales médicos",
    items: {
      register: "Registrar",
      update: "Editar datos",
      search: "Buscar datos",
    }
  },
  area_consultorio: {
    summaryName: "Consultorios y áreas",
    items: {
      list: "Ver consultorios y áreas",
    }
  }
}
