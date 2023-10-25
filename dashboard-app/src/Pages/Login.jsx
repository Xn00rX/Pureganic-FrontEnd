import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignInUser } from '../services/Auth'
import plant from '../images/plant.gif'

const Login = ({ setUser }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const payload = await SignInUser(formData)
      console.log('User Logged In:', payload)
      console.log(payload.userimage)
      setFormData({
        email: '',
        password: ''
      })
      setUser(payload)
      navigate('/products')
    } catch (error) {
      console.error('Error:', error)
      setError('Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="LoginPage">
      <div className="LoginParentHide"></div>
      <div className="LoginParent">
        <div className="LoginInfo">
          <br />
          <br />
          <h1 className="LoginHeading">
            Welcome back to <span className="changeColor">PureGanic</span>
          </h1>
          <br />
          <br />
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-control myInput"
            />
            <br />
            <br />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-control myInput"
            />
            <br />

            <button
              type="submit"
              disabled={loading}
              className="btn btn-outline-success myBtns"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
        {error && <p>{error}</p>}
        <div className="plantgif">
          <img src={plant} />
        </div>
      </div>
    </div>
  )
}

export default Login
