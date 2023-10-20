import React, { useState } from 'react'
import axios from 'axios'

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData()
      formData.append('image', selectedFile)

      axios.post('http://localhost:4000/upload', formData).then((response) => {
        console.log(response.data)
      })
    }
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  )
}

export default ImageUpload
