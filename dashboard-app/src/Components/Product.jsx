import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Product = ({ user, handleClick }) => {
  const [searchField, setSearchField] = useState('')
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const imageStyle = {
    width: '200px',
    height: '200px'
  }

  const [sortOrder, setSortOrder] = useState('')
  const getProduct = async () => {
    const response = await axios.get('/api/products')
    setProducts(response.data)
    setFilteredProducts(response.data)
  }

  const handleChange = (e) => {
    const searchText = e.target.value
    setSearchField(searchText)

    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(searchText.toLowerCase())
    )

    if (sortOrder === 'high') {
      filtered.sort((a, b) => a.productPrice - b.productPrice)
    } else if (sortOrder === 'low') {
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
    <div className="ProductList">
      <div className="ProductListHeading">
        <p>"Fresh, organic, and natural just the way you like it"</p>
      </div>

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
        className="btn btn-outline-light searchinput"
      />
      <div className="ProductContainerParent">
        {filteredProducts.map((product) => (
          <div key={product._id} className="productContainer">
            <img
              src={` http://localhost:4000${product.productImage}`}
              alt="product-img"
              style={imageStyle}
            />
            <Link to={`/productdetails/${product._id}`}>
              <h3>{product.productName}</h3>
            </Link>

            <p>Price: BHD {product.productPrice}</p>
            <button
              onClick={(e) => handleClick(e, product._id)}
              className="btn btn-outline-success myBtns"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Product
