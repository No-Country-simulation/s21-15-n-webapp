import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import { Landing } from './page/landing/landing'
//import { Home } from './page/home/home'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Landing/>
  </StrictMode>,
)
