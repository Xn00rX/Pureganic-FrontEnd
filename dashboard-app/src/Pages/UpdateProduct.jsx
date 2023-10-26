import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const UpdateProduct = () => {
  const navigate = useNavigate()
  const { product_id } = useParams()
  const [values, setValues] = useState({
    productName: "",
    productDesc: "",
    productPrice: 0,
    productImage: null,
  })

  const getProductDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/apiproduct/` + product_id
      )
      setValues(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getProductDetails()
  }, [product_id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `http://localhost:4000/apiproducttt/${product_id}`,
        values,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      setValues(response.data)
    } catch (error) {
      console.error(error)
    }
    navigate("/viewproducts")
  }

  return (
    <div className="LoginPage">
      <div className="LoginParentHide"></div>
      <h1>Update</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="productName"
          value={values.productName}
          className="form-control"
          onChange={(e) =>
            setValues({ ...values, productName: e.target.value })
          }
        />
        <label>Description</label>
        <textarea
          name="productDesc"
          value={values.productDesc}
          className="form-control"
          onChange={(e) =>
            setValues({ ...values, productDesc: e.target.value })
          }
        />
        <label>Price</label>
        <input
          type="number"
          name="productPrice"
          value={values.productPrice}
          className="form-control"
          onChange={(e) =>
            setValues({ ...values, productPrice: e.target.value })
          }
        />
        <label>Image:</label>
        <input
          type="file"
          name="productImage"
          className="form-control"
          accept="image/*"
          onChange={(e) =>
            setValues({ ...values, productImage: e.target.files[0] })
          }
        />
        <button type="submit">Update</button>
      </form>
    </div>
  )
}

export default UpdateProduct
