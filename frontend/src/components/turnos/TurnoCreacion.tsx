import { useState } from "react";
import { useGetAllAreas } from "../../hooks/AreaRequests";
import { usePostTurno } from "../../hooks/TurnoRequests";
import { AreaProfesional, Paciente, ProfesionalMed } from "../../types/Entities";
import { useGetProfesionalsByArea } from "../../hooks/ProfesionalRequests";
import { useGetPacientesByName } from "../../hooks/PacienteRequests";

export function TurnoCreacion() {
  const [areaSelected, setAreaSelected] = useState<string>("")
  const [searchPaciente, setSearchPaciente] = useState<string>("")

  const {sendData} = usePostTurno()
  const allAreas = useGetAllAreas()?.results as AreaProfesional[]
  const pacientesList = useGetPacientesByName(searchPaciente)?.results as Paciente[]

  const profesionalesByAreas = useGetProfesionalsByArea(areaSelected)?.results as ProfesionalMed[]

  return (
    <section className="registerSection">
      <h1>Registrar turno</h1>
      <form id="turnoForm" onSubmit={(ev) => {
        sendData(ev)
      }}>
        <label>
          Servicio: 
          <select name="area" onChange={(ev) => setAreaSelected(ev.target.value)}>
            <option value={""}>Seleccione un área</option>
            {allAreas.map(area => (
              <option key={area.nombre} value={area.nombre}>{area.nombre}</option>
            ))}
          </select>
        </label>
        <label>
          Profesional: 
          <select name="profesional" required>
            {areaSelected != "" ?
              profesionalesByAreas?.map(profesional => (
                <option key={profesional.dni} value={profesional.dni}>{profesional.nombreCompleto}</option>
              )) :
              <option>Seleccione un área para ver los profesionales disponibles</option>
            }
          </select>
        </label>
        <label>
          Nombre del paciente: (Ingrese el nombre y seleccione de la lista)
          <div className="grid autoColumns">
            <input type="search" onChange={(ev) => setSearchPaciente(ev.target.value)}/>
            <select name="paciente">
              {pacientesList?.length == 0 && <option value={""}>Ingrese el nombre para seleccionar el paciente</option>}
              {pacientesList?.map(paciente => (
                <option key={paciente.dni} value={paciente.dni}>{paciente.nombreCompleto}</option>
              ))}
            </select>
          </div>
        </label>
        <label>
            Fecha: 
            <input type="date" name="fecha" placeholder="Horario"/>
        </label>
        <button type="submit">Enviar</button>
      </form>
      <section id="turnPicker">
        
      </section>
    </section>
  )
}