import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Zoo from './Zoo'
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Zoo />
  </StrictMode>,
)
