import { cutPascalCase } from "../../functions/Utilities"
import { useGetAllAreas } from "../../hooks/AreaRequests"
import { useSelectedCheckboxesObject } from "../../hooks/SelectChecboxes"
import { useGetSearchedTurnos } from "../../hooks/TurnoRequests"
import { EstadoPago } from "../../types/BackendEnums"
import { AreaProfesional, Turno } from "../../types/Entities"
import { SelectItemCheckbox } from "../utilities/ListSelector"

export function SearchTurnos() {
  const areas = useGetAllAreas()?.results as AreaProfesional[]
  const {getResponse, buildObject} = useGetSearchedTurnos()
  const resultsOfSearch = getResponse?.results as Turno[]
  const selectedCheckboxes = useSelectedCheckboxesObject()

  return (
    <section>
      <header>
        <form onSubmit={(ev) => buildObject(ev)}>
          <input type="search" name="searchName" placeholder="Nombre de paciente o profesional" />
          <input type="date" name="date" placeholder="fecha"/>
          <div>
            Filtros:
            <select name="areaName">
              <option value={""}>Área profesional</option>
              {areas.map(area => (<option key={area.nombre} value={area.nombre}>{area.nombre}</option>))}
            </select>
            <select name="estadoPago">
              <option value={""}>Estado administrativo</option>
              {EstadoPago.map(estado => (<option key={estado} value={estado}>{cutPascalCase(estado)}</option>))}
            </select>
          </div>
          <button type="submit">Aplicar</button>
        </form>
      </header>
      <section>
        <table>
          <thead><tr>
            <th><SelectItemCheckbox 
              selectedCheckboxesObject={selectedCheckboxes} fatherOrChild="father" 
              fatherName="turnos" childElements={resultsOfSearch}
            /></th>
            <th>Fecha</th>
            <th>Horario</th>
            <th>Area profesional</th>
            <th>Paciente</th>
            <th>Profesional</th>
            <th>Consultorio</th>
          </tr></thead>
          <tbody>
            {resultsOfSearch?.map(turno => {console.log(turno); return(
              <tr key={turno.id}>
                <td><SelectItemCheckbox 
                  selectedCheckboxesObject={selectedCheckboxes} fatherOrChild="child" 
                  fatherName="turnos" child={turno}
                /></td>
                <td>{turno.fecha}</td>
                <td>{turno.horario}</td>
                <td>{turno.areaProfesional}</td>
                <td>{turno.pacienteDto.nombreCompleto}</td>
                <td>{turno.profesionalDto.nombreCompleto}</td>
                <td>{turno.consultorio}</td>
              </tr>
            )})}
          </tbody>
        </table>
      </section>
    </section>
  )
}