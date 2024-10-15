export function LoadingMessage({condition} : {condition: boolean}) {
  return condition ? <p>Cargando...</p> : <></>
}