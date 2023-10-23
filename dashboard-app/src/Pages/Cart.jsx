import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

const Cart = ({ user }) => {
  const [cart, setcart] = useState([])
  const [chooseProduct, setChooseProduct] = useState()
  const [totalPrice, setTotalPrice] = useState()
  // let { id } = useParams()

  const getCartProducts = async () => {
    console.log("my id " + user.id)
    const response = await axios.get(`http://localhost:4000/cart/${user.id}`)
    console.log("testt  " + response.data.cartProducts)
    setcart(response.data.cartProducts)
    // console.log("help" + response)
  }

  const handleClick = async (event, pro_id) => {
    console.log("pro_id", pro_id)
    if (event.target.innerText === "+") {
      const response = await axios.post(
        `http://localhost:4000/cart/${user.id}`,
        {
          id: pro_id,
          key: "add",
        }
      )
      setChooseProduct(response)
    } else if (event.target.innerText === "-") {
      console.log("inMinuis" + pro_id)
      const response = await axios.post(
        `http://localhost:4000/cart/${user.id}`,
        {
          id: pro_id,
          key: "remove",
        }
      )
      setChooseProduct(response)
    }
  }

  useEffect(() => {
    getCartProducts()
  }, [chooseProduct])

  return (
    <div>
      {cart.map((pro) => (
        <div key={pro._id} id={pro.product._id}>
          <h1>{pro.product.productName}</h1>
          <h3>Price: ${pro.product.productPrice * pro.quantity}</h3>
          <h1>{pro.quantity}</h1>
          <button onClick={(e) => handleClick(e, pro.product._id)}>+</button>
          <button onClick={(e) => handleClick(e, pro.product._id)}>-</button>
        </div>
      ))}
      {/* <h1>Total Price: ${totalPrice}</h1> */}
      <button>Pay</button>
    </div>
  )
}

export default Cart
