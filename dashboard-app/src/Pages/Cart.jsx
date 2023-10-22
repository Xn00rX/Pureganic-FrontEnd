import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

const Cart = () => {
  const [cart, setcart] = useState([])
  let { id } = useParams()
  const getCartProducts = async () => {
    const response = await axios.get(`http://localhost:4000/cart/${id}`)
    console.log(response.data.cartProducts)
    setcart(response.data.cartProducts)
  }

  useEffect(() => {
    getCartProducts()
  }, [])

  return (
    <div>
      {cart.map((product) => (
        <div key={product.product}>
          {/* <img src={product.image} alt={product.name} /> */}
          <h3>{product.product}</h3>
          <p>{product.quantity}</p>
          {/* <p>Price: ${product.productPrice}</p> */}
          <button
          // onClick={() => onAddToCart(product)}
          >
            +
          </button>
          <button>-</button>
        </div>
      ))}
    </div>
  )
}

export default Cart
