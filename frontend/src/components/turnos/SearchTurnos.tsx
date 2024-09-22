import { useSelectedCheckboxesObject } from "../../hooks/SelectChecboxes"
import { useTableOptions } from "../../hooks/useTableOptions"
import { useGetAllAreas } from "../../requests/AreaRequests"
import { useGetSearchedTurnos } from "../../requests/TurnoRequests"

import { cutPascalCase } from "../../functions/Utilities"
import { EstadoPago } from "../../types/BackendEnums"
import { AreaProfesional, Turno } from "../../types/Entities"

import React from "react"
import { dateInputValueToDBFormat, dateToInputFormat } from "../../functions/DateFunctions"
import { SearchTurno } from "../../types/SearchFormTypes"
import { SelectItemCheckbox } from "../utilities/ListSelector"
import { SearchVar } from "../utilities/Searchvar"
import { TableOptions } from "../utilities/TableOptions"
import { useSearchParamsURL } from "../../hooks/SearchParams"

export function SearchTurnos() {
  const areas = useGetAllAreas()?.results as AreaProfesional[]
  const selectedCheckboxes = useSelectedCheckboxesObject()
  const {selectedEntitiesFunction, selectedEntities} = useTableOptions()
  
  const {urlParams, handleSearchFormInputChange} = useSearchParamsURL()
  const {getResponse, buildObject} = useGetSearchedTurnos(urlParams)
  const resultsOfSearch = getResponse?.results as Turno[]

  return (
    <section>
      <header>
        <form onSubmit={(ev) => buildObject(ev)} className="searchForm">
          <div className="searchers">
            <SearchVar 
              placeholder="Nombre de paciente o profesional" name="searchName" 
              value={urlParams.get("searchName") || ""} onChangeFunction={(e) => handleSearchFormInputChange<SearchTurno>(e, "searchName")}
            />
            <label>
              Buscar por fecha
              <input type="date" name="date" placeholder="fecha" 
                value={urlParams.get("areaName") && urlParams.get("areaName") != "" ? dateToInputFormat(urlParams.get("areaName") as string) : undefined} 
                onChange={(e) => handleSearchFormInputChange<SearchTurno>(e, "date", dateInputValueToDBFormat(e.currentTarget.value))}
              />
            </label>
          </div>
          <div className="filters">
            <p>Filtros:</p>
            <div>
              <select name="areaName" onChange={e => handleSearchFormInputChange<SearchTurno>(e, "areaName")} value={urlParams.get("areaName") || ""}>
                <option value={""}>Área profesional</option>
                {areas?.map(area => (<option key={area.nombre} value={area.nombre}>{area.nombre}</option>))}
              </select>
              <select name="estadoPago" onChange={e => handleSearchFormInputChange<SearchTurno>(e, "estadoPago")} value={urlParams.get("estadoPago") || ""}>
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