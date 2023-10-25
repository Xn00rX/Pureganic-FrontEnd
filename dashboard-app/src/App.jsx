import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import ProductList from './Pages/Productlist'
import Cart from './Pages/Cart'
import AddProduct from './Components/AddProduct'
import Login from './Pages/Login'
import Register from './Pages/Register'
import PasswordChange from './Pages/PasswordChange'
import Userprofile from './Pages/Userprofile'
import { CheckSession } from './services/Auth'
import { useEffect } from 'react'
import axios from 'axios'
import Order from './Pages/Order'
import Footer from './Components/footer'
import Event from './Pages/Event'
import ShowEvent from './Pages/ShowEvent'
import ViewProducts from './Components/ViewProducts'
import ProductDetails from './Pages/ProductDetails'
import ViewCategories from './Components/ViewCategories'
import UpdateProduct from './Pages/UpdateProduct'
import AddCatgeory from './Components/AddCategory'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function App() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [userType, setUserType] = useState('')

  const [cart, setcart] = useState([])
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [chooseProduct, setChooseProduct] = useState()

  const test = async (cart) => {
    console.log(cart)

    if (cart.length != 0) {
      console.log('cartmmmm', cart)

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
    setUserType('')
    localStorage.clear()
  }

  const checkToken = async () => {
    const user = await CheckSession()
    console.log(user)
    console.log(user.id)
    console.log(user.userType)

    let userType = user.userType
    await setUser(user)
    setUserType(userType)
    getCartProducts(user)
  }

  const getCartProducts = async (user) => {
    console.log('my id ', user.id)
    const response = await axios.get(`http://localhost:4000/cart/${user.id}`)
    console.log('my id after ', user.id)
    if (response) {
      console.log('testt  ', response.data.cartProducts)
      setcart(response.data.cartProducts)
      test(response.data.cartProducts)
    } else {
      console.log('not getting the response')
    }
  }
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  const handleClick = async (event, pro_id) => {
    if (user) {
      if (
        event.target.innerText === '+' ||
        event.target.innerText == 'Add to Cart'
      ) {
        const response = await axios.post(
          `http://localhost:4000/cart/${user.id}`,
          {
            id: pro_id,
            key: 'add'
          }
        )
        setChooseProduct(response)
      } else if (event.target.innerText === '-') {
        console.log('inMinuis', pro_id)
        const response = await axios.post(
          `http://localhost:4000/cart/${user.id}`,
          {
            id: pro_id,
            key: 'remove'
          }
        )
        setChooseProduct(response)
        if (totalQuantity == 1) {
          setTotalQuantity(0)
        }
      }
    } else if (!user) {
      // console.log("please login")
      navigate('/signin')
    }
  }

  const pay = async () => {
    const response = await axios.post(`http://localhost:4000/orders/${user.id}`)

    setcart([])
    setTotalQuantity(0)

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      background: 'black',
      color: 'white',
      timer: 1500
    })
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      console.log('xxxxx')
      checkToken()
      // hello()
    }
  }, [chooseProduct])

  return (
    <div>
      {user ? (
        <Navbar
          user={user}
          userType={userType}
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
            path="/products"
            element={<ProductList user={user} handleClick={handleClick} />}
          />
          <Route path="/addproduct" element={<AddProduct user={user} />} />
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
          <Route path="/viewproducts" element={<ViewProducts user={user} />} />
          <Route
            path="/viewcategories"
            element={<ViewCategories user={user} />}
          />
          <Route path="/productdelete/:product_id" element={<ViewProducts />} />
          <Route
            path="/productdetails/:product_id"
            element={<ProductDetails handleClick={handleClick} />}
          />
          <Route
            path="/categorydelete/:category_id"
            element={<ViewCategories />}
          />
          <Route
            path="/productupdate/:product_id"
            element={<UpdateProduct />}
          />
          <Route path="/addcategory" element={<AddCatgeory user={user} />} />
          <Route
            path="/signin"
            element={<Login setUser={setUser} setUserType={setUserType} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/userprofile" element={<Userprofile user={user} />} />
          <Route path="/event" element={<Event user={user} />} />
          <Route path="/showevents" element={<ShowEvent />} />

          <Route
            path="/passwordchange"
            element={<PasswordChange user={user} />}
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
