import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import OrderCard from "../Components/OrderCard"

const Order = ({ user }) => {
  const [orders, setOrders] = useState()

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
    <div>
      {orders
        ? orders.map((order) => (
            <div key={order._id}>
              <h5>OrderNo.</h5>
              <h6>{order._id}</h6>
              {order.orderItems.map((or) => (
                <div key={or._id}>
                  <h3>{or.quantity}</h3>
                  <h3>{or.product.productName}</h3>
                  <h3>Price:{or.product.productPrice}</h3>
                  <h3>Desc:{or.product.productDesc}</h3>
                </div>
              ))}
            </div>
          ))
        : console.log("You Do no Have Any Order")}
    </div>
  )
}

export default Order
