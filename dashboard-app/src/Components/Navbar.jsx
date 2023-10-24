import { NavLink } from "react-router-dom"
import "../App.css"


const Navbar = ({ user, handleLogOut }) => {
  const userOptions = user && (
    <nav className="Navbar">
      <div>
        <NavLink to="/"> Home </NavLink>
        {/* <NavLink to="/addcategory">Add Category</NavLink> */}
        <NavLink to="/addproduct"> Add Product </NavLink>
        <NavLink to="/addcategory"> Add Category </NavLink>
        <NavLink to="api/products">Products</NavLink>
        <NavLink to="/userprofile">User Profile</NavLink>
        <NavLink onClick={handleLogOut} to="/">
          Sign Out
        </NavLink>
      </div>
    </nav>
  )

  const publicOptions = (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/event">Event</NavLink>
      <NavLink to="/showevents">Show Event</NavLink>
      <NavLink to="/addproduct">Add Product</NavLink>
      <NavLink to="/addcategory">Add Category</NavLink>
      <NavLink to="/signin">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="api/productS">Products</NavLink>

    </nav>
  )

  return ( 
  <header className="Navbar">{userOptions || publicOptions}</header> 
  )
}

export default Navbar
