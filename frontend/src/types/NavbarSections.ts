import { routes } from "../constants/NavigationRoutes"

type ExtractRoutesFromObject<obj> = 
  obj extends { [key: string]: infer tipoNavbarItem }
    ? tipoNavbarItem extends { [key: string]: infer contenidoObj }
      ? contenidoObj
      : never
    : never
type RouteValues = ExtractRoutesFromObject<typeof routes>

interface NavItem {
  name: string,
  route: RouteValues
}

type TurnosNav = {
  today: NavItem,
  create: NavItem,
  update: NavItem,
  search: NavItem
}

type PacienteNav = {
  register: NavItem,
  update: NavItem,
  search: NavItem
}

type ProfesionalNav = {
  register: NavItem,
  update: NavItem,
  search: NavItem
}

type AreaConsultorioNav = {
  list: NavItem
}

export type NavbarItem = TurnosNav | PacienteNav | ProfesionalNav | AreaConsultorioNav

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
