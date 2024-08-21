import { useState } from "react";
import { useGetAllAreas } from "../../hooks/AreaRequests";
import { useGetAllConsultorios } from "../../hooks/ConsultorioRequests";
import { useGetAllProfesionales } from "../../hooks/ProfesionalRequests";
import { useSelectedCheckboxesObject } from "../../hooks/SelectChecboxes";
import { AreaProfesional, Consultorio, Entities, ProfesionalMed } from "../../types/Entities";
import { SelectItemCheckbox } from "../utilities/ListSelector";
import { FatherCheckboxes } from "../../types/Others";
import { concatArrays } from "../../functions/Utilities";

export function AreaConsList() {
  const areas = useGetAllAreas()?.results as AreaProfesional[]
  const consultorios = useGetAllConsultorios()?.results as Consultorio[]
  const profesionales = useGetAllProfesionales()?.results as ProfesionalMed[]

  const selectCheckboxesState = useSelectedCheckboxesObject()

  /* para las acciones al seleccionar. Funcion en el elemento de la seccion que contiene la tabla, es función se ejecutará al hacer click en un input,
  es decir se ejecuta en el selectItemCheckbox (función que recibe como parametro). Esta función le va a pasar a un estado las entidades seleccionadas,
  otro componente recibirá/ tendrá ese estado y se encargará de aplicar las funciones correspondientes
  */
  const [selectedEntities, setSelectedEntities] = useState<Record<FatherCheckboxes, Entities[]>>({
    turnos: [],
    pacientes: [],
    profesionales: [],
    consultorios: [],
    areas: []
  })
  const selectedEntitiesFunction = (params : {entityType: FatherCheckboxes, inputChecked: boolean, entity?: Entities, entities?: Entities[]}) => {
    const {entityType, inputChecked, entity, entities} = params

    if ((entity == undefined && entities == undefined) || (entity != undefined && entities != undefined)) 
      throw new Error("La función debe recibir o una entidad o una lista de entidades")

    let updatedEntities: Entities[] = []

    if (inputChecked) {
      if (entity != undefined) {
        const temporalArray: Entities[] = []
        temporalArray.push(entity)
        updatedEntities = concatArrays(selectedEntities[entityType], temporalArray) as Entities[]
      } else if (entities != undefined) {
        entities.forEach(entitySelected => {
          updatedEntities.push(entitySelected)
        })
      }
    } else {
      updatedEntities = entity != undefined ? selectedEntities[entityType].filter(entitySelected => entitySelected.id != entity.id) : []
    }

    setSelectedEntities(prev => ({
        ...prev,
        [entityType]: updatedEntities 
      })
    )
  }

  return (
    <section>
      <h1>Listados</h1>
      <section>
        <h2>Consultorios existentes</h2>
        <nav>
          <button disabled={selectedEntities.consultorios.length != 1}>Editar</button>
          <button disabled={selectedEntities.consultorios.length == 0}>Dar de baja</button>
          <button disabled={selectedEntities.consultorios.length == 0}>Eliminar</button>
        </nav>
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