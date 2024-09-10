import { usePostPaciente } from "../../requests/PacienteRequests"
import { Paciente } from "../../types/Entities"
import Message from "../utilities/Message"

export function PacienteCreacion() {
  const {returnedPost, sendPacienteToPost} = usePostPaciente()

  return (
    <section id="registerPaciente" className="registerSection">
      <header>
        <h1>Registrar nuevo paciente</h1>
        <h3>Ingrese los datos correspondientes al paciente que quiera registrar</h3>
      </header>
      {returnedPost?.message.text && <Message messageObject={returnedPost.message}/>}
      <form id="pacienteForm" onSubmit={(ev) => sendPacienteToPost(ev)}>
        <label>Nombre completo: <input type="text" name="nombreCompleto" placeholder="Ingrese el nombre" /></label>
        <label>DNI: <input type="text" name="dni" placeholder="Ingrese el dni" /></label>
        <label>Número de telefono: <input type="number" name="numeroContacto" placeholder="Ingrese el número de teléfono" /></label>
        <label>Obra social: <input type="text" name="obraSocial" placeholder="Obra social" /></label>
        <button type="submit">Enviar</button>
      </form>
      {returnedPost?.returnValue && (<>
        <h3>Datos del paciente registrado:</h3>
        <ReturnedElement returnedPost={returnedPost.returnValue as Paciente}/>
        {/*Agregar boton de edición*/}
      </>)}
    </section>
  )
}

function ReturnedElement({returnedPost} : {returnedPost: Paciente}) {
  if (!returnedPost) return
  const pacienteRegistrado = returnedPost

  return (
    <article key={pacienteRegistrado.id} className="grid paciente" style={{ border: "2px solid black", margin: "10px" }}>
      <p>{pacienteRegistrado.id}</p>
      <p>{pacienteRegistrado.nombreCompleto}</p>
      <p>{pacienteRegistrado.dni}</p>
      <p>{pacienteRegistrado.numeroContacto}</p>
      <p>{pacienteRegistrado.obraSocial}</p>
    </article>
  )
}