
import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Dumy from './Pages/Dumy'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/register" element={<Dumy />} />
        </Routes>
      </main>
    </div>
  );
}


export default App
