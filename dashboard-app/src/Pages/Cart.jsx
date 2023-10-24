import React from "react"

const Cart = ({ user, cart, handleClick, pay }) => {
  let total = 0
  // console.log("sss", cart)
  cart.map((product) => {
    total += product.product.productPrice * product.quantity
  })

  return (
    <div>
      {cart ? (
        <div>
          {cart.map((pro) => (
            <div key={pro._id} id={pro.product._id}>
              <h1>{pro.product.productName}</h1>
              <h3>Price: ${pro.product.productPrice * pro.quantity}</h3>
              <h1>{pro.quantity}</h1>
              <button onClick={(e) => handleClick(e, pro.product._id)}>
                +
              </button>
              <button onClick={(e) => handleClick(e, pro.product._id)}>
                -
              </button>
            </div>
          ))}
          <h1>Total Price: ${total}</h1>
          <button onClick={pay}>Pay</button>
        </div>
      ) : (
        console.log("error")
      )}
    </div>
  )
}

export default Cart
