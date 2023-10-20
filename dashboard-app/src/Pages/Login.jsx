import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [userImage, setUserImage] = useState('') // State to store the user image

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:4000/apilogin', formData)
      console.log('User Logged In:', response.data)
      const im = response.data.userimage
      setUserImage(im) // Set the user image in the state
      alert('hello')
      setFormData({
        email: '',
        password: '',
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
      <div>
        {userImage && ( // Check if userImage is available before rendering the image
          <img src={`http://localhost:4000/images/${userImage}`} alt="My Image" height={100} width={500} />
        )}
      </div>
      <h1>Login</h1>
      <form>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button type="button" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
