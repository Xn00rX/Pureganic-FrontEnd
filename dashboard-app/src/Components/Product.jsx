import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Product = ({ user, handleClick }) => {
  const [searchField, setSearchField] = useState('')
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const imageStyle = {
    width: '200px',
    height: '200px'
  }

  const getProduct = async () => {
    const response = await axios.get('/api/products')
    setProducts(response.data)
    console.log(response.data)
    setFilteredProducts(response.data)
  }

  const handleChange = (e) => {
    const searchText = e.target.value
    setSearchField(searchText)

    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(searchText.toLowerCase())
    )
    setFilteredProducts(filtered)
  }

  useEffect(() => {
    getProduct()
  }, [])

  return (
    <div className="ProductList">
      <div className="ProductListHeading">
        <p>"Fresh, organic, and natural just the way you like it"</p>
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

            <h3>{product.productName}</h3>
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
