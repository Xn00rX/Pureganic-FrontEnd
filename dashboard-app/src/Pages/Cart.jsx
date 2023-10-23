import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

const Cart = () => {
  const [cart, setcart] = useState([])
  const [chooseProduct, setChooseProduct] = useState()
  let { id } = useParams()

  const getCartProducts = async () => {
    const response = await axios.get(`http://localhost:4000/cart/${id}`)
    console.log(response.data.cartProducts)
    setcart(response.data.cartProducts)
  }

  const handleClick = async (event, pro_id) => {
    console.log("pro_id", pro_id)
    if (event.target.innerText === "+") {
      const response = await axios.post(`http://localhost:4000/cart/${id}`, {
        id: pro_id,
        key: "add",
      })
      setChooseProduct(response)
    } else if (event.target.innerText === "-") {
      console.log("inMinuis" + pro_id)
      const response = await axios.post(`http://localhost:4000/cart/${id}`, {
        id: pro_id,
        key: "remove",
      })
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
          <h3>{pro.product.productPrice * pro.quantity}</h3>
          <h1>{pro.quantity}</h1>
          <button onClick={(e) => handleClick(e, pro.product._id)}>+</button>
          <button onClick={(e) => handleClick(e, pro.product._id)}>-</button>
        </div>
      ))}
      {/* {cart.map((cartProduct) => */}

      {/* // <div key={cartProduct.product._id}>
          /* <img src={product.image} alt={product.name} />  */}

      {/* <h3>{product._id}</h3> */}
      {/* /* <h3>{cartProduct.product.productName}</h3>
        //     <p>{cartProduct.quantity}</p>
        //     <p>
        //       Price: ${cartProduct.product.productPrice * cartProduct.quantity}
        //     </p>

        //     <button onClick={handleClick}>+</button>
        //     <button onClick={handleClick}>-</button>
        //   </div> */}
      {/* // )} */}
    </div>
  )
}

export default Cart
