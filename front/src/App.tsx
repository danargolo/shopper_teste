import { useState } from 'react'
import './App.css'
import { TravelForms } from './components/TravelForms'
import { TravelOptions } from './components/TravelOptions'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TravelForms />
      <TravelOptions />
    </>
  )
}

export default App
