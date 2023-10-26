import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UpdateProduct = () => {
  const navigate = useNavigate()
  const { product_id } = useParams()
  const [values, setValues] = useState({
    productName: '',
    productDesc: '',
    productPrice: 0
    // productImage: null
    // category: null
  })
  const getProductDetails = async () => {
    console.log(product_id)
    const response = await axios.get(
      `http://localhost:4000/apiproduct/` + product_id
    )
    setValues({
      ...values,
      productName: response.data.productName,
      productDesc: response.data.productDesc,
      productPrice: response.data.productPrice
      // productImage: response.data.productImage
    })
    console.log(response.data)
  }

  useEffect(() => {
    getProductDetails()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const updateProductDetails = async () => {
      console.log('heereeee ', product_id)
      const response = await axios.put(
        `http://localhost:4000/apiproduct/` + product_id,
        values
      )
      setValues({
        ...values,
        productName: response.data.productName,
        productDesc: response.data.productDesc,
        productPrice: response.data.productPrice
        // productImage: response.data.productImage
      })
      console.log({
        ...values,
        productName: e.target.value,
        productDesc: e.target.value,
        productPrice: e.target.value
        // productImage: e.target.value
      })

      // console.log("yessssss")
      navigate('/viewproducts')
    }

    updateProductDetails()
  }
  return (
    <div className="LoginPage">
      <div className="LoginParentHide"></div>

      <h1 className="updateH">Update Product</h1>
      <form>
        <label>Name</label>
        <input
          value={values.productName}
          className="form-control"
          onChange={(e) =>
            setValues({ ...values, productName: e.target.value })
          }
        ></input>
        <label>Description</label>
        <textarea
          value={values.productDesc}
          className="form-control"
          onChange={(e) =>
            setValues({ ...values, productDesc: e.target.value })
          }
        ></textarea>
        <label>Price</label>
        <input
          value={values.productPrice}
          className="form-control"
          onChange={(e) =>
            setValues({ ...values, productPrice: e.target.value })
          }
        ></input>
        {/* <label>Image:</label>
        <input
          type="file"
          name="productImage"
          className="form-control"
          accept="image/*"
          onChange={(e) =>
            setValues({ ...values, productImage: e.target.value })
          }
        /> */}
      </form>

      <br />

      <button className="btn btn-outline-success myBtns" onClick={handleSubmit}>
        update
      </button>
    </div>
  )
}
export default UpdateProduct
