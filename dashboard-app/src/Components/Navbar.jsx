import { NavLink } from 'react-router-dom'
import { AiOutlineShoppingCart } from 'react-icons/Ai'
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'

const Navbar = ({ user, userType, handleLogOut, totalQuantity }) => {
  const adminOptions = userType === 'seller' && (
    <nav className="Navbar">
      <div>
        <NavLink to="/"> Home </NavLink>
        <NavLink to="/api/products">Products</NavLink>
        <NavLink to="/showevents">Explore Events</NavLink>
        <NavLink to="/addproducts"> Add Product </NavLink>
        <NavLink to="/addcategory"> Add Category </NavLink>
        <NavLink to="/event">Event</NavLink>
        <NavLink to="/viewproducts">View Products</NavLink>
        <NavLink to="/viewcategories">View Categories</NavLink>
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

  const userOptions = user && userType !== 'seller' && (
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

  console.log(userType)

  const publicOptions = !user && userType !== 'seller' && (
    <nav>
      <NavLink to="/"> Home </NavLink>
      <NavLink to="api/products">Products</NavLink>
      <NavLink to="/showevents">Explore Events</NavLink>
      <NavLink to="/signin"> Login </NavLink>
      <NavLink to="/register"> Register </NavLink>
    </nav>
  )

  return (
    <header className="Navbar">
      {publicOptions || adminOptions || userOptions}
    </header>
  )
}

export default Navbar
