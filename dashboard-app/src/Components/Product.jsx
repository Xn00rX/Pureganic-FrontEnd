import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"

const Product = ({ user }) => {
  const [products, setProducts] = useState([])
  const getProduct = async () => {
    const response = await axios.get("/api/products")
    // console.log(response)
    setProducts(response.data)
    // console.log(userId)
  }

  const handleClick = async (e, product) => {
    // console.log("useeeer id", userId)
    // console.log("prooo_id", product)
    if (user) {
      const response = await axios.post(
        `http://localhost:4000/cart/${user.id}`,
        {
          id: product,
          key: "add",
        }
      )
    } else {
      console.log("please login")
    }
  }

  useEffect(() => {
    getProduct()
  }, [])

  return (
    <>
      {products.map((product) => (
        <div key={product._id}>
          {/* <img src={product.image} alt={product.name} /> */}
          <h2>{product._id}</h2>
          <h3>{product.productName}</h3>
          <p>{product.productDesc}</p>
          <p>Price: ${product.productPrice}</p>
          <button onClick={(e) => handleClick(e, product._id)}>
            Add to Cart
          </button>
        </div>
      ))}
    </>
  )
}

export default Product
