import { Horario } from "../../classes/Horario";
import { useSelectedCheckboxesObject } from "../../hooks/SelectChecboxes";
import { useTableOptions } from "../../hooks/useTableOptions";
import { useGetAllAreas } from "../../requests/AreaRequests";
import { useSearchProffesionals } from "../../requests/ProfesionalRequests";
import { AreaProfesional, ProfesionalMed } from "../../types/Entities";
import { SelectItemCheckbox } from "../utilities/ListSelector";
import { SearchVar } from "../utilities/Searchvar";
import { TableOptions } from "../utilities/TableOptions";

export function ProfesionalListado() {
  const {getResponse: data, getParams} = useSearchProffesionals()
  const results = data?.results as ProfesionalMed[]
  const areas = useGetAllAreas()?.results as AreaProfesional[]

  const selectedCheckboxesObject = useSelectedCheckboxesObject()
  const {selectedEntitiesFunction, selectedEntities} = useTableOptions()

  return (
    <section>
      <h1>Listado de profesionales</h1>
      <section>
        <form className="searchForm simple" onSubmit={(ev) => getParams(ev)}>
          <label>Buscar por nombre o DNI<SearchVar name="search" placeholder="Nombre o dni" /></label>
          <label>Buscar por matricula<SearchVar name="matricula" /></label>
          <select name="area">
            <option value="">Seleccione area para filtrar</option>
            {areas?.map(area => <option key={area.nombre} value={area.nombre}>{area.nombre}</option>)}
          </select>
          <button type="submit">Aplicar</button>
        </form>
        <TableOptions 
          entityType="profesionales" selectedCheckboxesState={selectedCheckboxesObject} childs={results}
          selectedEntities={selectedEntities} selectedEntitiesFunction={selectedEntitiesFunction}
        />
        <table className="table">
          <thead><tr>
              <th>
                <SelectItemCheckbox 
                  selectedCheckboxesObject={selectedCheckboxesObject}
                  fatherName="profesionales" fatherOrChild="father"
                  childElements={results} markSelectedEntitiesFunction={selectedEntitiesFunction}
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
                  <td className="checkbox">
                    <SelectItemCheckbox
                      selectedCheckboxesObject={selectedCheckboxesObject}
                      fatherName="profesionales" fatherOrChild="child"
                      child={profesional} markSelectedEntitiesFunction={selectedEntitiesFunction}
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
    </section>
  )
}