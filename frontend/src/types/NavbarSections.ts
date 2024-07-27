import { routes } from "../constants/NavigationRoutes"

type ExtractRoutesFromObject<obj> = 
  obj extends { [key: string]: infer tipoNavbarItem } //saca el valor de las rutas padre ("turno", "paciente", ...)
    ? tipoNavbarItem extends { [key: string]: infer contenidoObj } // saca el valor final de cada ruta hija
      ? contenidoObj
      : never
    : never
type RouteValues = ExtractRoutesFromObject<typeof routes>

interface NavItem {
  name: string,
  route: RouteValues
}

interface TurnosNav {
  today: NavItem,
  create: NavItem,
  update: NavItem,
  search: NavItem
}

interface PacienteNav {
  register: NavItem,
  update: NavItem,
  search: NavItem
}

interface ProfesionalNav {
  register: NavItem,
  update: NavItem,
  search: NavItem
}

interface AreaConsultorioNav {
  list: NavItem,
  create: NavItem
}

type NavbarItem = TurnosNav | PacienteNav | ProfesionalNav | AreaConsultorioNav

export type NavbarDetails = {
  summaryName: string,
  items: NavbarItem
}

export type NavbarItemsType = {
  turno: {
    summaryName: string,
    items: TurnosNav
  },
  paciente: {
    summaryName: string,
    items: PacienteNav
  },
  profesional: {
    summaryName: string,
    items: ProfesionalNav
  },
  area_consultorio: {
    summaryName: string,
    items: AreaConsultorioNav
  }
}
