import { useRouteError } from "react-router-dom";

export function ErrorComponent() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError()

  return (
    <section>
      <h1>Error</h1>
      <h2>{error.data ? error.data.text : error.message}</h2>
      <p>{error.status}</p>
    </section>
  )
}