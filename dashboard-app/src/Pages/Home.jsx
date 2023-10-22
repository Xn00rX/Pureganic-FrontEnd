
import AddProduct from "../Components/AddProduct"
import Productlist from "../Pages/Productlist"
import Cart from "../Pages/Cart"
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'


const Home = () => {

  return (
    <div className="Home"> 
      <Link to="/signin">
        <button>Login</button>
      </Link>
      <Link to="/register">
        <button>Sign Up</button>
              {/* <AddProduct/>
  <button> Login </button>
  <button> Sign Up </button> */}
      {/* <Productlist /> */}
      <Cart />
      </Link>

      </div>
  )
}



export default Home