import React from 'react'

const Cart = ({ user, cart, handleClick, pay }) => {
  let total = 0
  console.log('sss', cart)
  cart.map((product) => {
    total += product.product.productPrice * product.quantity
  })
  const imageStyle = {
    width: '80px',
    height: '80px'
  }

  return (
    <div className="ProductDetails">
      <div className="LoginParentHide"></div>

      {cart ? (
        <div>
          <div className="cartcont">
            {cart.map((pro) => (
              <div key={pro._id} id={pro.product._id}>
                <div className="cartimg">
                  <img
                    src={` http://localhost:4000${pro.product.productImage}`}
                    alt="product-img"
                    style={imageStyle}
                  />
                </div>
                <div className="cartinfo">
                  <h1>{pro.product.productName}</h1>
                  <h3>Price: ${pro.product.productPrice * pro.quantity}</h3>

                  <button
                    className="btn btn-light"
                    onClick={(e) => handleClick(e, pro.product._id)}
                  >
                    +
                  </button>
                  <h1>{pro.quantity}</h1>

                  <button
                    className="btn btn-light"
                    onClick={(e) => handleClick(e, pro.product._id)}
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="carttotal">
            <h1>Total Price: ${total}</h1>
            <button className="btn btn-outline-success myBtns" onClick={pay}>
              Pay
            </button>
          </div>{' '}
        </div>
      ) : (
        console.log('error')
      )}
    </div>
  )
}

export default Cart
