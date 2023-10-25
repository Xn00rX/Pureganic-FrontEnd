import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { SignInUser } from "../services/Auth"
import Swal from "sweetalert2"

const Login = ({ setUser, setUserType }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const payload = await SignInUser(formData)
      console.log("User Logged In:", payload)
      console.log(payload.userimage)
      setFormData({
        email: "",
        password: "",
      })
      setUser(payload)
      setUserType(payload.userType)

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer)
          toast.addEventListener("mouseleave", Swal.resumeTimer)
        },
      })

      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
        background: "black",
        color: "white",
      })

      navigate("/")
    } catch (error) {
      console.error("Error:", error)
      setError("Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}

export default Login
