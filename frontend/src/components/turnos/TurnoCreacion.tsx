import { usePostTurno } from "../../hooks/TurnoRequests";

export function TurnoCreacion() {
  const {sendData} = usePostTurno()

  return (
    <section>
      <h2>Registrar turno</h2>
      <form id="turnoForm" onSubmit={(ev) => sendData(ev)}>
        <input list="pacientes" name="pacienteDTO" />
        <input type="date" name="fecha" placeholder="Horario"/>
        <button type="submit">Enviar</button>
      </form>
      <datalist>
        <option value=""></option>
      </datalist>
    </section>
  )
}