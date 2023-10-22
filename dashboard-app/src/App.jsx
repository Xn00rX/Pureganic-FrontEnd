import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import ProductList from './Pages/Productlist'
import Cart from './Pages/Cart'
import AddProduct from './Components/AddProduct'
import AddCategory from './Components/AddCategory'
import Login from './Pages/Login'
import Register from './Pages/Register'
import PasswordChange from './Pages/PasswordChange'
import Userprofile from './Pages/Userprofile'
import { CheckSession } from './services/Auth'
import { useEffect } from 'react'


function App() {
  const [user, setUser] = useState(null)

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
      <Navbar  user={user} handleLogOut={handleLogOut}  />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/api/products" element={<ProductList />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/addcategory" element={<AddCategory />} />
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
