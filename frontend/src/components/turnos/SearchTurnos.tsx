import { useGetAllAreas } from "../../hooks/AreaRequests"
import { useSelectedCheckboxesObject } from "../../hooks/SelectChecboxes"
import { useGetSearchedTurnos } from "../../hooks/TurnoRequests"

import { cutPascalCase } from "../../functions/Utilities"
import { EstadoPago } from "../../types/BackendEnums"
import { AreaProfesional, Turno } from "../../types/Entities"

import { SelectItemCheckbox } from "../utilities/ListSelector"
import { SearchVar } from "../utilities/Searchvar"

export function SearchTurnos() {
  const areas = useGetAllAreas()?.results as AreaProfesional[]
  const {getResponse, buildObject} = useGetSearchedTurnos()
  const resultsOfSearch = getResponse?.results as Turno[]
  const selectedCheckboxes = useSelectedCheckboxesObject()

  return (
    <section id="searchTurns">
      <header>
        <form onSubmit={(ev) => buildObject(ev)}>
          <div className="searchers">
            <SearchVar placeholder="Nombre de paciente o profesional" name="searchName"/>
            <label>
              Buscar por fecha
              <input type="date" name="date" placeholder="fecha"/>
            </label>
          </div>
          <div className="filters">
            <p>Filtros:</p>
            <div>
              <select name="areaName">
                <option value={""}>Área profesional</option>
                {areas.map(area => (<option key={area.nombre} value={area.nombre}>{area.nombre}</option>))}
              </select>
              <select name="estadoPago">
                <option value={""}>Estado administrativo</option>
                {EstadoPago.map(estado => (<option key={estado} value={estado}>{cutPascalCase(estado)}</option>))}
              </select>
            </div>
          </div>
          <button type="submit">Aplicar</button>
        </form>
      </header>
      <section>
        <table className="table">
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
            <th>Estado</th>
            <th>Comentario</th>
          </tr></thead>
          <tbody>
            {resultsOfSearch?.map(turno => (
              <tr key={turno.id}>
                <td><SelectItemCheckbox 
                  selectedCheckboxesObject={selectedCheckboxes} fatherOrChild="child" 
                  fatherName="turnos" child={turno}
                /></td>
                <td className="right">{turno.fecha}</td>
                <td className="right">{turno.horario}</td>
                <td>{turno.areaProfesional}</td>
                <td>{turno.pacienteDto.nombreCompleto}</td>
                <td>{turno.profesionalDto.nombreCompleto}</td>
                <td className="right">{turno.consultorio}</td>
                <td>{cutPascalCase(turno.estadoPago)}</td>
                <td>{turno.comentario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  )
}