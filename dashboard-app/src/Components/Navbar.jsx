import { Link } from "react-router-dom"
const Navbar = () => {
  return (
    <nav className="Navbar">
      <Link to="/">Home</Link> |<Link to="/api/products">Products</Link> |
      <Link to="/cart/:id">Cart</Link> |
    </nav>
  )
}

export default Navbar
