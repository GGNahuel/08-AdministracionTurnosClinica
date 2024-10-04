import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'

import App from './App'
import './styles/index.css'

import { concatArrays } from './functions/Utilities'
import { AreaConsultorioRoutes, pacienteRoutes, profesionalRoutes, turnoRoutes, UsuarioRoutes } from './constants/RouteObjects'
import { SessionContextProvider } from './context/SessionContext'

const navigationRoutes = concatArrays(
  turnoRoutes, pacienteRoutes, profesionalRoutes, AreaConsultorioRoutes, UsuarioRoutes
) as RouteObject[]
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: navigationRoutes
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SessionContextProvider>
      <RouterProvider router={router} />
    </SessionContextProvider>
  </React.StrictMode>,
)
