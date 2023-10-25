import React, { useState, useEffect } from "react"

import { Link } from "react-router-dom"
import axios from "axios"

const Product = ({ user, handleClick }) => {
  const [searchField, setSearchField] = useState("")
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [sortOrder, setSortOrder] = useState("")
  const getProduct = async () => {
    const response = await axios.get("/api/products")
    setProducts(response.data)
    setFilteredProducts(response.data)
  }

  const handleChange = (e) => {
    const searchText = e.target.value
    setSearchField(searchText)

    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(searchText.toLowerCase())
    )

    if (sortOrder === "high") {
      filtered.sort((a, b) => a.productPrice - b.productPrice)
    } else if (sortOrder === "low") {
      filtered.sort((a, b) => b.productPrice - a.productPrice)
    }

    setFilteredProducts(filtered)
  }

  const handleSortChange = (e) => {
    setSortOrder(e.target.value)
    handleChange({ target: { value: searchField } })
  }

  useEffect(() => {
    getProduct()
  }, [])

  return (
    <>
      <div>
        <label>Sort By: </label>
        <select onChange={handleSortChange} value={sortOrder}>
          <option value="">-- Select --</option>
          <option value="high">High Price</option>
          <option value="low">Low Price</option>
        </select>
      </div>
      <input
        type="search"
        placeholder="Search Products"
        value={searchField}
        onChange={handleChange}
      />
      {filteredProducts.map((product) => (
        <div key={product._id}>
          <h2>{product._id}</h2>
          <Link to={`/productdetails/${product._id}`}>
            <h3>{product.productName}</h3>
          </Link>

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
