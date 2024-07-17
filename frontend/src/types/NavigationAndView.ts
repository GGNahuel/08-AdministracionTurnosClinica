type NavItemContent = {
  name: string,
  viewElement: (() => JSX.Element) | null
}

type TurnosNav = {
  today: NavItemContent,
  create: NavItemContent,
  update: NavItemContent,
  search: NavItemContent
}

type PacienteNav = {
  register: NavItemContent,
  update: NavItemContent,
  search: NavItemContent
}

type ProfesionalNav = {
  register: NavItemContent,
  update: NavItemContent,
  search: NavItemContent
}

type AreaConsultorioNav = {
  list: NavItemContent
}

export type NavbarItem = TurnosNav | PacienteNav | ProfesionalNav | AreaConsultorioNav

export type NavbarDetails = {
  summaryName: string,
  items: NavbarItem
}

export type NavbarFatherRoutes = "turno" | "paciente" | "profesional" | "area_consultorio"
export type TurnoRoutes = "today" | "create" | "update" | "search"
export type PacienteRoutes = "register" | "update" | "search"
export type ProfesionalRoutes = "register" | "update" | "search"
export type AreaConsultorioRoutes = "list"
export type NavbarChildRoutes = TurnoRoutes | PacienteRoutes | ProfesionalRoutes | AreaConsultorioRoutes

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
