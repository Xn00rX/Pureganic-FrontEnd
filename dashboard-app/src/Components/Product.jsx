import React, { useState, useEffect } from "react"

import { Link } from "react-router-dom"
import axios from "axios"
import ReactEmoji from "react-emoji"

const Product = ({ user, handleClick }) => {
  const [searchField, setSearchField] = useState("")
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const imageStyle = {
    width: "200px",
    height: "200px",
  }
  const [sortOrder, setSortOrder] = useState("")
  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])

  const getProduct = async () => {
    const response = await axios.get("/api/products")
    setProducts(response.data)
    setFilteredProducts(response.data)
  }

  const handleChange = (e) => {
    const searchText = e.target.value
    setSearchField(searchText)

    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(searchText.toLowerCase())
    )

    if (sortOrder === "high") {
      filtered.sort((a, b) => a.productPrice - b.productPrice)
    } else if (sortOrder === "low") {
      filtered.sort((a, b) => b.productPrice - a.productPrice)
    }

    setFilteredProducts(filtered)
  }

  const getCategory = async () => {
    const categoryResponse = await axios.get("/apicategory")
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

  // const handleSortChange = (e) => {
  //   setSortOrder(e.target.value)
  //   handleChange({ target: { value: searchField } })
  // }

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

    if (order === "high") {
      filtered.sort((a, b) => b.productPrice - a.productPrice)
    } else if (order === "low") {
      filtered.sort((a, b) => a.productPrice - b.productPrice)
    }

    setFilteredProducts(filtered)
  }

  return (
    <div className="ProductList">
      <div className="ProductListHeading">
        <p>"Fresh, organic, and natural just the way you like it"</p>
      </div>

      <input
        type="search"
        placeholder="Search Products"
        value={searchField}
        onChange={handleChange}
        className="btn btn-outline-light searchinput"
      />

      <label>Sort By: </label>
      <select onChange={handleSortChange} value={sortOrder}>
        <option value="">-- Select --</option>
        <option value="high">High Price</option>
        <option value="low">Low Price</option>
      </select>

      <div className="ProductContainerParent">
        {filteredProducts.map((product) => (
          <div key={product._id} className="productContainer">
            <img
              src={` http://localhost:4000${product.productImage}`}
              alt="product-img"
              style={imageStyle}
            />
            <Link to={`/productdetails/${product._id}`}>
              <h3 className="producttitle">{product.productName}</h3>
            </Link>

            <p>Price: BHD {product.productPrice}</p>
            <button
              onClick={(e) => handleClick(e, product._id)}
              className="btn btn-outline-success myBtns"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Product
