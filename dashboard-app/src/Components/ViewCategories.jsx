import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const ViewCategories = ({user}) => {
  const [categories, setCategories] = useState([])

  const getCategories = async () => {
    const response = await axios.get(`http://localhost:4000/apicategory`)
    setCategories(response.data)
    console.log(response.data)
  }

  useEffect(() => {
    getCategories()
  }, [])

  const { category_id } = useParams()
  const deleteCategory = (category_id) => {
    const response = axios.delete(
      `http://localhost:4000/apicategory/` + category_id
    )
  }

  const imageStyle = {
    width: '80px',
    height: '80px'
  }
  const tableStyle = {
    width: '100%'
  }

  return (
   <>
   {user? (<>
   
    <div>
      {categories.map((category) => (
        <div key={category._id} value={category._id}>
          <table className="table table-dark table-sm" style={tableStyle}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Products</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img
                    src={` http://localhost:4000${category.catgImage}`}
                    alt="category-img"
                    style={imageStyle}
                  />
                </td>
                <td>{category.catgName}</td>
                <td>{category.catgDesc}</td>
                {console.log('check heereee ', category.product)}

                <td>
                  {category.product.map((pr) => (
                    <p>{pr.productName}</p>
                  ))}
                </td>

                <td>
                  <Link to={`/categorydelete/${category._id}`}>
                    <button
                      onClick={(event) => {
                        event.preventDefault()
                        deleteCategory(category._id)
                      }}
                      className="btn btn-warning"
                    >
                      Delete
                    </button>
                  </Link>
                  &nbsp;&nbsp;&nbsp;
                  <button className="btn btn-warning">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
   
   </>):(<>
   
   <h1>Login</h1>
   </>)}
   </>
  )
}

export default ViewCategories
