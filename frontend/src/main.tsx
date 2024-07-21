import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles/index.css'
import { pacienteRoutes, turnoRoutes } from './constants/NavigationComponents'
import App from './App'

const navigationRoutes = turnoRoutes.concat(pacienteRoutes)
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
