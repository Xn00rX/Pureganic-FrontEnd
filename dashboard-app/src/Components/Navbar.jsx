import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="Navbar">
      <div>
        <NavLink to="/"> Home </NavLink> |
        <NavLink to="/addproducts"> Add Products </NavLink> |
        <NavLink to="/login"> Login </NavLink> |
        <NavLink to="/register"> Register </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
