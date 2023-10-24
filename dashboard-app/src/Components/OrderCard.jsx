import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"

const OrderCard = ({ orderItems }) => {
  return (
    <div>
      {orderItems.map((item) => (
        <h3>{item.quantity}</h3>
      ))}
    </div>
  )
}

export default OrderCard
