import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const ProductDetails = ({ handleClick }) => {
  const [product, setProduct] = useState([])

  const imageStyle = {
    width: '400px',
    height: '400px'
  }
  const { product_id } = useParams()

  const getProductDetails = async () => {
    console.log(product_id)
    const response = await axios.get(
      `http://localhost:4000/apiproduct/` + product_id
    )
    console.log(response.data)
    setProduct(response.data)
    console.log(response.data)
  }

  useEffect(() => {
    getProductDetails()
  }, [])

  return (
    <div>
      {
        <div key={product._id} value={product._id}>
          <img
            src={` http://localhost:4000${product.productImage}`}
            alt="product-img"
            style={imageStyle}
          />
          <h2>{product.productName}</h2>
          <h3>{product.productPrice}</h3>
          <p>{product.productDesc}</p>
          <button onClick={(e) => handleClick(e, product._id)}>
            Add to Cart
          </button>
        </div>
      }
    </div>
  )
}

export default ProductDetails
