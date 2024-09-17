import React, { useState } from "react"
import { useSelectedCheckboxesObject } from "../../hooks/SelectChecboxes"
import { useTableOptions } from "../../hooks/useTableOptions"
import { useSearchPatients } from "../../requests/PacienteRequests"
import { useGetTurnosByPaciente } from "../../requests/TurnoRequests"
import { Paciente, Turno } from "../../types/Entities"
import { SelectItemCheckbox } from "../utilities/ListSelector"
import { SearchVar } from "../utilities/Searchvar"
import { TableOptions } from "../utilities/TableOptions"

export function PacienteListado() {
  const [dniSelected, setDniSelected] = useState("")
  const {getResponse, setSearchParams} = useSearchPatients()
  const results = getResponse?.results as Paciente[]

  const turnsInPaciente = useGetTurnosByPaciente(dniSelected)
  const showTurnos = (dniPaciente: string) => setDniSelected(dniPaciente != dniSelected ? dniPaciente : "")
  
  const selectCheckboxesState = useSelectedCheckboxesObject()
  const {selectedEntitiesFunction, selectedEntities} = useTableOptions()

  return (
    <section>
      <h2>Listado de pacientes</h2>
      <section>
        <form className="searchForm simple" onSubmit={ev => setSearchParams(ev)}>
          <div>
            <SearchVar name="search" placeholder="Nombre o dni del paciente"/>
            <SearchVar name="obraSocial" placeholder="Obra social"/>
          </div>
          <button type="submit">Aplicar</button>
        </form>  
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
            {results?.map((paciente) => {
              return (
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
                  {dniSelected === paciente.dni && 
                    ((turnsInPaciente?.results as Turno[]).length > 0 ? 
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
              )
            })}
          </tbody>
        </table>
      </section>
    </section>
  )
}
