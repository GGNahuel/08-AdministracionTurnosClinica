import { usePutPaciente } from "../../hooks/PacienteRequests"
import { Paciente } from "../../types/Entities"

export function EditPacienteForm(props : {entity: Paciente}) {
  const {entity} = props
  const {sendPutRequest} = usePutPaciente()

  return (
    <form onSubmit={(e) => sendPutRequest(e)}>
      <input type="hidden" name="id" value={entity.id} />
      <label>Nombre completo: <input type="text" name="nombreCompleto" value={entity.nombreCompleto}/></label>
      <label>DNI: <input type="text" name="dni" value={entity.dni}/></label>
      <label>Número de telefono: <input type="number" name="numeroContacto" value={entity.numeroContacto}/></label>
      <label>Obra social: <input type="text" name="obraSocial" value={entity.obraSocial}/></label>
      <button type="submit">Aplicar</button>
    </form>
  )
}