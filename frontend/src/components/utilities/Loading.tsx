export function LoadingMessage({condition, inTable} : {condition: boolean, inTable?: boolean}) {
  return condition ? (inTable ? <tr><td>Cargando...</td></tr> : <p>Cargando...</p>) : <></>
}