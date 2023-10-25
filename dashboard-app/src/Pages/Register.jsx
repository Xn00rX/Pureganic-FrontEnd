import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { RegisterUser } from "../services/Auth"

const Register = () => {
  let navigate = useNavigate()
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    image: "",
    gender: "No Comments",
    role: "buyer",
    phonenumber: "",
    confirmPassword: "",
  })

  const [passwordError, setPasswordError] = useState("")
  useEffect(() => {
    if (userData.password !== userData.confirmPassword) {
      setPasswordError("Passwords don't match")
    } else {
      setPasswordError("")
    }
  }, [userData.password, userData.confirmPassword])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData({
      ...userData,
      [name]: value,
    })
  }

  const handleImageChange = (e) => {
    setUserData({
      ...userData,
      image: e.target.files[0],
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("firstName", userData.firstName)
    formData.append("lastName", userData.lastName)
    formData.append("email", userData.email)
    formData.append("password", userData.password)
    formData.append("image", userData.image)
    formData.append("gender", userData.gender)
    formData.append("role", userData.role)
    formData.append("phonenumber", userData.phonenumber)

    try {
      const response = await RegisterUser(formData)
      console.log("Response:", response)

      setUserData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        image: "",
        gender: "No Comments",
        role: "buyer",
        phonenumber: 0,
        confirmPassword: "",
      })
    } catch (error) {
      console.error("Error:", error)
    }
    navigate("/signin")
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={userData.firstName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={userData.lastName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={userData.confirmPassword}
          onChange={handleInputChange}
          required
        />
      </div>
      {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
      <div>
        <label>Upload Image:</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <div>
        <label>Gender:</label>
        <select
          name="gender"
          value={userData.gender}
          onChange={handleInputChange}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="No Comments">No Comments</option>
        </select>
      </div>
      <div>
        <label>Role:</label>
        <select name="role" value={userData.role} onChange={handleInputChange}>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="tel"
          name="phonenumber"
          placeholder="+97330000000"
          value={userData.phonenumber || "+973"}
          onChange={handleInputChange}
          pattern="\+973[0-9]{8}"
          required
        />
      </div>

      <button type="submit">Sign Up</button>
    </form>
  )
}

export default Register
