import { NavbarItemsType } from "../types/NavbarSections";
import { routes } from "./NavigationRoutes";

export const navListItems : NavbarItemsType = {
  turno: {
    summaryName: "Turnos",
    items: {
      today: {
        name: "Ver turnos del día",
        route: routes.turno.today
      },
      create: {
        name: "Crear",
        route: routes.turno.create
      },
      update: {
        name: "Modificar",
        route: routes.turno.update
      },
      search: {
        name: "Buscar",
        route: routes.turno.search
      }
    }
  },
  paciente: {
    summaryName: "Pacientes",
    items: {
      register: {
        name: "Registrar",
        route: routes.paciente.register
      },
      update: {
        name: "Editar datos",
        route: routes.paciente.update
      },
      search: {
        name: "Buscar datos",
        route: routes.paciente.search
      }
    }
  },
  profesional: {
    summaryName: "Profesionales médicos",
    items: {
      register: {
        name: "Registrar",
        route: routes.profesional.register
      },
      update: {
        name: "Editar datos",
        route: routes.profesional.update
      },
      search: {
        name: "Buscar datos",
        route: routes.profesional.search
      }
    }
  },
  area_consultorio: {
    summaryName: "Consultorios y áreas",
    items: {
      list: {
        name: "Ver consultorios y áreas",
        route: routes.area_consultorio.list
      },
      create: {
        name: "Crear consultorios o áreas",
        route: routes.area_consultorio.create
      }
    }
  }
}
