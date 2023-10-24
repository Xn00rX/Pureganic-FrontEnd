import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import ProductList from './Pages/Productlist'
import Cart from './Pages/Cart'
import AddProduct from './Components/AddProduct'
import Login from './Pages/Login'
import Register from './Pages/Register'
import PasswordChange from './Pages/PasswordChange'
import Userprofile from './Pages/Userprofile'
import { CheckSession } from './services/Auth'
import { useEffect } from 'react'
import axios from 'axios'
import Footer from './Components/footer'
import Event from './Pages/Event'
import ShowEvent from './Pages/ShowEvent'


function App() {
  const [user, setUser] = useState(null)
  const [updatedUser, setUpdatedUser] = useState(null)

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }

  const checkToken = async () => {
    const user = await CheckSession()
    console.log(user)
    console.log(user.id)
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
      <Navbar user={user} handleLogOut={handleLogOut} />
      <main className='main'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event" element={<Event />} />
          <Route path="/showevents" element={<ShowEvent />} />
          <Route path="/api/products" element={<ProductList />} />
          <Route path="/addproduct" element={<AddProduct  user={user}/>} />
          <Route path="/cart/:id" element={<Cart />} />
          <Route path="/signin" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userprofile" element={<Userprofile user={user} />} />
          <Route  path="/passwordchange" element={<PasswordChange user={user} />} />
   
        </Routes>
      </main>
      <Footer></Footer>
    </div>
  )
}

export default App
