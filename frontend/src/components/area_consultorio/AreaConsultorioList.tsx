import { useGetAllAreas } from "../../hooks/AreaRequests";
import { useGetAllConsultorios } from "../../hooks/ConsultorioRequests";
import { useGetAllProfesionales } from "../../hooks/ProfesionalRequests";
import { useSelectedCheckboxesObject } from "../../hooks/SelectChecboxes";
import { AreaProfesional, Consultorio, ProfesionalMed } from "../../types/Entities";
import { SelectItemCheckbox } from "../utilities/ListSelector";

import { useTableOptions } from "../../hooks/useTableOptions";

export function AreaConsList() {
  const areas = useGetAllAreas()?.results as AreaProfesional[]
  const consultorios = useGetAllConsultorios()?.results as Consultorio[]
  const profesionales = useGetAllProfesionales()?.results as ProfesionalMed[]

  const selectCheckboxesState = useSelectedCheckboxesObject()
  const {selectedEntitiesFunction, component: TableOptions} = useTableOptions()

  return (
    <section>
      <h1>Listados</h1>
      <section>
        <h2>Consultorios existentes</h2>
        <TableOptions entityType="consultorios" />
        <table className="table">
          <thead>
            <tr>
              <th className="checkbox">
                <SelectItemCheckbox 
                  selectedCheckboxesObject={selectCheckboxesState} 
                  fatherName="consultorios" fatherOrChild="father" 
                  childElements={consultorios} markSelectedEntitiesFunction={selectedEntitiesFunction}
                />
              </th>
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
        <TableOptions entityType="areas" />
        <table className="table">
          <thead>
            <tr>
              <th className="checkbox">
                <SelectItemCheckbox 
                  selectedCheckboxesObject={selectCheckboxesState} 
                  fatherName="areas" fatherOrChild="father" 
                  childElements={areas} markSelectedEntitiesFunction={selectedEntitiesFunction} 
                />
              </th>
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