import { usePostPaciente } from "../../hooks/PacienteRequests"
import { Paciente } from "../../types/Entities"

export function PacienteCreacion() {
  const {returnedPost, sendPacienteToPost} = usePostPaciente()

  return (
    <>
      <section>
        {returnedPost.message.text && <h2>{returnedPost.message.text}</h2>}
        {/* {returnedPost.results?.map((element, index) => <p key={index}>{element as string}</p>)} */}
        <form id="pacienteForm" onSubmit={(ev) => sendPacienteToPost(ev)}>
          <input type="text" name="nombreCompleto" placeholder="Ingrese el nombre" />
          <input type="text" name="dni" placeholder="Ingrese el dni" />
          <input type="number" name="numeroContacto" placeholder="Ingrese el número de teléfono" />
          <input type="text" name="obraSocial" placeholder="Obra social" />
          <button type="submit">Enviar</button>
        </form>
        {returnedElement(returnedPost.returnValue as Paciente)}
      </section>
    </>
  )
}

const returnedElement = (returnedPost: Paciente) => {
  if (!returnedPost) return
  const pacienteRegistrado = returnedPost

  return (
    <article key={pacienteRegistrado.id} className="list paciente" style={{ border: "2px solid black", margin: "10px" }}>
      <p>{pacienteRegistrado.id}</p>
      <p>{pacienteRegistrado.nombreCompleto}</p>
      <p>{pacienteRegistrado.dni}</p>
      <p>{pacienteRegistrado.numeroContacto}</p>
      <p>{pacienteRegistrado.obraSocial}</p>
    </article>
  )
}