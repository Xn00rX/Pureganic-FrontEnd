
import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import { CheckSession } from './services/Auth'
import {  useEffect } from 'react'
import Userprofile from './Pages/Userprofile';
import Hello from './Pages/Hello';

function App() {

  const [user, setUser] = useState(null)

  const handleLogOut = () => {
   
    setUser(null)
    localStorage.clear()
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)

  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])
  return (
    <div>
      <Navbar user={user}
        handleLogOut={handleLogOut} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Login setUser={setUser} />} />
          <Route path="/register" element={< Register />} />
          <Route path="/userprofile" element={< Userprofile user={user} />} />
        </Routes>
      </main>
    </div>
  );
}


export default App
