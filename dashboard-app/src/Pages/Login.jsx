import React, { useState, useEffect } from 'react'

const Login= ()=> {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target
    const newValue = value
    setFormData({
      ...formData,
      [name]: newValue,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/login', formData)
      console.log('User Logged In:', response.data)
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
