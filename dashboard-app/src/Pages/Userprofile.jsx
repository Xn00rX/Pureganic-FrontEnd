import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Userprofile = ({ user }) => {
  const navigate = useNavigate()
  const [newUserData, setNewUserData] = useState({ ...user })
  const [isEditing, setIsEditing] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewUserData({
      ...newUserData,
      [name]: value
    })
  }

  const pp = {
    width: '200px',
    height: '200px'
  }

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0]
    setSelectedImage(imageFile)
  }

  const handleUpdatePassword = () => {
    navigate('/passwordchange')
  }

  const hello = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get(
        `http://localhost:4000/userinfo/${user.id}`
      )
      setUserData(response.data)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    hello()
  }, [])

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError(null)

      const formData = new FormData()
      formData.append('firstName', newUserData.firstName)
      formData.append('lastName', newUserData.lastName)
      formData.append('email', newUserData.email)

      if (selectedImage) {
        formData.append('image', selectedImage)
      }

      const response = await axios.post(
        `http://localhost:4000/updateprofile/${user.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      hello()
      setIsEditing(false)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="LoginPage userpage">
      <div className="LoginParentHide"></div>
      <div className="UserParent">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : isEditing ? (
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              value={newUserData.firstName}
              onChange={handleInputChange}
            />
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={newUserData.lastName}
              onChange={handleInputChange}
            />
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              className="form-control"
              value={newUserData.email}
              onChange={handleInputChange}
            />
            <label htmlFor="image">Profile Image:</label>
            <input
              type="file"
              className="form-control"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            <br />
            <button
              className="btn btn-outline-success myBtns"
              onClick={handleUpdateProfile}
            >
              Save
            </button>
          </div>
        ) : (
          <div>
            {userData ? (
              <>
                <img
                  src={`http://localhost:4000/images/${userData.image}`}
                  className="form-control"
                  style={pp}
                  alt=""
                />
                <h4>Email: {userData.email}</h4>
                <h4>Name: {userData.firstName}</h4>
                <button
                  className="btn btn-outline-success myBtns"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
                <button
                  className="btn btn-outline-success myBtns"
                  onClick={handleUpdatePassword}
                >
                  Change Password
                </button>
              </>
            ) : (
              <h1>Null</h1>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Userprofile
