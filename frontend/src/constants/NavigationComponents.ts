import { NavbarItemsType } from "../types/NavbarSections";
import { routes } from "./NavigationRoutes";

export const navListItems : NavbarItemsType = {
  turno: {
    summaryName: "Turnos",
    items: {
      today: {
        name: "Ver turnos del día",
        route: routes.turno.today,
        protected: {
          value: true,
          roles: ["ADMIN", "GENERAL"]
        }
      },
      todayProffesional: {
        name: "Ver turnos del día",
        route: routes.turno.today,
        protected: {
          value: true,
          roles: ["PROFFESIONAL"]
        }
      },
      create: {
        name: "Crear",
        route: routes.turno.create,
        protected: {
          value: true,
          roles: ["ADMIN", "GENERAL", "PROFFESIONAL"]
        }
      },
      search: {
        name: "Buscar",
        route: routes.turno.search,
        protected: {
          value: false
        }
      }
    }
  },
  paciente: {
    summaryName: "Pacientes",
    items: {
      register: {
        name: "Registrar",
        route: routes.paciente.register,
        protected: {
          value: true,
          roles: ["ADMIN", "GENERAL", "PROFFESIONAL"]
        }
      },
      search: {
        name: "Buscar datos",
        route: routes.paciente.search,
        protected: {
          value: false
        }
      }
    }
  },
  profesional: {
    summaryName: "Profesionales médicos",
    items: {
      register: {
        name: "Registrar",
        route: routes.profesional.register,
        protected: {
          value: true,
          roles: ["ADMIN"]
        }
      },
      search: {
        name: "Buscar datos",
        route: routes.profesional.search,
        protected: {
          value: false
        }
      }
    }
  },
  area_consultorio: {
    summaryName: "Consultorios y áreas",
    items: {
      list: {
        name: "Ver consultorios y áreas",
        route: routes.area_consultorio.list,
        protected: {
          value: false
        }
      },
      create: {
        name: "Crear consultorios o áreas",
        route: routes.area_consultorio.create,
        protected: {
          value: true,
          roles: ["ADMIN"]
        }
      }
    }
  }
}
