import { NavLink } from "react-router-dom"
import { AiOutlineShoppingCart } from "react-icons/Ai"
import { useState, useEffect } from "react"
import axios from "axios"
import "../App.css"

const Navbar = ({ user, handleLogOut, totalQuantity }) => {
  const userOptions = user && (
    <nav className="Navbar">
      <div>
        <NavLink to="/"> Home </NavLink>
        {/* <NavLink to="/addcategory">Add Category</NavLink> */}
        {/* <NavLink to="/addcategory">Add Category</NavLink> */}

        <NavLink to="/api/products">Products</NavLink>
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
      <NavLink to="/"> Home </NavLink>
      <NavLink to="api/products">Products</NavLink>
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
}

export default Navbar
