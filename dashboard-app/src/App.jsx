import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import ProductList from './Pages/Productlist'
import Product from './Components/Product'
import Cart from './Pages/Cart'
import AddProduct from './Components/AddProduct'
import AddCatgeory from './Components/AddCategory'
import UpdateProduct from './Pages/UpdateProduct'
import Login from './Pages/Login'
import Register from './Pages/Register'
import PasswordChange from './Pages/PasswordChange'
import Userprofile from './Pages/Userprofile'
import { CheckSession } from './services/Auth'
import { useEffect } from 'react'
import axios from 'axios'

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

  const hello = async () => {
    console.log(user.id)
    let response = await axios.get(`http://localhost:4000/userinfo/${user.id}`)
    console.log(response.data)
    setUpdatedUser(response.data)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
      hello()
    }
  }, [])

  return (
    <div>
      <Navbar user={user} handleLogOut={handleLogOut} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/productdelete/:product_id" element={<Product />} />
          <Route
            path="/productupdate/:product_id"
            element={<UpdateProduct />}
          />
          <Route path="/api/products" element={<ProductList />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/addcategory" element={<AddCatgeory />} />
          <Route path="/cart/:id" element={<Cart />} />
          <Route path="/signin" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userprofile" element={<Userprofile user={user} />} />
          <Route
            path="/passwordchange"
            element={<PasswordChange user={user} />}
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
