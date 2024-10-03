import { usePutConsultorio } from "../../requests/ConsultorioRequests"
import { Consultorio } from "../../types/Entities"
import Message from "../utilities/Message"

export function EditConsultorioForm(props : {fieldsValuesState: Consultorio, handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
  const {fieldsValuesState, handleOnChange} = props
  const {sendPutRequest, returnValue} = usePutConsultorio()

  return (
    <>
      {returnValue?.message.text && <Message messageObject={returnValue.message} />}
      <form onSubmit={(e) => sendPutRequest(e)}>
        <input type="hidden" name="id" value={fieldsValuesState.id} />
        <label>Número de consultorio
          <input type="number" name="numeroConsultorio" value={fieldsValuesState.numeroConsultorio} onChange={(e) => handleOnChange(e)}/>
        </label>
        <button type="submit">Guardar</button>
      </form>
    </>
  )
}