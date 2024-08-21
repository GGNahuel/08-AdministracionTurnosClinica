import React from "react"
import { useGetAllPacientes } from "../../hooks/PacienteRequests"
import { useSelectedCheckboxesObject } from "../../hooks/SelectChecboxes"
import { useGetTurnosByPaciente } from "../../hooks/TurnoRequests"
import { Paciente } from "../../types/Entities"
import { SelectItemCheckbox } from "../utilities/ListSelector"
import { useTableOptions } from "../../hooks/useTableOptions"

export function PacienteListado() {
  const allPacientes = useGetAllPacientes()
  const results = allPacientes?.results as Paciente[]

  const { pacienteSelectedByDni, setPacienteSelected } = useGetTurnosByPaciente()
  const showTurnos = (dniPaciente: string) => {
    if (pacienteSelectedByDni.dni != dniPaciente) {
      setPacienteSelected(prevState => ({
        ...prevState,
        dni: dniPaciente
      }))
    }
    else {
      setPacienteSelected(prevState => ({
        ...prevState,
        dni: ""
      }))
    }
  }

  const selectCheckboxesState = useSelectedCheckboxesObject()
  const {selectedEntitiesFunction, component: TableOptions} = useTableOptions()

  return (
    <>
      <section>
        <h2>Listado de pacientes</h2>
        <TableOptions entityType="pacientes" selectedCheckboxesState={selectCheckboxesState} childs={results}/>
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
                  {pacienteSelectedByDni.dni === paciente.dni && 
                    (pacienteSelectedByDni.turnos.length > 0 ? 
                      pacienteSelectedByDni.turnos?.map((turno) => (
                        <tr className="list turno">
                          <td colSpan={6}>
                            <table>
                              <thead>
                                <tr>
                                  <th>Fecha</th>
                                  <th>Horario</th>
                                  <th>Area profesional</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{turno.fecha} - {turno.fecha}</td>
                                  <td>{turno.horario}:{turno.horario}</td>
                                  <td>{turno.areaProfesional}</td>
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
    </>
  )
}
