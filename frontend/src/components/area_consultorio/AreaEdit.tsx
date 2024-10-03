import { useState } from "react"
import { AreaProfesional } from "../../types/Entities"
import { usePutArea } from "../../requests/AreaRequests"
import Message from "../utilities/Message"

export function EditAreaForm(props : {fieldsValuesState: AreaProfesional, handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
  const {fieldsValuesState, handleOnChange} = props
  const [checkboxFieldValues, setCheckboxFieldValues] = useState(fieldsValuesState.necesitaTurno)
  const {sendPutRequest, returnValue} = usePutArea()

  const handleOnChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.checked

    setCheckboxFieldValues(newValue)
  }

  return (
    <>
      {returnValue?.message.text && <Message messageObject={returnValue.message} />}
      <form onSubmit={(e) => sendPutRequest(e)}>
        <input type="hidden" name="id" value={fieldsValuesState.id} />
        <label>Número de consultorio
          <input type="text" name="nombre" value={fieldsValuesState.nombre} onChange={(e) => handleOnChange(e)}/>
          <label>Desmarque la casilla si el área es por orden de llegada
            <input type="checkbox" name="necesitaTurno" checked={checkboxFieldValues} onChange={(e) => handleOnChangeCheckbox(e)}/>
          </label>
        </label>
        <button type="submit">Aplicar</button>
      </form>
    </>
  )
}