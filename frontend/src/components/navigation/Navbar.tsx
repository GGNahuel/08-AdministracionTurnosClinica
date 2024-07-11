

function NavItem({ summary, items } : { summary: string, items: string[]}) {
  return (
    <li>
      <details name="navItem">
        <summary><h3>{summary}</h3></summary>
        <ul>
          {items.map(item => <li key={item}>{item}</li>)}
        </ul>
      </details>
    </li>
  )
}

export function Navbar() {
  return (
    <nav id="mainNavbar">
      <header>
        <img src="/logoEjemplo.png" alt="Logo de la clinica" />
        <h2>Nombre clinica</h2>
      </header>
      <section>
        <ul className="linkList">
          <NavItem summary="Turnos" items={["Ver turnos del día", "Crear turno", "Modificar turno", "Buscar turnos"]}/>
          <NavItem summary="Paciente" items={["Registrar paciente", "Editar datos de paciente", "Buscar pacientes"]}/>
          <NavItem summary="Profesional médico" items={["Registrar profesional", "Editar datos de profesional", "Buscar perfil del profesional"]}/>
          <NavItem summary="Consultorios y áreas" items={["Ver consultorios y áreas"]}/>
        </ul>
      </section>
      <footer>
        <ul className="buttonList">
          <li><button className="navButton">⚙️</button></li>
          <li><button className="navButton">🚹</button></li>
          <li><button className="navButton">🌐</button></li>
        </ul>
      </footer>
    </nav>
  )
}