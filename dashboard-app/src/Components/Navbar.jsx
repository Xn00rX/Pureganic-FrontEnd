import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="Navbar">
      <div>
        <NavLink to="/"> Home </NavLink> |
        <NavLink to="/addproduct"> Add Products </NavLink> |
        {/* <NavLink to="/addcategory">Add Category</NavLink> */}
        <NavLink to="/login"> Login </NavLink> |
        <NavLink to="/register"> Register </NavLink>
        <NavLink to="api/productS">Products</NavLink>
      </div>
    </nav>
  )
}

export default Navbar
