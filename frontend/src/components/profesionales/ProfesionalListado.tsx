import { useGetAllProfesionales } from "../../hooks/ProfesionalRequests";
import { ProfesionalMed } from "../../types/Entities";

export function ProfesionalListado() {
  const data = useGetAllProfesionales()
  const results = data?.results as ProfesionalMed[]

  return (
    <section>
      <h2>Listado de profesionales</h2>
      <table>
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
          {results?.map(profesional => (
            <tr key={profesional.id}>
              <td>{profesional.nombreCompleto}</td>
              <td>{profesional.dni}</td>
              <td>
                <ul>{profesional.areas?.map(area => <li>{area}</li>)}</ul>
              </td>
              <td>{profesional.numMatricula}</td>
              <td>{profesional.numeroContacto}</td>
              <td>{profesional.consultorio || "No asignado"}</td>
              <td>horarios</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}