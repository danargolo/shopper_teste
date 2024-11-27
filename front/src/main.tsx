import { createRoot } from 'react-dom/client'
import './main.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { RenderProvider } from './context/renderContext.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <RenderProvider>
      <App />
    </RenderProvider>
  </BrowserRouter>
  
)
