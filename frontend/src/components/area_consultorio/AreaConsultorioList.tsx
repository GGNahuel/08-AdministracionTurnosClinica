import { useState } from "react";
import { useGetAllAreas } from "../../hooks/AreaRequests";
import { useGetAllConsultorios } from "../../hooks/ConsultorioRequests";
import { useGetAllProfesionales } from "../../hooks/ProfesionalRequests";
import { AreaProfesional, Consultorio, Entities, ProfesionalMed } from "../../types/Entities";

export function AreaConsList() {
  const areas = useGetAllAreas()?.results as AreaProfesional[]
  const consultorios = useGetAllConsultorios()?.results as Consultorio[]
  const profesionales = useGetAllProfesionales()?.results as ProfesionalMed[]

  /* ej selectedCheckboxes: 
  {
    consultorios: {
      consultorio_1: true,
      consultorio_2: false
    },
    areas: {
      Odontología: true,
      ...
    }
  }
  */
  type FatherCheckboxes = "consultorios" | "areas" | "pacientes" | "turnos" | "profesionales"
  const [selectedCheckboxes, setSeletedCheckboxes] = useState<Record<FatherCheckboxes, Record<string, boolean>>>()

  const selectorFatherOnChange = (ev: React.ChangeEvent<HTMLInputElement>, fatherName: string, childElements: Entities[]) => {
    const { checked } = ev.target
    const fatherClass = ev.target.className.split(" ").find(className => className != "father" && /selector_\w{1,}/.test(className))
    const updateSelectedcheckboxes = {}

    if (!fatherClass) 
      throw new Error("El selector con la función de seleccionar todos no es del tipo correcto. Debe tener la clase selector_'tipo' y 'father'")

    childElements.forEach(entity => {
      if (entity)
    })
  }

  return (
    <section>
      <h1>Listados</h1>
      <section>
        <h2>Consultorios existentes</h2>
        <table className="table">
          <thead>
            <tr>
              <th><input type="checkbox" className="selector_consultorios father" onChange={(ev)=> selectorFatherOnChange(ev)}/></th>
              <th>Número</th>
              <th>Profesional asignado</th>
            </tr>
          </thead>
          <tbody>
            {consultorios?.map(consultorio => {
              const profesionalAsignado = profesionales?.find(profesional => profesional.consultorio == consultorio.numeroConsultorio)

              return(
                <tr key={consultorio.numeroConsultorio}>
                  <td className="center"><input type="checkbox" name={"consultorio_" + consultorio.numeroConsultorio} className="selector_consultorios" /></td>
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