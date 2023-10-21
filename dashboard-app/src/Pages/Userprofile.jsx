
import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Userprofile = ({user}) => {
  return (
    <div>
      <h1>Email: {user.email}</h1>
      <h1>Name: {user.username}</h1>
      <h1></h1>
      <h1></h1>

    </div>
  )
}

export default Userprofile