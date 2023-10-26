import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const ViewProducts = ({ user }) => {
  const [products, setProducts] = useState([])
  const [deleteItem, setDeleteItem] = useState(0)

  const getProducts = async () => {
    const response = await axios.get(`http://localhost:4000/apiproduct`)
    setProducts(response.data)
    console.log(response.data)
  }

  useEffect(() => {
    getProducts()
  }, [deleteItem])

  const { product_id } = useParams()
  const deleteProduct = (product_id) => {
    const response = axios.delete(
      `http://localhost:4000/apiproduct/` + product_id
    )
    setDeleteItem(1)
  }
  const ProductDetail = (product_id) => {
    const response = axios.get(`http://localhost:4000/apiproduct/` + product_id)
  }
  const imageStyle = {
    width: '80px',
    height: '80px'
  }

  return (
    <>
      {user ? (
        <>
          <div className="LoginPage">
            <div className="LoginParentHide"></div>

            <table className="table table-dark table-sm myTable">
              <div className="thtable">
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
              </div>
              {products.map((product) => (
                <div key={product._id} value={product._id}>
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
                </div>
              ))}
            </table>
          </div>
        </>
      ) : (
        <h1>Login</h1>
      )}
    </>
  )
}

export default ViewProducts
