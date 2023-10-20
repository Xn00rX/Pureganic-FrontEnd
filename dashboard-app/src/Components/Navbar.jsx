import { Link } from 'react-router-dom'

const Navbar = ({ user, handleLogOut }) => {
  let userOptions
  if (user) {
    userOptions = (
      <nav>
        <h3>Welcome {user.email}!</h3>
        <Link to="/products"> Products</Link>
        <Link onClick={handleLogOut} to="/">
          Sign Out
        </Link>
      </nav>
    )
  }

  const publicOptions = (
<Link to="/">Home</Link> |
<Link to="/products">Products</Link> |
<Link to="/signin">Sign In</Link> |
<Link to="/register">Register</Link>
  )

  return (
    <header>
      <Link to="/">
      </Link>
      {user ? userOptions : publicOptions}
    </header>
  )
}

export default Navbar
