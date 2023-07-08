import { useState } from 'react'
import './App.css'

import CurrentLocation from './component/CurrentLocation'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='container'>
      <CurrentLocation/>   
    </div>
  )
}

export default App
