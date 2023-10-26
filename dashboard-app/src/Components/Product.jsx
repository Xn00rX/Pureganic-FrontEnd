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
        onChange={handleSearchChange}
        className="btn btn-outline-light searchinput"
      />
      <div className="Filter">
        <div className="sortBy">
          <label className="addph">Sort By </label>
          <select
            onChange={handleSortChange}
            value={sortOrder}
            className="btn btn-outline-success myBtns"
          >
            <option value="">-- Select --</option>
            <option value="high">High Price</option>
            <option value="low">Low Price</option>
          </select>
          {/* <br />
      <br /> */}
        </div>
        <div className="categoryFilter">
          <label className="addph">Filter By Category: </label>
          {categories.map((category) => (
            <label key={category._id}>
              <input
                type="checkbox"
                value={category.catgName}
                checked={selectedCategories.includes(category.catgName)}
                onChange={() => handleCategoryChange(category.catgName)}
              />
              <label className="addph">{category.catgName}</label>
            </label>
          ))}
        </div>
      </div>
      <br />
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
