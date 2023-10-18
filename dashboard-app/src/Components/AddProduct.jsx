import React, { useState } from 'react'
import axios from 'axios'


const AddProduct =()=> {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 0,
    image: null, 
  })

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target
    const newValue = type === 'file' ? files[0] : value
    setProductData({
      ...productData,
      [name]: newValue,
    })
  }



  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/products', productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log('Product added:', response.data)
      setProductData({
        name: '',
        description: '',
        price: 0,
        image: null,
      })
    } catch (error) {

      console.error('Error:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={productData.name} onChange={handleInputChange} />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={productData.description} onChange={handleInputChange} />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" name="price" value={productData.price} onChange={handleInputChange} />
      </div>
      <div>
        <label>Image:</label>
        <input type="file" name="image" onChange={handleImageChange} />
      </div>
      <button type="submit">Add Product</button>
    </form>
  )
}

export default AddProduct
