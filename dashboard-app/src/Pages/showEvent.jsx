import React, { useState, useMemo, useEffect } from "react"
import axios from "axios"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import Swal from "sweetalert2"

import "../App.css"

const ShowEvent = ({ user }) => {
  console.log(user)
  const [mapCenter, setMapCenter] = useState({ lat: 26.0667, lng: 50.5577 })
  const center = useMemo(() => mapCenter, [mapCenter])
  const [mapZoom, setMapZoom] = useState(10.36)
  const [responseData, setResponseData] = useState([])
  const options = useMemo(
    () => ({
      zoomControl: false,
      mapTypeControl: false,
      panControl: false,
      clickableIcons: false,
    }),
    []
  )
  const { isLoaded } = useLoadScript({
    libraries: ["places"],
    googleMapsApiKey: "AIzaSyDbYlIH0nJY7TuCEAYoc-mZBRdJ7BX2jeI",
  })
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/showevents")
      setResponseData(response.data)
      console.log("Response Data:", response.data)
    } catch (error) {
      console.error("An error occurred:", error)
    }
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:4000/showevents")
        setResponseData(response.data)
        console.log("Response Data:", response.data)
      } catch (error) {
        console.error("An error occurred:", error)
      }
    }
    fetchData()
  }, [])

  const handleDelete = async (eventId) => {
    console.log("Deleting event with ID:", eventId)

    try {
      if (eventId) {
        await axios.delete(`http://localhost:4000/eventid/${eventId}`)
        console.log(`Event with ID ${eventId} deleted successfully`)
        fetchData() // Refetch data after deletion
      } else {
        console.error("Invalid eventId:", eventId)
      }
    } catch (error) {
      console.error(`Error deleting event: ${error}`)
    }
  }

  const book = async () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Booked!",
      showConfirmButton: false,
      background: "black",
      color: "white",
      timer: 1500,
    })
  }

  return (
    <div className="LoginPage">
      <div className="LoginParentHide">
        <h3 className="addph">Events</h3>
        {responseData.length > 0 ? (
          responseData.map((event, index) => (
            <div key={index}>
              <div className="flexy">
                <h5 className="addph">
                  {/* Event Name :<br></br> */}
                  {event.Name}
                </h5>
                {/* <img
                  src={` http://localhost:4000${event.EventImage}`}
                  alt="product-img"
                /> */}
                <p className="addph">Ticket Price: {event.Price}</p>
                <p className="addph">
                  Event Location Name: {event.EventLocation}
                </p>

                {/* <p className="addph">
                Event Date:
                <br />
                {event.EventDate}
              </p> */}

                <h5 className="addph">Farm Location</h5>
                {isLoaded && (
                  <>
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
                        <Marker
                          position={{
                            lat: event.Latitude,
                            lng: event.Longitude,
                          }}
                        />
                      </GoogleMap>
                    </a>
                    <br />
                    {user && user.userType === "seller" ? (
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleDelete(event._id)}
                      >
                        Delete Event
                      </button>
                    ) : (
                      <button className="btn btn-secondary" onClick={book}>
                        Get a Ticket
                      </button>
                    )}
                  </>
                )}
              </div>
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
