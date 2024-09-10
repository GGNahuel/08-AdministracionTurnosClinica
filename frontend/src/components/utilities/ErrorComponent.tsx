import { useRouteError } from "react-router-dom";

export function ErrorComponent() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError()

  return (
    <section className="errorMessage">
      <h1>Lo sentimos, algo salió mal</h1>
      <h2>{error.data ? error.data.text : error.message}</h2>
      <p>Error {error.status}</p>
    </section>
  )
}