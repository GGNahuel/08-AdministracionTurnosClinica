export const routes = {
  turno: {
    today: "/",
    todayOfProffesional: "/turno/profesional",
    create: "/turno/crear",
    search: "/turno"
  },
  paciente: {
    register: "/paciente/registrar",
    search: "/paciente"
  },
  profesional: {
    register: "/profesional/registrar",
    search: "/profesional"
  },
  area_consultorio: {
    list: "/areas_consultorios",
    create: "/areas_consultorios/crear"
  },
  usuario: {
    login: "/login",
    signup: "/signup",
    profile: "/profile"
  }
} as const