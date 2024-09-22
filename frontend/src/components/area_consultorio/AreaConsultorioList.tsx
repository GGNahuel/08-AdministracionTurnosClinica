import { useSearchArea } from "../../requests/AreaRequests";
import { useSearchConsulrory } from "../../requests/ConsultorioRequests";
import { useGetAllProfesionales } from "../../requests/ProfesionalRequests";
import { useSelectedCheckboxesObject } from "../../hooks/SelectChecboxes";
import { AreaProfesional, ProfesionalMed } from "../../types/Entities";
import { SelectItemCheckbox } from "../utilities/ListSelector";

import { useTableOptions } from "../../hooks/useTableOptions";
import { TableOptions } from "../utilities/TableOptions";
import { useSearchParamsURL } from "../../hooks/SearchParams";
import { SearchArea } from "../../types/SearchFormTypes";

export function AreaConsList() {
  const {urlParams, handleSearchFormInputChange} = useSearchParamsURL()

  const {getResponse: areaSearchResponse, sendSearchParams: sendAreaParams} = useSearchArea(urlParams)
  const areas = areaSearchResponse?.results as AreaProfesional[]
  const {results: consultorios, filterOcuppedConsultories} = useSearchConsulrory()
  const profesionales = useGetAllProfesionales()?.results as ProfesionalMed[]

  const selectCheckboxesState = useSelectedCheckboxesObject()
  const {selectedEntitiesFunction, selectedEntities} = useTableOptions()

  return (
    <section>
      <h1>Listados</h1>
      <section>
        <h2>Consultorios existentes</h2>
        <form className="searchForm simple" onSubmit={ev => filterOcuppedConsultories(ev, profesionales)}>
          <select name="ocupped">
            <option value="">Desactivado</option>
            <option value="true">Asignados</option>
            <option value="false">Libres</option>
          </select>
          <button type="submit">Aplicar</button>
        </form>
        <TableOptions 
          entityType="consultorios" selectedCheckboxesState={selectCheckboxesState} childs={consultorios} 
          selectedEntities={selectedEntities} selectedEntitiesFunction={selectedEntitiesFunction}
        />
        <table className="table">
          <thead>
            <tr>
              <th className="checkbox"></th>
              <th>Número</th>
              <th>Profesional asignado</th>
            </tr>
          </thead>
          <tbody>
            {consultorios?.map(consultorio => {
              const profesionalAsignado = profesionales?.find(profesional => profesional.consultorio == consultorio.numeroConsultorio)

              return(
                <tr key={consultorio.numeroConsultorio}>
                  <td className="checkbox">
                    <SelectItemCheckbox 
                      selectedCheckboxesObject={selectCheckboxesState} 
                      fatherName="consultorios" fatherOrChild="child" 
                      child={consultorio} markSelectedEntitiesFunction={selectedEntitiesFunction}
                    />
                  </td>
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
        <form className="searchForm simple" onSubmit={(e) => sendAreaParams(e)}>
          <div className="filters">
            <p>Filtros: </p>
            <select onChange={e => handleSearchFormInputChange<SearchArea>(e, "status")} value={urlParams.get("status") || ""}>
              <option value="">Estado</option>
              <option value="true">Activa</option>
              <option value="false">Inactiva</option>
            </select>
            <select name="needSchedule" onChange={e => handleSearchFormInputChange<SearchArea>(e, "schedule")} value={urlParams.get("schedule") || ""}>
              <option value="">Tipo de servicio</option>
              <option value="true">Con turnos</option>
              <option value="false">Por orden de llegada</option>
            </select>
          </div>
          <button type="submit">Aplicar</button>
        </form>
        <TableOptions 
          entityType="areas" selectedCheckboxesState={selectCheckboxesState} childs={areas} desactivateButton
          selectedEntities={selectedEntities} selectedEntitiesFunction={selectedEntitiesFunction}
        />
        <table className="table">
          <thead>
            <tr>
              <th className="checkbox"></th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Activa</th>
            </tr>
          </thead>
          <tbody>
            {areas?.map(area => (
              <tr key={area.nombre} className={area.activa ? "" : "inactive"}>
                <td className="checkbox">
                  <SelectItemCheckbox 
                      selectedCheckboxesObject={selectCheckboxesState} 
                      fatherName="areas" fatherOrChild="child" 
                      child={area} markSelectedEntitiesFunction={selectedEntitiesFunction}
                    />
                </td>
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