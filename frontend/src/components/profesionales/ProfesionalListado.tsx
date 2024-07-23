import { useGetAllProfesionales } from "../../hooks/ProfesionalRequests";
import { ProfesionalMed } from "../../types/Entities";

export function ProfesionalListado() {
  const data = useGetAllProfesionales()
  const results = data?.results as ProfesionalMed[]

  return (
    <section>
      <h2>Listado de profesionales</h2>
      {results?.map(profesional => (
        <article>
          <strong>{profesional.nombreCompleto}</strong>
          <p>Dni: {profesional.dni}</p>
          <p>Especialidades: 
            <ul>{profesional.areas?.map(area => <li>{area}</li>)}</ul>
          </p>
          <p>Matricula: {profesional.numMatricula}</p>
          <p>Teléfono: {profesional.numeroContacto}</p>
          <p>Consultorio: {profesional.consultorio || "No asignado"}</p>
        </article>
      ))}
    </section>
  )
}