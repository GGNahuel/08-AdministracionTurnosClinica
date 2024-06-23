function NavItem({ summary, items } : { summary: string, items: string[]}) {
  return (
    <li>
      <details name="navItem">
        <summary>{summary}</summary>
        <ul>
          {items.map(item => <li key={item}>{item}</li>)}
        </ul>
      </details>
    </li>
  )
}

export function Navbar() {
  return (
    <nav>
      <header>
        <img src="asd" alt="Logo de la clinica" />
        <h2>Clínica Salud</h2>
      </header>
      <ul>
        <NavItem summary="Turnos" items={["Ver turnos del día", "Crear turno", "Modificar turno", "Buscar turnos"]}/>
        <NavItem summary="Paciente" items={["Registrar paciente", "Editar datos de paciente", "Buscar pacientes"]}/>
        <NavItem summary="Profesional médico" items={["Registrar profesional", "Editar datos de profesional", "Buscar perfil del profesional"]}/>
        <NavItem summary="Consultorios y áreas" items={["Ver consultorios y áreas"]}/>
      </ul>
    </nav>
  )
}