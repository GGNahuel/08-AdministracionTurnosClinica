import { useState } from "react"
import { useGetAllAreas } from "../../hooks/AreaRequests"
import { useGetAllConsultorios } from "../../hooks/ConsultorioRequests"
import { usePostProfesional } from "../../hooks/ProfesionalRequests"
import { AreaProfesional, Consultorio, ProfesionalMed } from "../../types/Entities"
import Message from "../navbar&UI/Message"

export function ProfesionalCreacion() {
  const [selectedAreas, setSelectedAreas] = useState<string[]>([])
  const {returnedPost, sendProfesionalToPost} = usePostProfesional()
  const areas = useGetAllAreas()?.results as AreaProfesional[]
  const consultorios = useGetAllConsultorios()?.results as Consultorio[]

  const handleOnChangeAreasInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = ev.target

    setSelectedAreas(prev => checked ?
      [...prev, value] :
      prev.filter(areaName => areaName !== value)
    )
  }

  return (
    <section id="registerProfesional" className="registerSection">
      <h1>Registrar nuevo paciente</h1>
      <h3>Ingrese los datos correspondientes al profesional que quiera registrar</h3>
      {returnedPost?.message.text && <Message messageObject={returnedPost.message}/>}
      <form id="profesionalForm" onSubmit={(ev) => sendProfesionalToPost(ev, selectedAreas)}>
        <label>Nombre completo: <input type="text" name="nombreCompleto" placeholder="Ingrese el nombre" /></label>
        <label>DNI: <input type="text" name="dni" placeholder="Ingrese el dni" /></label>
        <label>Número de telefono: <input type="number" name="numeroContacto" placeholder="Ingrese el número de teléfono" /></label>
        <label>Consultorio: 
          <select name="consultorio">
            {consultorios?.map(consultorio => {
              const numero = consultorio.numeroConsultorio
              return <option key={numero} value={numero}>{numero}</option>
            })}
          </select>
        </label>
        <div className="grid">Áreas de ocupación:
          {areas?.map(area => area.activa && (
            <label key={area.id}><input type="checkbox" name={area.nombre} onChange={handleOnChangeAreasInput} />{area.nombre}</label>
          ))}
        </div>
        <button type="submit">Enviar</button>
      </form>
      {returnedPost?.returnValue && (<>
        <h3>Datos del paciente registrado:</h3>
        <ReturnedElement returnedPost={returnedPost.returnValue as ProfesionalMed}/>
        {/*Agregar boton de edición*/}
      </>)}
    </section>
  )
}

function ReturnedElement({returnedPost} : {returnedPost: ProfesionalMed}) {
  if (!returnedPost) return
  const pacienteRegistrado = returnedPost

  return (
    <article key={pacienteRegistrado.id} className="grid profesional" style={{ border: "2px solid black", margin: "10px" }}>
      <p>{pacienteRegistrado.id}</p>
      <p>{pacienteRegistrado.nombreCompleto}</p>
      <p>{pacienteRegistrado.dni}</p>
      <p>{pacienteRegistrado.numeroContacto}</p>
      <p>{pacienteRegistrado.consultorio}</p>
      <p>Áreas de ocupación</p>
    </article>
  )
}