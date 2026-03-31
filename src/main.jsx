import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { ApplicationProvider } from './context/ApplicationContext'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ApplicationProvider>
        <App />
      </ApplicationProvider>
    </BrowserRouter>
  </StrictMode>,
)
