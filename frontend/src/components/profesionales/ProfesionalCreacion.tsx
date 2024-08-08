import { useState } from "react"
import { useGetAllAreas } from "../../hooks/AreaRequests"
import { useGetAllConsultorios } from "../../hooks/ConsultorioRequests"
import { usePostProfesional } from "../../hooks/ProfesionalRequests"
import { AreaProfesional, Consultorio, ProfesionalMed } from "../../types/Entities"
import Message from "../utilities/Message"

export function ProfesionalCreacion() {
  const [selectedAreas, setSelectedAreas] = useState<string[]>([])
  const {returnedPost, sendProfesionalToPost} = usePostProfesional()
  const areas = useGetAllAreas()?.results as AreaProfesional[]
  const consultorios = useGetAllConsultorios()?.results as Consultorio[]

  const handleOnChangeAreasInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = ev.target

    setSelectedAreas(prev => checked ?
      [...prev, name] :
      prev.filter(areaName => areaName !== name)
    )
  }

  return (
    <section id="registerProfesional" className="registerSection">
      <header>
        <h1>Registrar nuevo profesional médico</h1>
        <h3>Ingrese los datos correspondientes al profesional que quiera registrar</h3>
      </header>
      {returnedPost?.message.text && <Message messageObject={returnedPost.message}/>}
      <form id="profesionalForm" onSubmit={(ev) => sendProfesionalToPost(ev, selectedAreas)}>
        <label>Nombre completo: <input type="text" name="nombreCompleto" placeholder="Ingrese el nombre" /></label>
        <label>DNI: <input type="text" name="dni" placeholder="Ingrese el dni" /></label>
        <label>Número de telefono: <input type="number" name="numeroContacto" placeholder="Ingrese el número de teléfono" /></label>
        <label>Número de matricula: <input type="number" name="matricula" /></label>
        <label>Consultorio: 
          <select name="consultorio">
            {consultorios?.map(consultorio => {
              const numero = consultorio.numeroConsultorio
              return <option key={numero} value={numero}>{numero}</option>
            })}
          </select>
        </label>
        <div className="grid autoColumns">Áreas de ocupación:
          <div className="checkboxContainer">
            {areas?.map(area => area.activa && (
              <div key={area.id}><label><input type="checkbox" name={area.nombre} onChange={handleOnChangeAreasInput} />{area.nombre}</label></div>
            ))}
          </div>
        </div>
        <label className="moreInfoLabel">Horarios: <input type="text" name="horarios" placeholder="Ingrese los horarios en los que trabaja el profesional"/></label>
        <div className="moreInfo">
          <p>Los horarios deben tener el siguiente formato: "hora":"minutos" (formato de 24 horas).</p>
          <p>Se puede indicar un rango de horarios usando el "-". Ej: 08:00-12:30. Para separar horarios use ", " (coma seguida de un espacio).</p>
          <p>Ej: "08:00-12:30, 16:00-18:30, 20:00" significa que trabaja de 8 a 12:30, de 16 a 18:30, y a las 20hs.</p>
        </div>
        <button type="submit">Enviar</button>
      </form>
      {returnedPost?.message.messageType != "error" && returnedPost?.returnValue && (<>
        <h3>Datos del Profesional registrado:</h3>
        <ReturnedElement returnedPost={returnedPost.returnValue as ProfesionalMed}/>
        {/*Agregar boton de edición*/}
      </>)}
    </section>
  )
}

function ReturnedElement({returnedPost} : {returnedPost: ProfesionalMed}) {
  if (!returnedPost) return
  const profesionalRegistrado = returnedPost

  return (
    <article key={profesionalRegistrado.id} className="grid profesional" style={{ border: "2px solid black", margin: "10px" }}>
      <p>{profesionalRegistrado.id}</p>
      <p>{profesionalRegistrado.nombreCompleto}</p>
      <p>{profesionalRegistrado.dni}</p>
      <p>{profesionalRegistrado.numeroContacto}</p>
      <p>{profesionalRegistrado.consultorio}</p>
      <p>Áreas de ocupación</p>
    </article>
  )
}