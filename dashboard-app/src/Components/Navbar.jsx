import { Link } from 'react-router-dom'

const Navbar = ({ user, handleLogOut }) => {
  const userOptions = user && (
    <nav className="Navbar">
      <h3>Welcome {user.username}!</h3>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/userprofile">User Profile</Link>
      <Link onClick={handleLogOut} to="/">Sign Out</Link>
      
    </nav>
  )

  const publicOptions = (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/signin">Sign In</Link>
      <Link to="/register">Register</Link>
    </nav>
  )

  return (
    <header>
      {userOptions || publicOptions}
    </header>
  )
}

export default Navbar
