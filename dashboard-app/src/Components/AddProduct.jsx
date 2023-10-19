import React, { useState } from 'react'
import axios from 'axios'

const AddProduct = () => {
  const [productData, setProductData] = useState({
    productName: '', 
    productDesc: '', 
    productPrice: 0, 
  })



  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProductData({
      ...productData,
      [name]: value,
    })
  }



  const handleSubmit = async (e) => {
    e.preventDefault()

  
     

    const data = {
      productDesc: productData.productDesc,
      productName: productData.productName,
      productPrice: productData.productPrice
    }
    
 
    
    try {
      const response = await axios.post('http://localhost:4000/apiproduct', data, {
        headers: { 'Content-Type': 'application/json' }
      })
      
      console.log('Product added:', response.data)
      setProductData({
        productName: '',
        productDesc: '', 
        productPrice: 0,
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="productName" value={productData.productName} onChange={handleInputChange} />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="productDesc" value={productData.productDesc} onChange={handleInputChange} />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" name="productPrice" value={productData.productPrice} onChange={handleInputChange} />
      </div>

      <button type="submit">Add Product</button>
    </form>
  )
}

export default AddProduct
