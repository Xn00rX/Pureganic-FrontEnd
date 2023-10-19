import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"

const Product = () => {
  const [products, setProducts] = useState([])
  const getProduct = async () => {
    const response = await axios.get("http://localhost:4000/api/products")
    // console.log(response.data)
    setProducts(response.data)
  }

  const addToCart = () => {}

  useEffect(() => {
    getProduct()
  }, [])

  return (
    <>
      {products.map((product) => (
        <div key={product._id}>
          {/* <img src={product.image} alt={product.name} /> */}
          <h3>{product.productName}</h3>
          <p>{product.productDesc}</p>
          <p>Price: ${product.productPrice}</p>
          <button
          // onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </>
  )
}

export default Product
