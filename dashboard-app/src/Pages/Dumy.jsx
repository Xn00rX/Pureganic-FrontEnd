import React, { useState, useEffect } from 'react';

import axios from 'axios';

const Dumy = () => {
  const [dumyData, setDumyData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    image: null,
    gender: 'No Comments', // Default value
    role: 'buyer', // Default value
    phonenumber: '',
    confirmPassword: '',
  })

  const [passwordError, setPasswordError] = useState('');
  useEffect(() => {
    if (dumyData.password !== dumyData.confirmPassword) {
      setPasswordError("Passwords don't match");
    } else {
      setPasswordError('');
    }
  }, [dumyData.password, dumyData.confirmPassword]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDumyData({
      ...dumyData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setDumyData({
      ...dumyData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('firstName', dumyData.firstName);
    formData.append('lastName', dumyData.lastName);
    formData.append('email', dumyData.email);
    formData.append('password', dumyData.password);
    formData.append('image', dumyData.image);
    formData.append('gender', dumyData.gender);
    formData.append('role', dumyData.role);
    formData.append('phonenumber', dumyData.phonenumber);

    try {
      const response = await axios.post('http://localhost:4000/dumy', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Data saved successfully:', response.data);

      setDumyData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        image: null,
        gender: 'No Comments',
        role: 'buyer',
        phonenumber: 0,
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input type="text" name="firstName" value={dumyData.firstName} onChange={handleInputChange} />
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" name="lastName" value={dumyData.lastName} onChange={handleInputChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={dumyData.email} onChange={handleInputChange} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={dumyData.password} onChange={handleInputChange} />
      </div>
      <div>
      <label>Confirm Password:</label>
      <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={dumyData.confirmPassword}
          onChange={handleInputChange}
          required
        />
        </div>
        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
      <div>
        <label>Upload Image:</label>
        <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
      </div>
      <div>
        <label>Gender:</label>
        <select name="gender" value={dumyData.gender} onChange={handleInputChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="No Comments">No Comments</option>
        </select>
      </div>
      <div>
        <label>Role:</label>
        <select name="role" value={dumyData.role} onChange={handleInputChange}>
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
            value={dumyData.phonenumber || "+973"}
            onChange={handleInputChange}
            pattern="\+973[0-9]{8}"
            required
        />
      </div>

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Dumy;
