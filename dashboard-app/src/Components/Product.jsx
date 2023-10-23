import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Product = () => {
  const [searchField, setSearchField] = useState('')
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

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
    <>
      <input
        type="search"
        placeholder="Search Products"
        value={searchField}
        onChange={handleChange}
      />
      {filteredProducts.map((product) => (
        <div key={product._id}>
          {/* <img src={product.image} alt={product.name} /> */}
          <h3>{product.productName}</h3>
          <p>{product.productDesc}</p>
          <p>Price: ${product.productPrice}</p>
          <button
            // onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </>
  )
}

export default Product
