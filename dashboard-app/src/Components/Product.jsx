
import React, { useState, useEffect } from "react"

import { Link } from "react-router-dom"
import axios from "axios"
import ReactEmoji from 'react-emoji'

const Product = ({ user, handleClick }) => {
  const [searchField, setSearchField] = useState('')
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [sortOrder, setSortOrder] = useState('')
  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])

  const getProduct = async () => {
    const response = await axios.get('/api/products')
    setProducts(response.data)
    setFilteredProducts(response.data)
  }

  const getCategory = async () => {
    const categoryResponse = await axios.get('/apicategory')
    setCategories(categoryResponse.data)
  }

  useEffect(() => {
    getProduct()
    getCategory()
  }, [])

  const handleCategoryChange = (categoryName) => {
    let updatedSelectedCategories = [...selectedCategories]

    if (updatedSelectedCategories.includes(categoryName)) {
      updatedSelectedCategories = updatedSelectedCategories.filter(
        (category) => category !== categoryName
      )
    } else {
      updatedSelectedCategories.push(categoryName)
    }

    setSelectedCategories(updatedSelectedCategories)
    filterProducts(updatedSelectedCategories, sortOrder, searchField)
  }

  const handleSortChange = (e) => {
    const newSortOrder = e.target.value
    setSortOrder(newSortOrder)
    filterProducts(selectedCategories, newSortOrder, searchField)
  }

  const handleSearchChange = (e) => {
    const searchText = e.target.value
    setSearchField(searchText)
    filterProducts(selectedCategories, sortOrder, searchText)
  }

  const filterProducts = (selectedCategories, order, searchText) => {
    let filtered = products

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category.catgName)
      )
    }

    if (searchText) {
      filtered = filtered.filter((product) =>
        product.productName.toLowerCase().includes(searchText.toLowerCase())
      )
    }

    if (order === 'high') {
      filtered.sort((a, b) => b.productPrice - a.productPrice)
    } else if (order === 'low') {
      filtered.sort((a, b) => a.productPrice - b.productPrice)
    }

    setFilteredProducts(filtered)
  }

  return (
    <>
      <div>
        <label>Sort By: </label>
        <select onChange={handleSortChange} value={sortOrder}>
          <option value="">-- Select --</option>
          <option value="high">High Price</option>
          <option value="low">Low Price</option>
        </select>
      </div>

      <div>
        <label>Search Products: </label>
        <input
          type="text"
          placeholder="Search Products"
          value={searchField}
          onChange={handleSearchChange}
        />
      </div>

      <div>
        <label>Filter By Category: </label>
        {categories.map((category) => (
          <label key={category._id}>
            <input
              type="checkbox"
              value={category.catgName}
              checked={selectedCategories.includes(category.catgName)}
              onChange={() => handleCategoryChange(category.catgName)}
            />
            {category.catgName}
          </label>
        ))}
      </div>

      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div key={product._id}>
            <h2>{product._id}</h2>
            <Link to={`/productdetails/${product._id}`}>
              <h3>{product.productName}</h3>
            </Link>

            <p>{product.productDesc}</p>
            <p>Price: ${product.productPrice}</p>
            <button onClick={(e) => handleClick(e, product._id)}>
              Add to Cart
            </button>
          </div>
        ))
      ) : (
        <p>
          <p>
            No products found for the selected category or search criteria.{' '}
            {ReactEmoji.emojify(':disappointed:')}
          </p>
        </p>
      )}
    </>
  )
}

export default Product
