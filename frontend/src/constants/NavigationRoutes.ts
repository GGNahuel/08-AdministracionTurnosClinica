export const routes = {
  turno: {
    today: "/",
    create: "/turno/crear",
    update: "/turno/editar",
    search: "/turno"
  },
  paciente: {
    register: "/paciente/registrar",
    update: "/paciente/editar",
    search: "/paciente"
  },
  profesional: {
    register: "/profesional/registrar",
    update: "/profesional/editar",
    search: "/profesional"
  },
  area_consultorio: {
    list: "/areas_consultorios"
  }
} as const