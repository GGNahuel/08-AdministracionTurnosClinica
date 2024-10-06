import { routes } from "../constants/NavigationRoutes"
import { Roles } from "./BackendEnums"

type ExtractRoutesFromObject<obj> = 
  obj extends { [key: string]: infer tipoNavbarItem } //saca el valor de las rutas padre ("turno", "paciente", ...)
    ? tipoNavbarItem extends { [key: string]: infer contenidoObj } // saca el valor final de cada ruta hija
      ? contenidoObj
      : never
    : never
export type RouteValues = ExtractRoutesFromObject<typeof routes>

export interface NavItem {
  name: string,
  route: RouteValues,
  protected: {
    value: boolean,
    roles?: Roles[]
  }
}

interface TurnosNav {
  today: NavItem,
  create: NavItem,
  search: NavItem
}

interface PacienteNav {
  register: NavItem,
  search: NavItem
}

interface ProfesionalNav {
  register: NavItem,
  search: NavItem
}

interface AreaConsultorioNav {
  list: NavItem,
  create: NavItem
}

type NavbarItem = TurnosNav | PacienteNav | ProfesionalNav | AreaConsultorioNav
type NavbarItemsGeneric<element extends NavbarItem> = {
  summaryName: string,
  items: element
}

export type NavbarDetails = {
  summaryName: string,
  items: NavbarItem
}

export type NavbarItemsType = {
  turno: NavbarItemsGeneric<TurnosNav>,
  paciente: NavbarItemsGeneric<PacienteNav>,
  profesional: NavbarItemsGeneric<ProfesionalNav>,
  area_consultorio: NavbarItemsGeneric<AreaConsultorioNav>
}

