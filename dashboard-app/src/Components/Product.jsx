import { useState, useEffect } from 'react'
import axios from 'axios'

const Product = () => {
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    const response = await axios.get(`http://localhost:4000/apiproduct`)
    setProducts(response.data)
    console.log(response.data)
  }

  useEffect(() => {
    getProducts()
  }, [])

  const imageStyle = {
    width: '80px',
    height: '80px'
  }
  const tableStyle = {
    width: '100%'
  }

  return (
    <div>
      {products.map((product) => (
        <div key={product._id} value={product._id}>
          <table className="table table-dark table-sm" style={tableStyle}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Category</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img
                    src={` http://localhost:4000${product.productImage}`}
                    alt="product-img"
                    style={imageStyle}
                  />
                </td>
                <td>{product.productName}</td>
                <td>{product.productPrice}</td>
                <td>{product.productDesc}</td>
                <td>{product.category}</td>
                <td>
                  <button className="btn btn-warning">Update</button>
                  &nbsp;&nbsp;&nbsp;
                  <button className="btn btn-warning">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}

export default Product
