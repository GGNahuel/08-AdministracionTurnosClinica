function NavItem({ summary, items } : { summary: string, items: string[]}) {
  return (
    <li>
      <details>
        <summary>{summary}</summary>
        {items.map(item => <span key={item}>{item}</span>)}
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
        <NavItem summary="Turnos" items={["Ver turnos", "Crear turno", "Buscar turno"]}/>
        <NavItem summary="Paciente" items={["Registrar paciente", "Editar datos de paciente", "Buscar paciente"]}/>
        <NavItem summary="Profesional médico" items={["Registrar profesional", "Editar datos de profesional", "Buscar profesional"]}/>
      </ul>
    </nav>
  )
}