import React, { useState } from 'react'
import axios from 'axios'

const AddProduct = () => {
  const [productData, setProductData] = useState({
    productName: '',
    productDesc: '',
    productPrice: 0,
    productImage: null
  })

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target
    const newValue = type === 'file' ? files[0] : value
    setProductData({
      ...productData,
      [name]: newValue
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {
      productDesc: productData.productDesc,
      productName: productData.productName,
      productPrice: productData.productPrice,
      productImage: productData.productImage
    }

    try {
      const response = await axios.post(
        'http://localhost:4000/apiproduct',
        data,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )

      console.log('Product added:', response.data)
      setProductData({
        productName: '',
        productDesc: '',
        productPrice: 0,
        productImage: null
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
      <h1> Add Product</h1>
      <div className="shadow p-3 mb-5 bg-body-tertiary rounded myForms">
        <form onSubmit={handleSubmit} enctype="multipart/form-data">
          <div>
            <label className="form-label">Name:</label>
            <input
              type="text"
              className="form-control"
              name="productName"
              value={productData.productName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="form-label">Description:</label>
            <textarea
              name="productDesc"
              className="form-control"
              value={productData.productDesc}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              className="form-control"
              name="productPrice"
              value={productData.productPrice}
              onChange={handleInputChange}
            />
          </div>

          {/* <div>
            <label>Category:</label> */}

          {/* <select
              name="category[]"
              multiple="multiple"
              id="category"
              class="form-control"
            >
              <option value="option1">Option 1</option>
            </select>
          </div> */}

          <div>
            <label>Image:</label>
            <input
              type="file"
              name="productImage"
              accept="image/*"
              onChange={handleInputChange}
            />
          </div>

          <button className="btn btn-secondary" type="submit">
            Add Product
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddProduct
