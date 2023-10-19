import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar/>
      <div>
        <Home/>
      </div>
    </div>
  )
}

export default App
