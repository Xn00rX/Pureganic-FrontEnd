import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const AddCategory = ({ user }) => {
  const navigate = useNavigate()
  const [categoryData, setCategoryData] = useState({
    catgName: "",
    catgDesc: "",
    catgImage: null,
  })

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target
    const newValue = type === "file" ? files[0] : value

    setCategoryData({
      ...categoryData,
      [name]: newValue,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {
      catgDesc: categoryData.catgDesc,
      catgName: categoryData.catgName,
      catgImage: categoryData.catgImage,
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/apicategory",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )

      console.log("Category added:", response.data)
      setCategoryData({
        catgName: "",
        catgDesc: "",
        catgImage: null,
      })

      navigate("/viewcategories")
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <>
      {user ? (
        <>
          <div>
            <h1> Add Category</h1>
            <div className="shadow p-3 mb-5 bg-body-tertiary rounded myForms">
              <form onSubmit={handleSubmit}>
                <div>
                  <label className="form-label">Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="catgName"
                    value={categoryData.catgName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="form-label">Description:</label>
                  <textarea
                    name="catgDesc"
                    className="form-control"
                    value={categoryData.catgDesc}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label>Image:</label>
                  <input
                    type="file"
                    className="form-control"
                    name="catgImage"
                    accept="image/*"
                    onChange={handleInputChange}
                  />
                </div>

                <button className="btn btn-secondary" type="submit">
                  Add Catgory
                </button>
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1>Login</h1>
        </>
      )}
    </>
  )
}

export default AddCategory
