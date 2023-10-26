import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Category = ({ user }) => {
  const [categories, setCategories] = useState([])
  const [filteredCategories, setFilteredCategories] = useState([])
  const imageStyle = {
    width: '200px',
    height: '200px'
  }

  const getCategories = async () => {
    const response = await axios.get(`http://localhost:4000/apicategory`)
    setCategories(response.data)
    console.log(response.data)
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div className="ProductList">
      <div className="ProductListHeading">
        <p>"Fresh, organic, and natural just the way you like it"</p>
      </div>

      <div className="ProductContainerParent">
        {categories.map((category) => (
          <div key={category._id} className="productContainer">
            <img
              src={` http://localhost:4000${category.catgImage}`}
              alt="product-img"
              style={imageStyle}
            />

            <h3 className="producttitle">{category.catgName}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Category
