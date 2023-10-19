import React, { useState, useEffect } from 'react'

const Register= ()=> {

  const [formData, setFormData] = useState({
    profileImage: null,
    firstName: '',
    lastName: '',
    email: '',
    userType: 'buyer',
    dateOfBirth: '',
    gender: 'male',
    password: '',
    confirmPassword: '',

  })

  const [passwordError, setPasswordError] = useState('')
  useEffect(() => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords don't match");
    } else {
      setPasswordError('');
    }
  }, [formData.password, formData.confirmPassword , formData])


  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target
    const newValue = type === 'file' ? files[0] : value
    setFormData({
      ...formData,
      [name]: newValue,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log('User Registered added:', response.data)
      setFormData({
        profileImage: null,
        firstName: '',
        lastName: '',
        email: '',
        userType: 'buyer',
        dateOfBirth: '',
        gender: 'male',
        password: '',
        confirmPassword: '',
      })
    } catch (error) {

      console.error('Error:', error)
    }
  }
  
  return (
    <div>
      <h1>Registration</h1>
      <form>
      <input
        type="file"
        name="profileImage"
        accept="image/*"
        onChange={handleInputChange}
      />
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <select
          name="userType"
          value={formData.userType}
          onChange={handleInputChange}
        >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
       
        <button type="button" onClick={handleSubmit}>
          Register
        </button>
      </form>
    </div>
  )
}

export default Register
