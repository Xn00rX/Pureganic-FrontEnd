import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const ViewProducts = () => {
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    const response = await axios.get(`http://localhost:4000/apiproduct`)
    setProducts(response.data)
    console.log(response.data)
  }

  useEffect(() => {
    getProducts()
  }, [products])

  const { product_id } = useParams()
  const deleteProduct = (product_id) => {
    const response = axios.delete(
      `http://localhost:4000/apiproduct/` + product_id
    )
  }
  const ProductDetail = (product_id) => {
    const response = axios.get(`http://localhost:4000/apiproduct/` + product_id)
  }
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

                <td>
                  {' '}
                  <Link to={`/productdetails/${product._id}`}>
                    {product.productName}
                  </Link>
                </td>
                <td>{product.productPrice}</td>
                <td>{product.productDesc}</td>
                {console.log('check heereee ', product.category)}
                <td>{product.category.catgName}</td>
                <td>
                  <Link to={`/productdelete/${product._id}`}>
                    <button
                      onClick={(event) => {
                        event.preventDefault()
                        deleteProduct(product._id)
                      }}
                      className="btn btn-warning"
                    >
                      Delete
                    </button>
                  </Link>
                  &nbsp;&nbsp;&nbsp;
                  <Link to={`/productupdate/${product._id}`}>
                    <button className="btn btn-warning">Edit</button>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}

export default ViewProducts
