import { PacienteCreacion } from "../components/pacientes/PacienteCreacion";
import { TurnoCreacion } from "../components/turnos/TurnoCreacion";
import { TurnoListado } from "../components/turnos/TurnoListado";
import { NavbarItemsType } from "../types/NavigationAndView";

export const view_NavComponent : NavbarItemsType = {
  turno: {
    summaryName: "Turnos",
    items: {
      today: {
        name: "Ver turnos del día",
        viewElement: TurnoListado
      },
      create: {
        name: "Crear",
        viewElement: TurnoCreacion
      },
      update: {
        name: "Modificar",
        viewElement: null
      },
      search: {
        name: "Buscar",
        viewElement: null
      }
    }
  },
  paciente: {
    summaryName: "Pacientes",
    items: {
      register: {
        name: "Registrar",
        viewElement: PacienteCreacion
      },
      update: {
        name: "Editar datos",
        viewElement: null
      },
      search: {
        name: "Buscar datos",
        viewElement: null
      }
    }
  },
  profesional: {
    summaryName: "Profesionales médicos",
    items: {
      register: {
        name: "Registrar",
        viewElement: null
      },
      update: {
        name: "Editar datos",
        viewElement: null
      },
      search: {
        name: "Buscar datos",
        viewElement: null
      }
    }
  },
  area_consultorio: {
    summaryName: "Consultorios y áreas",
    items: {
      list: {
        name: "Ver consultorios y áreas",
        viewElement: null
      }
    }
  }
}
