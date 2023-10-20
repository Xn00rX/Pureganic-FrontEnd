import { Link } from 'react-router-dom'
const Navbar = ()=>{
  return (
<nav className="Navbar">
<Link to="/">Home</Link> |
<Link to="/products">Products</Link> |
<Link to="/signin">Sign In</Link> |
<Link to="/register">Register</Link>
</nav>
  )
}

export default Navbar