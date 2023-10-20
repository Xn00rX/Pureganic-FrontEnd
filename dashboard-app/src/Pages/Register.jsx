import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    image: null,
    phoneNumber: '',
    seller: 'buyer',
    gender: 'male',
    password: '',
    confirmPassword: '',
  });

  const [passwordError, setPasswordError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords don't match");
    } else {
      setPasswordError('');
    }
  }, [formData.password, formData.confirmPassword]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'image') {
      setSelectedFile(e.target.files[0]);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await axios.post('http://localhost:4000/apiregister', formData);
      console.log('User Registered:', response.data);
      setRegistrationSuccess('Registration successful');

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        image: null,
        phoneNumber: '',
        seller: 'buyer',
        gender: 'male',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Error:', error);
      setRegistrationSuccess('Registration failed');
    }
  };

  return (
    <div className="registration-form">
      <h1>Registration</h1>
      {registrationSuccess && <p>{registrationSuccess}</p>}
      <form onSubmit={handleSubmit}>
        <input type="file" name="image" onChange={handleInputChange} />

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Enter your phone number"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          required
        />
        <select name="seller" value={formData.seller} onChange={handleInputChange}>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
        <select name="gender" value={formData.gender} onChange={handleInputChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />
        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
