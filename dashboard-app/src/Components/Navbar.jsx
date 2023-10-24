import { NavLink } from "react-router-dom"
import "../App.css"

const Navbar = ({ user, handleLogOut }) => {
  const userOptions = user && (
    <nav className="Navbar">
      <div>
        <NavLink to="/"> Home </NavLink>
        {/* <NavLink to="/addcategory">Add Category</NavLink> */}
        {/* <NavLink to="/addcategory">Add Category</NavLink> */}

        <NavLink to="/api/products">Products</NavLink>
        <NavLink to="/userprofile">User Profile</NavLink>
        <NavLink to="/cart">Cart</NavLink>
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
      <NavLink to="/signin"> Login </NavLink>
      <NavLink to="/register"> Register </NavLink>
    </nav>
  )
  return <header className="Navbar">{userOptions || publicOptions}</header>
}

export default Navbar
