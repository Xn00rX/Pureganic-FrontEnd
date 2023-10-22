import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Userprofile = ({ user }) => {
  console.log(user.id)


  const navigate = useNavigate()
  const [userData, setUserData] = useState({ ...user })
  const [isEditing, setIsEditing] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
 

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData({
      ...userData,
      [name]: value,
    })
  }

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0]
    setSelectedImage(imageFile)
  }

  const handlePasswordChange = () => {
    navigate('/passwordchange')
  }

  const handleUpdateProfile = async () => {
    const formData = new FormData()
    formData.append('firstName', userData.firstName)
    formData.append('lastName', userData.lastName)
    formData.append('email', userData.email)

    if (selectedImage) {
      formData.append('image', selectedImage)
    }

    try {

      // const response =  axios.get(`http://localhost:4000/userinfo/${user.id}`)
      // console

      const response = await axios.post(`http://localhost:4000/updateprofile/${user.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setIsEditing(false)
      // You can update the state with the response data if needed
      // setUserData({ ...userData, ...response.data })
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
            value={userData.firstName}
            onChange={handleInputChange}
          />
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleInputChange}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            value={userData.email}
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
          <img src={`http://localhost:4000/images/${userData.userimage}`} height={150} width={100} alt="" />
          <h2>Email: {userData.email}</h2>
          <h2>Name: {userData.username}</h2>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          <button onClick={handlePasswordChange}>Update Password</button>
        </div>
      )}
    </div>
  )
}

export default Userprofile
