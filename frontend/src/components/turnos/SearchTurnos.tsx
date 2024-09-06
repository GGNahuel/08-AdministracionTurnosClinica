import { useGetAllAreas } from "../../hooks/AreaRequests"
import { useSelectedCheckboxesObject } from "../../hooks/SelectChecboxes"
import { useGetSearchedTurnos } from "../../hooks/TurnoRequests"
import { useTableOptions } from "../../hooks/useTableOptions"

import { cutPascalCase } from "../../functions/Utilities"
import { EstadoPago } from "../../types/BackendEnums"
import { AreaProfesional, Turno } from "../../types/Entities"

import { SelectItemCheckbox } from "../utilities/ListSelector"
import { SearchVar } from "../utilities/Searchvar"
import React from "react"
import { TableOptions } from "../utilities/TableOptions"

export function SearchTurnos() {
  const areas = useGetAllAreas()?.results as AreaProfesional[]
  const {getResponse, buildObject} = useGetSearchedTurnos()
  const resultsOfSearch = getResponse?.results as Turno[]
  const selectedCheckboxes = useSelectedCheckboxesObject()
  const {selectedEntitiesFunction, selectedEntities} = useTableOptions()

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
                {EstadoPago.map(estado => (estado != "" ? <option key={estado} value={estado}>{cutPascalCase(estado)}</option> : ""))}
              </select>
            </div>
          </div>
          <button type="submit">Aplicar</button>
        </form>
      </header>
      <section>
        <TableOptions 
          entityType="turnos" selectedCheckboxesState={selectedCheckboxes} childs={resultsOfSearch}
          selectedEntities={selectedEntities} selectedEntitiesFunction={selectedEntitiesFunction}
        />
        <table className="table">
          <thead><tr>
            <th className="checkbox"></th>
            <th>Fecha</th>
            <th>Horario</th>
            <th>Area profesional</th>
            <th>Paciente</th>
            <th>Profesional</th>
            <th>Consultorio</th>
            <th>Estado</th>
          </tr></thead>
          <tbody>
            {resultsOfSearch?.map(turno => (
              <React.Fragment key={turno.id}>
                <tr>
                  <td className="checkbox"><SelectItemCheckbox 
                    selectedCheckboxesObject={selectedCheckboxes} fatherOrChild="child" 
                    fatherName="turnos" child={turno} markSelectedEntitiesFunction={selectedEntitiesFunction}
                    /></td>
                  <td className="right">{turno.fecha}</td>
                  <td className="right">{turno.horario}</td>
                  <td>{turno.areaProfesional}</td>
                  <td>{turno.pacienteDto.nombreCompleto}</td>
                  <td>{turno.profesionalDto.nombreCompleto}</td>
                  <td className="right">{turno.consultorio}</td>
                  <td>{cutPascalCase(turno.estadoPago)}</td>
                </tr>
                <tr>
                  <td></td>
                  <td colSpan={7}><strong>Comentario: </strong>{turno.comentario}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  )
}