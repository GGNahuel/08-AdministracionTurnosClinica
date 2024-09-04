import { useState } from "react"
import { AreaProfesional } from "../../types/Entities"
import { usePutArea } from "../../hooks/AreaRequests"

export function EditAreaForm(props : {entity: AreaProfesional}) {
  const {entity} = props
  const [checkboxFieldValues, setCheckboxFieldValues] = useState(entity.necesitaTurno)
  const {sendPutRequest} = usePutArea()

  const handleOnChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.checked

    setCheckboxFieldValues(newValue)
  }

  return (
    <form onSubmit={(e) => sendPutRequest(e)}>
      <input type="hidden" name="id" value={entity.id} />
      <label>Número de consultorio
        <input type="text" name="nombre" value={entity.nombre}/>
        <label>Desmarque la casilla si el área es por orden de llegada
          <input type="checkbox" name="necesitaTurno" checked={checkboxFieldValues} onChange={(e) => handleOnChangeCheckbox(e)}/>
        </label>
      </label>
      <button type="submit">Aplicar</button>
    </form>
  )
}