import { useState } from "react"
import { Route, Routes } from "react-router-dom"
import "./App.css"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import ProductList from "./Pages/Productlist"
import Cart from "./Pages/Cart"
import AddProduct from "./Components/AddProduct"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import PasswordChange from "./Pages/PasswordChange"
import Userprofile from "./Pages/Userprofile"
import { CheckSession } from "./services/Auth"
import { useEffect } from "react"
import axios from "axios"
import Order from "./Pages/Order"
import Footer from './Components/footer'
import Event from './Pages/Event'
import ShowEvent from './Pages/ShowEvent'

function App() {
  const [user, setUser] = useState(null)
  const [updatedUser, setUpdatedUser] = useState(null)
  const [cart, setcart] = useState([])
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [chooseProduct, setChooseProduct] = useState()

  const test = async (cart) => {
    console.log(cart)

    if (cart.length != 0) {
      console.log("cartmmmm", cart)

      // cart.map((pro) => setTotalQuantity(totalQuantity + pro.quantity))
      let total = 0
      cart.forEach((product) => {
        let val = parseInt(product.quantity)
        total += val
        console.log(total)
      })
      setTotalQuantity(total)
    }
  }

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }

  const checkToken = async () => {
    const user = await CheckSession()
    console.log(user)
    console.log(user.id)
    await setUser(user)
    getCartProducts(user)
  }

  const getCartProducts = async (user) => {
    console.log("my id ", user.id)
    const response = await axios.get(`http://localhost:4000/cart/${user.id}`)
    console.log("my id after ", user.id)
    if (response) {
      console.log("testt  ", response.data.cartProducts)
      setcart(response.data.cartProducts)
      test(response.data.cartProducts)
    } else {
      console.log("not getting the response")
    }
  }
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
  }
  })

  const handleClick = async (event, pro_id) => {
    console.log("pro_id", pro_id)
    if (user) {
      if (
        event.target.innerText === "+" ||
        event.target.innerText == "Add to Cart"
      ) {
        const response = await axios.post(
          `http://localhost:4000/cart/${user.id}`,
          {
            id: pro_id,
            key: "add",
          }
        )
        setChooseProduct(response)
      } else if (event.target.innerText === "-") {
        console.log("inMinuis", pro_id)
        const response = await axios.post(
          `http://localhost:4000/cart/${user.id}`,
          {
            id: pro_id,
            key: "remove",
          }
        )
        setChooseProduct(response)
      }
    } else {
      console.log("please login")
    }
  }

  const pay = async () => {
    const response = await axios.post(`http://localhost:4000/orders/${user.id}`)
    //to refresh the page after payment
    setcart([])
    setTotalQuantity(0)
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      console.log("xxxxx")
      checkToken()
      // hello()
    }
  }, [chooseProduct])

  return (
    <div>
      {user ? (
        <Navbar
          user={user}
          handleLogOut={handleLogOut}
          totalQuantity={totalQuantity}
        />
      ) : (
        <Navbar />
      )}
      {/* <Navbar user={user} handleLogOut={handleLogOut} /> */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/api/products"
            element={<ProductList user={user} handleClick={handleClick} />}
          />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route
            path="/cart"
            element={
              <Cart
                user={user}
                cart={cart}
                handleClick={handleClick}
                pay={pay}
              />
            }
          />
          <Route path="/orders" element={<Order user={user} />} />
          <Route path="/signin" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userprofile" element={<Userprofile user={user} />} />
          <Route path="/event" element={<Event />} />
          <Route path="/showevents" element={<ShowEvent />} />

          <Route
            path="/passwordchange"
            element={<PasswordChange user={user} />}
          />
        </Routes>
      </main>
      <Footer></Footer>
    </div>
  )
}

export default App
