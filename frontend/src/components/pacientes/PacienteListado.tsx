import React, { useContext, useState } from "react"
import { useSelectedCheckboxesObject } from "../../hooks/SelectChecboxes"
import { useTableOptions } from "../../hooks/useTableOptions"
import { useSearchPatients } from "../../requests/PacienteRequests"
import { useGetTurnosByPaciente } from "../../requests/TurnoRequests"
import { Paciente, Turno } from "../../types/Entities"
import { SelectItemCheckbox } from "../utilities/ListSelector"
import { SearchVar } from "../utilities/Searchvar"
import { TableOptions } from "../utilities/TableOptions"
import { useSearchParamsURL } from "../../hooks/SearchParams"
import { SearchPaciente } from "../../types/SearchFormTypes"
import { ComponentRefresher, ComponentRefresherProvider } from "../../context/ComponentRefresher"
import { GetResponseType, HandledResponse } from "../../types/APIResponses"
import { LoadingMessage } from "../utilities/Loading"

export function PacienteListado() {
  const {urlParams, handleSearchFormInputChange} = useSearchParamsURL()
  const {getResponse, getSearchParams} = useSearchPatients(urlParams)

  return (
    <section>
      <h2>Listado de pacientes</h2>
      <section>
        <form className="searchForm simple" onSubmit={ev => getSearchParams(ev)}>
          <label>Buscar por nombre o dni<SearchVar 
            value={urlParams.get("search") || ""} onChangeFunction={(e) => handleSearchFormInputChange<SearchPaciente>(e, "search")}
            /></label>
          <label>Buscar por obra social<SearchVar
            value={urlParams.get("obraSocial") || ""} onChangeFunction={(e) => handleSearchFormInputChange<SearchPaciente>(e, "obraSocial")}
            /></label>
          <button type="submit">Aplicar</button>
        </form>
        <LoadingMessage condition={!getResponse} />
        <ComponentRefresherProvider>
          <PacientesTable getResponse={getResponse}/>  
        </ComponentRefresherProvider>
      </section>
    </section>
  )
}

function PacientesTable({getResponse} : {getResponse: HandledResponse<GetResponseType> | undefined}) {
  const [dniSelected, setDniSelected] = useState("")
  const results = getResponse?.results as Paciente[]
  
  const turnsInPaciente = useGetTurnosByPaciente(dniSelected)
  const showTurnos = (dniPaciente: string) => setDniSelected(dniPaciente != dniSelected ? dniPaciente : "")
  
  const selectCheckboxesState = useSelectedCheckboxesObject()
  const {selectedEntitiesFunction, selectedEntities} = useTableOptions()

  const {refresher} = useContext(ComponentRefresher)
  return (
    <div key={refresher}>
      <TableOptions 
        entityType="pacientes" selectedCheckboxesState={selectCheckboxesState} childs={results}
        selectedEntities={selectedEntities} selectedEntitiesFunction={selectedEntitiesFunction}
      />
      <table className="table">
        <thead>
          <tr>
            <th className="checkbox"></th>
            <th>Nombre del paciente</th>
            <th>Dni</th>
            <th>Número de contacto</th>
            <th>Obra social</th>
            <th>Turnos</th>
          </tr>
        </thead>
        <tbody>
          {results?.map((paciente) => (
            <React.Fragment key={paciente.id}>
              <tr className="list paciente">
                <td className="checkbox">
                  <SelectItemCheckbox 
                    selectedCheckboxesObject={selectCheckboxesState} 
                    fatherName="pacientes" fatherOrChild="child" 
                    child={paciente} markSelectedEntitiesFunction={selectedEntitiesFunction}
                  />
                </td>
                <td>{paciente.nombreCompleto}</td>
                <td>{paciente.dni}</td>
                <td>{paciente.numeroContacto}</td>
                <td>{paciente.obraSocial || "Sin obra social"}</td>
                <td onClick={() => showTurnos(paciente.dni)}>
                  <p>Ver turnos: </p>
                </td>
              </tr>
              {dniSelected === paciente.dni && (
                (turnsInPaciente?.results as Turno[]).length > 0 ? 
                  (turnsInPaciente?.results as Turno[]).map((turno) => (
                    <tr className="list turno">
                      <td colSpan={6}>
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Fecha</th>
                              <th>Horario</th>
                              <th>Area profesional</th>
                              <th>Estado Pago</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{turno.fecha} - {turno.fecha}</td>
                              <td>{turno.horario}:{turno.horario}</td>
                              <td>{turno.areaProfesional}</td>
                              <td>{turno.estadoPago}</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )) :
                  <tr>
                    <td colSpan={6}>
                      No hay turnos asociados al paciente
                    </td>
                  </tr>
                )
              }
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}