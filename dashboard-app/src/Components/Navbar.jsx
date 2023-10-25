import { NavLink } from 'react-router-dom'
import { AiOutlineShoppingCart } from 'react-icons/Ai'
import logo from '../images/logo.png'
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'

<<<<<<< HEAD
const Navbar = ({ user, handleLogOut, totalQuantity }) => {
  const imageStyle = {
    width: '200px',
    height: '43px'
  }

  const userOptions = user && (
    <nav className="Navbar">
      <div>
        <NavLink to="/">
          <img src={logo} style={imageStyle} />
        </NavLink>
        {/* <NavLink to="/addcategory">Add Category</NavLink> */}
        {/* <NavLink to="/addcategory">Add Category</NavLink> */}

        <NavLink to="/products">Products</NavLink>
        <NavLink to="/register"> Register </NavLink>
        <NavLink to="/addproduct"> Add Product </NavLink>
        <NavLink to="/addcategory"> Add Category </NavLink>
        <NavLink to="/viewproducts">View Products</NavLink>
        <NavLink to="/viewcategories">View Categories</NavLink>
        <NavLink to="/userprofile">User Profile</NavLink>
        <NavLink to="/cart" className="cart">
          <span className="count">{totalQuantity}</span>
          <i className="material-icons">
            <AiOutlineShoppingCart />
          </i>
        </NavLink>
        <NavLink to="/orders">Orders</NavLink>
        <NavLink onClick={handleLogOut} to="/">
          Sign Out
        </NavLink>
      </div>
    </nav>
  )

  const publicOptions = (
    <nav>
      <NavLink to="/">
        <img src={logo} style={imageStyle} />
      </NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/event">Event</NavLink>
      <NavLink to="/showevents">Show Event</NavLink>
      <NavLink to="/addproduct">Add Product</NavLink>
      <NavLink to="/addcategory">Add Category</NavLink>
      <NavLink to="/viewproducts">View Products</NavLink>
      <NavLink to="/viewcategories">View Categories</NavLink>
      <NavLink to="/signin"> Login </NavLink>
      <NavLink to="/register"> Register </NavLink>
    </nav>
  )

  return <header className="Navbar">{userOptions || publicOptions}</header>
=======
const Navbar = ({ user, userType, handleLogOut, totalQuantity }) => {
  console.log(user)
  if (user) {
    if (userType === "buyer") {
      return (
        <nav className="Navbar">
          <div>
            <NavLink to="/"> Home </NavLink>
            <NavLink to="/api/products">Products</NavLink>
            <NavLink to="/showevents">Explore Events</NavLink>
            <NavLink to="/orders">Orders</NavLink>
            <NavLink to="/cart" className="cart">
              <span className="count">{totalQuantity}</span>
              <i className="material-icons">
                <AiOutlineShoppingCart />
              </i>
            </NavLink>
            <NavLink to="/userprofile">User Profile</NavLink>
            <NavLink onClick={handleLogOut} to="/">
              Sign Out
            </NavLink>
          </div>
        </nav>
      )
    } else if (userType === "seller") {
      return (
        <nav className="Navbar">
          <div>
            <NavLink to="/"> Home </NavLink>
            {/* <NavLink to="/api/products">Products</NavLink> */}
            {/* <NavLink to="/showevents">Explore Events</NavLink> */}
            <NavLink to="/addproduct"> Add Product </NavLink>
            <NavLink to="/addcategory"> Add Category </NavLink>
            <NavLink to="/event">Event</NavLink>
            <NavLink to="/viewproducts">View Products</NavLink>
            <NavLink to="/viewcategories">View Categories</NavLink>
            {/* <NavLink to="/orders">Orders</NavLink> */}
            {/* <NavLink to="/cart" className="cart">
              <span className="count">{totalQuantity}</span>
              <i className="material-icons">
                <AiOutlineShoppingCart />
              </i>
            </NavLink> */}
            <NavLink to="/userprofile">User Profile</NavLink>
            <NavLink onClick={handleLogOut} to="/">
              Sign Out
            </NavLink>
          </div>
        </nav>
      )
    }
  } else {
    return (
      <nav className="Navbar">
        <NavLink to="/"> Home </NavLink>
        <NavLink to="api/products">Products</NavLink>
        <NavLink to="/showevents">Explore Events</NavLink>
        <NavLink to="/signin"> Login </NavLink>
        <NavLink to="/register"> Register </NavLink>
      </nav>
    )
  }
>>>>>>> f9d9b0ed6adb18e84afba38692638c0cde2f86e5
}

export default Navbar
