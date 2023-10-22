import React, { useState } from 'react'
import axios from 'axios'

const Userprofile = ({ user }) => {
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

  const handleUpdateProfile = async () => {
    const formData = new FormData()
    formData.append('firstName', newUserData.firstName)
    formData.append('lastName', newUserData.lastName)
    formData.append('email', newUserData.email)

    if (selectedImage) {
      formData.append('image', selectedImage)
    }

    try {
      const response = await axios.post(`http://localhost:4000/updateprofile/${user.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      setIsEditing(false)
      // console.log(response.data)
      // setNewUserData({ ...newUserData, ...response.data })
      // console.log(setNewUserData)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      {isEditing ? (
        <form className='form'>
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
        </form>
      ) : (
        <div>
          <img src={`http://localhost:4000/images/${user.userimage}`} height={150} width={100} alt="" />
          <h2>Email: {user.email}</h2>
          <h2>Name: {user.username}</h2>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  )
}

export default Userprofile
