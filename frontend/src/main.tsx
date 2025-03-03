import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/route'


createRoot(document.getElementById("main-content")!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
