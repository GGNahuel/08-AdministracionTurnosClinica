import { Turno } from "../../types/Entities";

export function EditTurnModal(props: {turnToEdit: Turno}) {
  const {turnToEdit} = props

  return (
    <dialog open>
      <img src="/logoeEjemplo.png" alt="" />
      asdasd
      {turnToEdit.fecha}
      dsasa
      {turnToEdit.horario}
    </dialog>
  )
}