import React, { useState, useMemo } from 'react'
import axios from 'axios'
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api'
import '../App.css'

const ShowEvent = () => {
  const [mapCenter, setMapCenter] = useState({ lat: 26.0667, lng: 50.5577 })
  const center = useMemo(() => mapCenter, [mapCenter])
  const [responseData, setResponseData] = useState([])
  const options = useMemo(() => ({ clickableIcons: false }), [])
  const { isLoaded } = useLoadScript({
    libraries: ['places'],
    googleMapsApiKey: 'AIzaSyC6DwktZ3BWJv42jfFa0n_M0p5opKEBKs4',
  })

  const handleChange = async () => {
    try {
      const response = await axios.get('http://localhost:4000/showevents')
      setResponseData(response.data)
      console.log(response.data)
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  return (
    <div>
      <button onClick={handleChange}>Fetch Data</button>
      <div>
        {responseData.length > 0 ? (
          responseData.map((event, index) => (
            <div key={index}>
              <h2>{event.Name}</h2>
              <p>{event.Price}</p>
              <p>{event.Longitude}</p>
              <p>Event Location</p>
              <GoogleMap
                zoom={10.36}
                center={center}
                mapContainerClassName="map-container"
                options={options}
              
              >
      
                  <MarkerF
                    position={{ lat: event.Latitude, lng: event.Longitude }}
                  />
                
              </GoogleMap>
            </div>
          ))
        ) : (
          <p>No events available</p>
        )}
      </div>
    </div>
  )
}

export default ShowEvent
