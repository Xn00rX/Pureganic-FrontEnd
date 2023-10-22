import { useState } from "react"
import { Route, Routes } from "react-router-dom"
import "./App.css"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import ProductList from "./Pages/Productlist"
import Cart from "./Pages/Cart"
import AddProduct from "./Components/AddProduct"
import Login from "./Pages/Login"
import Register from "./Pages/Register"

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/api/products" element={<ProductList />} />
          <Route path="/addproduct" element={<AddProduct />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/cart/:id" element={<Cart />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
