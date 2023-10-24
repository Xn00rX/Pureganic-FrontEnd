import React, { useState, useMemo, useEffect } from 'react'
import axios from 'axios'
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api'
import '../App.css'

const ShowEvent = () => {
  const [mapCenter, setMapCenter] = useState({ lat: 26.0667, lng: 50.5577 })
  const center = useMemo(() => mapCenter, [mapCenter])
  const [mapZoom, setMapZoom] = useState(10.36)
  const [responseData, setResponseData] = useState([])
  const options = useMemo(
    () => ({
      zoomControl: false,
      mapTypeControl: false,
      panControl: false,
      clickableIcons: false
    }),
    []
  )
  const { isLoaded } = useLoadScript({
    libraries: ['places'],
    googleMapsApiKey: 'AIzaSyC6DwktZ3BWJv42jfFa0n_M0p5opKEBKs4'
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:4000/showevents')
        setResponseData(response.data)
        console.log(response.data)
      
        console.log(response.data[6]['EventLocation']);
        
      } catch (error) {
        console.error('An error occurred:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <div>
        {responseData.length > 0 ? (
          responseData.map((event, index) => (
            <div key={index}>
              <h2>
                Event Name :<br></br>
                {event.Name}
              </h2>

              <p>
                Ticket Price: <br></br> {event.Price}
              </p>
              <p>
                Event Location Name: <br></br> {event.EventLocation}
              </p>

              <p>
                Event Date:
                <br />
                {event.EventDate}
              </p>

              <p>Event Location</p>
              {isLoaded && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${event.Latitude},${event.Longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GoogleMap
                    zoom={mapZoom}
                    center={center}
                    mapContainerClassName="map-container"
                    options={options}
                  >
                    <MarkerF
                      position={{ lat: event.Latitude, lng: event.Longitude }}
                    />
                  </GoogleMap>
                </a>
              )}
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
