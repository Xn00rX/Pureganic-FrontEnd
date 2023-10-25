import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"

const ProductDetails = ({ handleClick }) => {
  const [product, setProduct] = useState([])

  const imageStyle = {
    width: "400px",
    height: "400px",
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
<<<<<<< HEAD
      <div key={product._id} value={product._id}>
        <img
          src={` http://localhost:4000${product.productImage}`}
          alt="product-img"
          style={imageStyle}
        />
        <h2>{product.productName}</h2>
        <h3>{product.productPrice}</h3>
        <p>{product.productDesc}</p>
        <button>Add To Cart</button>
      </div>
=======
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
>>>>>>> f9d9b0ed6adb18e84afba38692638c0cde2f86e5
    </div>
  )
}

export default ProductDetails
