import { Link } from 'react-router-dom'
import '../App.css'

const Navbar = ({ user, handleLogOut }) => {
  const userOptions = user && (
    <nav className="Navbar">
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/userprofile">User Profile</Link>
      <Link onClick={handleLogOut} to="/">Sign Out</Link>
      
    </nav>
  )
  const publicOptions = (
    <nav >
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/signin">Sign In</Link>
      <Link to="/register">Register</Link>
    </nav>
  )
  return (
    <header className="Navbar">
      {userOptions || publicOptions}
    </header>
  )
}

export default Navbar
