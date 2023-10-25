import AddProduct from '../Components/AddProduct'
import Productlist from '../Pages/Productlist'
import Cart from '../Pages/Cart'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SideBar from '../images/sidebar.jpg'

import '../App.css'

const Home = () => {
  const imageStyle = {
    width: '100%',
    height: '100%'
  }
  return (
    <div>
      <div className="Home">
        <p className="HomeHeading">
          we create your perfect <span>organic world</span>
        </p>
        <p></p>
      </div>
      <div>
        <img src={SideBar} style={imageStyle} />
      </div>
    </div>
  )
}

export default Home
