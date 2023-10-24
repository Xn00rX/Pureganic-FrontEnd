import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"

const Product = ({ user, handleClick }) => {
  const [products, setProducts] = useState([])
  const getProduct = async () => {
    const response = await axios.get("/api/products")
    setProducts(response.data)
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
