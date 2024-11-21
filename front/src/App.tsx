import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TravelForms } from './components/TravelForms'

function App() {
  const [count, setCount] = useState(0)

  return (
    <TravelForms />
  )
}

export default App
