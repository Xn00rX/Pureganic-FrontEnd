import { NavLink } from "react-router-dom"
import { AiOutlineShoppingCart } from "react-icons/Ai"
import logo from "../images/logo.png"
import { useState, useEffect } from "react"
import axios from "axios"
import "../App.css"

const Navbar = ({ user, userType, handleLogOut, totalQuantity }) => {
  const imageStyle = {
    width: "200px",
    height: "43px",
  }
  console.log(user)
  console.log(userType)
  if (user) {
    if (userType === "buyer") {
      return (
        <nav className="Navbar">
          <div className="flex">
            <div>
              <NavLink to="/">
                <img src={logo} style={imageStyle} />
              </NavLink>
              <NavLink to="/products">Products</NavLink>
              <NavLink to="/showevents">Explore Events</NavLink>
              <NavLink to="/orders">Orders</NavLink>
              <NavLink to="/cart" className="cart">
                <span className="count">{totalQuantity}</span>
                <i className="material-icons">
                  <AiOutlineShoppingCart />
                </i>
              </NavLink>
            </div>
            <div>
              <NavLink to="/userprofile">User Profile</NavLink>
              <NavLink onClick={handleLogOut} to="/">
                Sign Out
              </NavLink>
            </div>
          </div>
        </nav>
      )
    } else if (userType === "seller") {
      return (
        <nav className="Navbar">
          <div>
            <NavLink to="/">
              <img src={logo} style={imageStyle} />
            </NavLink>{" "}
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
        <NavLink to="/">
          <img src={logo} style={imageStyle} />
        </NavLink>{" "}
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/showevents">Explore Events</NavLink>
        <NavLink to="/signin"> Login </NavLink>
        <NavLink to="/register"> Register </NavLink>
      </nav>
    )
  }
}

export default Navbar
