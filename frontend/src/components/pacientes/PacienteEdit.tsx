import { usePutPaciente } from "../../requests/PacienteRequests"
import { Paciente } from "../../types/Entities"
import Message from "../utilities/Message"

export function EditPacienteForm(props : {fieldsValuesState: Paciente, handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
  const {fieldsValuesState, handleOnChange} = props
  const {sendPutRequest, returnValue} = usePutPaciente()

  return (
    <>
      {returnValue?.message.text && <Message messageObject={returnValue.message} />}
      <form onSubmit={(e) => sendPutRequest(e)}>
        <input type="hidden" name="id" value={fieldsValuesState.id} />
        <label>Nombre completo: <input type="text" name="nombreCompleto" value={fieldsValuesState.nombreCompleto} onChange={(e) => handleOnChange(e)}/></label>
        <label>DNI: <input type="text" name="dni" value={fieldsValuesState.dni} onChange={(e) => handleOnChange(e)}/></label>
        <label>Número de telefono: <input type="number" name="numeroContacto" value={fieldsValuesState.numeroContacto} onChange={(e) => handleOnChange(e)}/></label>
        <label>Obra social: <input type="text" name="obraSocial" value={fieldsValuesState.obraSocial} onChange={(e) => handleOnChange(e)}/></label>
        <button type="submit">Aplicar</button>
      </form>
    </>
  )
}