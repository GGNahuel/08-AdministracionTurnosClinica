import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import { ViewContextProvider } from './context/NavigationContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ViewContextProvider>
      <App />
    </ViewContextProvider>
  </React.StrictMode>,
)
