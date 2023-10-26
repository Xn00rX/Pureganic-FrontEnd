import React, { useState, useMemo } from "react"
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api"

import { useNavigate } from "react-router-dom"
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete"
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox"
import "@reach/combobox/styles.css"
import axios from "axios"

const Event = ({ user }) => {
  let navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  const [mapCenter, setMapCenter] = useState({ lat: 26.0667, lng: 50.5577 })
  const [eventData, setEventData] = useState({
    Name: "",
    Price: 0,
    EventImage: null,
    EventLocation: "",
    Date: "",
    Latitude: 0,
    Longitude: 0,
  })

  const { isLoaded } = useLoadScript({
    libraries: ["places"],
    googleMapsApiKey: "AIzaSyDbYlIH0nJY7TuCEAYoc-mZBRdJ7BX2jeI",
  })

  const center = useMemo(() => mapCenter, [mapCenter])
  const options = useMemo(() => ({ clickableIcons: false }), [])

  const handleInputChange = (e) => {
    const { name, value, type } = e.target
    setEventData({
      ...eventData,
      [name]: type === "file" ? e.target.files[0] : value,
    })
  }

  const handleMapClick = (event) => {
    const latitude = event.latLng.lat()
    const longitude = event.latLng.lng()

    setSelected({
      lat: latitude,
      lng: longitude,
    })

    setMapCenter({
      lat: latitude,
      lng: longitude,
    })

    setEventData({
      ...eventData,
      Latitude: latitude,
      Longitude: longitude,
    })
  }

  const PlacesAutocomplete = () => {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
    } = usePlacesAutocomplete({
      requestOptions: {
        componentRestrictions: { country: "BH" },
      },
    })

    const handleSelect = async (address) => {
      setValue(address, false)

      const results = await getGeocode({ address })
      const { lat, lng } = await getLatLng(results[0])

      setSelected({ lat, lng })
      setMapCenter({ lat, lng })

      setEventData({
        ...eventData,
        Latitude: lat,
        Longitude: lng,
      })
    }

    return (
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    )
  }

  // const Navigation = ()=>{
  //   const timer = setTimeout(() => {
  //     navigate('/signin')
  //   }, 5000)
  //   return () => clearTimeout(timer)
  // }

  // useEffect(() => {
  //   Navigation()
  // }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("Name", eventData.Name)
    formData.append("Price", eventData.Price)
    formData.append("Latitude", eventData.Latitude)
    formData.append("Longitude", eventData.Longitude)
    formData.append("EventImage", eventData.EventImage)
    formData.append("EventLocation", eventData.EventLocation)
    formData.append("Date", eventData.Date)

    try {
      const response = await axios.post(
        "http://localhost:4000/addevent",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      console.log(response)
      if (response.status == 200) {
        console.log("Event data submitted successfully.")
        // console.log("help")
        // console.log(response.data)
        setEventData({
          Name: "",
          Price: 0,
          EventImage: null,
          EventLocation: "",
          Date: "",
          Latitude: 0,
          Longitude: 0,
        })
        // console.log("help")
      } else {
        console.error("Failed to submit event data.")
      }

      //HERE
      // console.log("help")
      navigate("/showevents")
    } catch (error) {
      console.error("Error sending data to the backend:", error)
    }
  }

  if (!isLoaded) return <div>Loading</div>

  return (
    <>
      {user ? (
        <div className="LoginPage">
          <div className="LoginParentHide">
            <h1 className="addph">Add Event</h1>
            <div className="shadow p-3 mb-5 bg-body-tertiary rounded myForms">
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="Name" className="form-label">
                    Event Name:
                  </label>
                  <input
                    type="text"
                    id="Name"
                    name="Name"
                    className="form-control"
                    value={eventData.Name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="Price" className="form-label">
                    Event Price:
                  </label>
                  <input
                    type="number"
                    id="Price"
                    name="Price"
                    className="form-control"
                    value={eventData.Price}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="EventImage" className="form-label">
                    Event Image:
                  </label>
                  <input
                    type="file"
                    id="EventImage"
                    name="EventImage"
                    accept="image/*"
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="EventLocation" className="form-label">
                    Event Location Name:
                  </label>
                  <input
                    type="text"
                    id="EventLocation"
                    name="EventLocation"
                    className="form-control"
                    value={eventData.EventLocation}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="Date" className="form-label">
                    Event Date:
                  </label>
                  <input
                    type="date"
                    id="Date"
                    name="Date"
                    className="form-control"
                    value={eventData.Date}
                    onChange={handleInputChange}
                  />
                </div>
                <PlacesAutocomplete />
                <GoogleMap
                  zoom={10.36}
                  center={center}
                  mapContainerClassName="map-container"
                  options={options}
                  onClick={handleMapClick}
                >
                  {selected && <MarkerF position={selected} />}
                </GoogleMap>
                {selected && (
                  <div>
                    <p>Latitude: {selected.lat}</p>
                    <p>Longitude: {selected.lng}</p>
                  </div>
                )}
                <button type="submit" className="btn btn-secondary">
                  Create Event
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h1> You need to login </h1>
          {navigate("/signin")}
          {/* {Navigation()} */}
        </>
      )}
    </>
  )
}

export default Event
