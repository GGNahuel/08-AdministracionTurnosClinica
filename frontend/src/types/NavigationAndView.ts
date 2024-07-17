type NavItem_nameAndView = {
  name: string,
  viewElement: (() => JSX.Element) | null
}

type TurnosNav = {
  today: NavItem_nameAndView,
  create: NavItem_nameAndView,
  update: NavItem_nameAndView,
  search: NavItem_nameAndView
}

type PacienteNav = {
  register: NavItem_nameAndView,
  update: NavItem_nameAndView,
  search: NavItem_nameAndView
}

type ProfesionalNav = {
  register: NavItem_nameAndView,
  update: NavItem_nameAndView,
  search: NavItem_nameAndView
}

type AreaConsultorioNav = {
  list: NavItem_nameAndView
}

export type NavbarItem = TurnosNav | PacienteNav | ProfesionalNav | AreaConsultorioNav

export type NavbarItemsType = {
  turno: TurnosNav,
  paciente: PacienteNav,
  profesional: ProfesionalNav,
  area_consultorio: AreaConsultorioNav
}
