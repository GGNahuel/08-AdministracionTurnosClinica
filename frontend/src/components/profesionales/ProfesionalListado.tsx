import { Horario } from "../../functions/HorarioClass";
import { useGetAllProfesionales } from "../../hooks/ProfesionalRequests";
import { useSelectedCheckboxesObject } from "../../hooks/SelectChecboxes";
import { ProfesionalMed } from "../../types/Entities";
import { SelectItemCheckbox } from "../utilities/ListSelector";

export function ProfesionalListado() {
  const data = useGetAllProfesionales()
  const results = data?.results as ProfesionalMed[]

  const selectedCheckboxesObject = useSelectedCheckboxesObject()

  return (
    <section>
      <h1>Listado de profesionales</h1>
      <table className="table">
        <thead><tr>
            <th>
              <SelectItemCheckbox 
                selectedCheckboxesObject={selectedCheckboxesObject}
                fatherName="profesionales" fatherOrChild="father"
                childElements={results}
              />
            </th>
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
                <td>
                  <SelectItemCheckbox
                    selectedCheckboxesObject={selectedCheckboxesObject}
                    fatherName="profesionales" fatherOrChild="child"
                    child={profesional}
                  />
                </td>
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