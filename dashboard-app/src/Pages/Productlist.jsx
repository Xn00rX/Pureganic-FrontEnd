import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Product from '../Components/Product'

function ProductList() {
  const [products, setProducts] = useState([])

  useEffect(() => {

    axios.get('api/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error))
  }, [])

  const addToCart = (product) => {
    console.log(`Added ${product.name} to the cart`)
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <Product key={product.id} product={product} onAddToCart={addToCart} />
      ))}
    </div>
  )
}

export default ProductList
