import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Userprofile = ({ user }) => {
  let navigate = useNavigate()
  const [newUserData, setNewUserData] = useState({ ...user })
  const [isEditing, setIsEditing] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewUserData({
      ...newUserData,
      [name]: value
    })
  }

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0]
    setSelectedImage(imageFile)
  }

  const handleUpdatePassword = () => {
    navigate('/passwordchange')
  }

  const handleUpdateProfile = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('firstName', newUserData.firstName)
    formData.append('lastName', newUserData.lastName)
    formData.append('email', newUserData.email)
    if (selectedImage) {
      formData.append('image', selectedImage)
    }

    const response = axios
      .post(`http://localhost:4000/updateprofile/${user.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        setIsEditing(false)
      })
      .catch((error) => {})
  }

  return (
    <div>
      {isEditing ? (
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={newUserData.firstName}
            onChange={handleInputChange}
          />
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={newUserData.lastName}
            onChange={handleInputChange}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            value={newUserData.email}
            onChange={handleInputChange}
          />
          <label htmlFor="image">Profile Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          <button onClick={handleUpdateProfile}>Save</button>
        </div>
      ) : (
        <div>
          {user ? (
            <>
              <img
                src={`http://localhost:4000/images/${user.userimage}`}
                height={150}
                width={100}
                alt=""
              />
              <h2>Email: {user.email}</h2>
              <h2>Name: {user.username}</h2>
              <button onClick={() => setIsEditing(true)}>Edit Profile</button>
              <button onClick={handleUpdatePassword}>Change Password</button>
            </>
          ) : (
            <>
              <h1>Null</h1>
            </>
          )}
          {/* <img src={`http://localhost:4000/images/${user.userimage}`} height={150} width={100} alt="" />
          <h2>Email: {user.email}</h2>
          <h2>Name: {user.username}</h2>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          <button onClick={handleUpdatePassword}>Change Password</button> */}
        </div>
      )}
    </div>
  )
}

export default Userprofile
