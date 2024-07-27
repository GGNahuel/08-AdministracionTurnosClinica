import { Horario } from "../../functions/HorarioClass";
import { useGetAllProfesionales } from "../../hooks/ProfesionalRequests";
import { ProfesionalMed } from "../../types/Entities";

export function ProfesionalListado() {
  const data = useGetAllProfesionales()
  const results = data?.results as ProfesionalMed[]

  return (
    <section>
      <h1>Listado de profesionales</h1>
      <table className="table">
        <thead><tr>
            <th>Nombre completo</th>
            <th>DNI</th>
            <th>Especialidades</th>
            <th>Matricula</th>
            <th>Telefono</th>
            <th>Consultorio</th>
            <th>Horarios de atención</th>
        </tr></thead>
        <tbody>
          {results?.map(profesional => {
            const { horarios } = profesional
            const formattedHorariosList = horarios && Horario.getScheduleBlocksFromStrings(horarios)
            
            return(
              <tr key={profesional.id}>
                <td>{profesional.nombreCompleto}</td>
                <td>{profesional.dni}</td>
                <td className="center">
                  <ul>{profesional.areas?.map(area => <li key={area}>{area}</li>)}</ul>
                </td>
                <td className="right">{profesional.numMatricula}</td>
                <td className="right">{profesional.numeroContacto}</td>
                <td className="right">{profesional.consultorio || "No asignado"}</td>
                <td className="center">{formattedHorariosList}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}