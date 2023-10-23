import React from 'react'
import axios from 'axios'

const showEvent = () => {

  let response = axios.get('http://localhost/4000/showevents')
  console.log(response)

  return (
    <div>showEvent</div>
  )
}

export default showEvent