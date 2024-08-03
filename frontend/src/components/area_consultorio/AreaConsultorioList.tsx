import React, { useState } from "react";
import { useGetAllAreas } from "../../hooks/AreaRequests";
import { useGetAllConsultorios } from "../../hooks/ConsultorioRequests";
import { useGetAllProfesionales } from "../../hooks/ProfesionalRequests";
import { AreaProfesional, Consultorio, Entities, ProfesionalMed } from "../../types/Entities";
import { selectNamingAttributeFromEntity } from "../../functions/Utilities";

export function AreaConsList() {
  const areas = useGetAllAreas()?.results as AreaProfesional[]
  const consultorios = useGetAllConsultorios()?.results as Consultorio[]
  const profesionales = useGetAllProfesionales()?.results as ProfesionalMed[]

  /* ej selectedCheckboxes: 
  {
    consultorios: {
      consultorio_1: true,
      consultorio_2: false
    },
    areas: {
      Odontología: true,
      ...
    }
  }
  */
  type FatherCheckboxes = "consultorios" | "areas" | "pacientes" | "turnos" | "profesionales"
  const [selectedCheckboxes, setSeletedCheckboxes] = useState<Record<FatherCheckboxes, Record<string, boolean>>>({
    consultorios: {}, 
    areas: {}, 
    pacientes: {}, 
    turnos: {}, 
    profesionales: {} 
  })

  const selectorFatherOnChange = (ev: React.ChangeEvent<HTMLInputElement>, fatherName: FatherCheckboxes, childElements: Entities[]) => {
    const { checked } = ev.target
    const updateSelectedcheckboxes: Record<FatherCheckboxes, Record<string, boolean>> = {... selectedCheckboxes}

    updateSelectedcheckboxes[fatherName] = {}
    childElements.forEach(entity => {
      const keyNameFromEntity = selectNamingAttributeFromEntity(entity)
      updateSelectedcheckboxes[fatherName][keyNameFromEntity] = checked
    })

    setSeletedCheckboxes(updateSelectedcheckboxes)
  }

  const selectorChildOnChange = (ev: React.ChangeEvent<HTMLInputElement>, fatherName: FatherCheckboxes, childEntity: Entities) => {
    const {checked} = ev.target
    const keyNameFromEntity = selectNamingAttributeFromEntity(childEntity)

    setSeletedCheckboxes(prev => ({
      ...prev,
      [fatherName]: {
        ...prev[fatherName],
        [keyNameFromEntity]: checked
      }
    }))
  }

  const setCheckedSelectorFather = (fatherName: FatherCheckboxes, childElements: Entities[]) => {
    // inicializa el selectedCheckboxes según las entidades de la tabla
    childElements?.forEach(entity => {
      const keyNameFromEntity = selectNamingAttributeFromEntity(entity)
      if (!selectedCheckboxes[fatherName][keyNameFromEntity]) {
        selectedCheckboxes[fatherName][keyNameFromEntity] = false
      }
    })

    const childCheckboxesValues = Object.values(selectedCheckboxes[fatherName])
    if (childCheckboxesValues.length == 0) return false

    if (childCheckboxesValues.every(value => value)) return true
    else return false
  }

  return (
    <section>
      <h1>Listados</h1>
      <section>
        <h2>Consultorios existentes</h2>
        <table className="table">
          <thead>
            <tr>
              <th><input type="checkbox" checked={setCheckedSelectorFather("consultorios", consultorios)} onChange={(ev)=> selectorFatherOnChange(ev, "consultorios", consultorios)} /></th>
              <th>Número</th>
              <th>Profesional asignado</th>
            </tr>
          </thead>
          <tbody>
            {consultorios?.map(consultorio => {
              const profesionalAsignado = profesionales?.find(profesional => profesional.consultorio == consultorio.numeroConsultorio)

              return(
                <tr key={consultorio.numeroConsultorio}>
                  <td className="center">
                    <input type="checkbox" checked={selectedCheckboxes.consultorios[consultorio.numeroConsultorio] || false}
                      onChange={(ev) => selectorChildOnChange(ev, "consultorios", consultorio)} />
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
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Activa</th>
            </tr>
          </thead>
          <tbody>
            {areas?.map(area => (
              <tr key={area.nombre} className={area.activa ? "" : "inactive"}>
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