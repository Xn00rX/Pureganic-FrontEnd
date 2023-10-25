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
        <div className="HomeParent">
          <p className="HomeHeading">
            We create your perfect
            <span className="changeColor"> farm</span>
          </p>
          <p className="homeParagraph">
            PureGanic offers a wide range of premium quality organic food
            products that are naturally grown and free from harmful chemicals,
            additives, and preservatives.
          </p>
          <Link to={'/products'}>
            <button className="btn btn-light hpbtn">Get started...</button>
          </Link>
        </div>
      </div>
      <div>
        <img src={SideBar} style={imageStyle} />
      </div>
    </div>
  )
}

export default Home
