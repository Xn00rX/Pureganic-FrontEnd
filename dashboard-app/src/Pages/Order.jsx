import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import OrderCard from "../Components/OrderCard"
import { Card } from "@contentful/f36-components"

const Order = ({ user }) => {
  const [orders, setOrders] = useState()
  const [show, setShow] = React.useState(false)
  const imageStyle = {
    width: "80px",
    height: "80px",
  }
  const getOrders = async () => {
    console.log("user id" + user.id)
    const response = await axios.get(`http://localhost:4000/orders/${user.id}`)
    // console.log("test" + response.data.user)
    setOrders(response.data)
    console.log(response.data)
    // console.log(response.data.orderItems[1].quantity)
  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <div className="CartPage">
      <div className="LoginParentHide"></div>

      {orders
        ? orders.map((order) => (
            <div className="ordercard">
              <Card onClick={() => setShow(!show)}>
                {/* Click on this card */}
                <h5>OrderNo.</h5>
                <h6>{order._id}</h6>
                <br />
                {order.orderItems.map(
                  (or) =>
                    show && (
                      <span role="img" aria-label="sparkles">
                        <div key={or._id}>
                          <h6>Quantity: {or.quantity}</h6>
                          <h6>Product Name: {or.product.productName}</h6>
                          <img
                            src={` http://localhost:4000${or.product.productImage}`}
                            alt="product-img"
                            style={imageStyle}
                          />
                          <h6>Price: {or.product.productPrice}</h6>
                        </div>
                      </span>
                    )
                )}
              </Card>
            </div>
          ))
        : console.log("You Do no Have Any Order")}
    </div>
  )

  // return (
  //   <div>
  //     {orders
  //       ? orders.map((order) => (
  //           <div key={order._id}>
  //             <h5>OrderNo.</h5>
  //             <h6>{order._id}</h6>
  //             {order.orderItems.map((or) => (
  //               <div key={or._id}>
  //                 <h3>{or.quantity}</h3>
  //                 <h3>{or.product.productName}</h3>
  //                 <h3>Price:{or.product.productPrice}</h3>
  //                 <h3>Desc:{or.product.productDesc}</h3>
  //               </div>
  //             ))}
  //           </div>
  //         ))
  //       : console.log("You Do no Have Any Order")}
  //   </div>
  // )
}

export default Order
