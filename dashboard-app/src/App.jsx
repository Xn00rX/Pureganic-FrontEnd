import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Login from './Pages/Login'

import Dumy from './Pages/Dumy'
import ImageUpload from './Pages/Image'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar/>
      <main>
        <Home/>
        <Login/>

        <Dumy/>
        
        <ImageUpload/>
      </main>
    </div>
  )
}

export default App
