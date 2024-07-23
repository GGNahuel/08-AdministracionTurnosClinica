import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'

import App from './App'
import './styles/index.css'

import { concatArrays } from './functions/Utilities'
import { pacienteRoutes, profesionalRoutes, turnoRoutes } from './constants/RouteObjects'

const navigationRoutes = concatArrays(turnoRoutes, pacienteRoutes, profesionalRoutes) as RouteObject[]
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: navigationRoutes
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
