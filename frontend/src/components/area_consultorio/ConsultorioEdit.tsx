import { usePutConsultorio } from "../../requests/ConsultorioRequests"
import { Consultorio } from "../../types/Entities"

export function EditConsultorioForm(props : {entity: Consultorio}) {
  const {entity} = props
  const {sendPutRequest} = usePutConsultorio()

  return (
    <form onSubmit={(e) => sendPutRequest(e)}>
      <input type="hidden" name="id" value={entity.id} />
      <label>Número de consultorio
        <input type="number" name="numeroConsultorio" value={entity.numeroConsultorio}/>
      </label>
      <button type="submit">Guardar</button>
    </form>
  )
}