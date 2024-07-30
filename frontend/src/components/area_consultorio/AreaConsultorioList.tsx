import { useGetAllAreas } from "../../hooks/AreaRequests";
import { useGetAllConsultorios } from "../../hooks/ConsultorioRequests";
import { useGetAllProfesionales } from "../../hooks/ProfesionalRequests";
import { AreaProfesional, Consultorio, ProfesionalMed } from "../../types/Entities";

export function AreaConsList() {
  const areas = useGetAllAreas()?.results as AreaProfesional[]
  const consultorios = useGetAllConsultorios()?.results as Consultorio[]
  const profesionales = useGetAllProfesionales()?.results as ProfesionalMed[]

  return (
    <section>
      <h1>Listados</h1>
      <section>
        <h2>Consultorios existentes</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Número</th>
              <th>Profesional asignado</th>
            </tr>
          </thead>
          <tbody>
            {consultorios?.map(consultorio => {
              const profesionalAsignado = profesionales?.find(profesional => profesional.consultorio == consultorio.numeroConsultorio)

              return(
                <tr key={consultorio.numeroConsultorio}>
                  <td className="center">{consultorio.numeroConsultorio}</td>
                  <td>{profesionalAsignado ? profesionalAsignado.nombreCompleto : "No definido"}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
      <section>
        <h2>Áreas profesionales</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Activa</th>
            </tr>
          </thead>
          <tbody>
            {areas?.map(area => (
              <tr key={area.nombre} className={area.activa ? "" : "inactive"}>
                <td>{area.nombre}</td>
                <td className="center">{area.necesitaTurno ? "Con turnos" : "Por orden de llegada"}</td>
                <td className="center">{area.activa ? "Activa" : "Inactiva"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  )
}