type TurnosNav = {
  today: string,
  create: string,
  update: string,
  search: string
}

type PacienteNav = {
  register: string,
  update: string,
  search: string
}

type ProfesionalNav = {
  register: string,
  update: string,
  search: string
}

type AreaConsultorioNav = {
  list: string
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
