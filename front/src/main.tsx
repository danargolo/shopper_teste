import { createRoot } from 'react-dom/client'
import './main.css'
import App from './App.tsx'
import { RenderProvider } from './context/renderContext.tsx'

createRoot(document.getElementById('root')!).render(
  <RenderProvider>
    <App />
  </RenderProvider>

  
)
