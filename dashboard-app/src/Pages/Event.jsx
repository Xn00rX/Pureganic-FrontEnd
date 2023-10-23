import React, { useState, useMemo } from 'react'
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox'
import '@reach/combobox/styles.css'
import axios from 'axios' // Import Axios

const Event = () => {
  const [selected, setSelected] = useState(null)
  const [mapCenter, setMapCenter] = useState({ lat: 26.0667, lng: 50.5577 })
  const [eventData, setEventData] = useState({
    Name: '',
    Price: 0,
    EventImage: null, // Changed to hold the file object
    Latitude: 0,
    Longitude: 0,
  })

  const { isLoaded } = useLoadScript({
    libraries: ['places'],
    googleMapsApiKey: 'AIzaSyC6DwktZ3BWJv42jfFa0n_M0p5opKEBKs4',
  })

  const center = useMemo(() => mapCenter, [mapCenter])
  const options = useMemo(() => ({ clickableIcons: false }), [])

  const handleInputChange = (e) => {
    const { name, value, type } = e.target
    setEventData({
      ...eventData,
      [name]: type === 'file' ? e.target.files[0] : value,
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
        componentRestrictions: { country: 'BH' },
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
            {status === 'OK' &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('Name', eventData.Name)
    formData.append('Price', eventData.Price)
    formData.append('Latitude', eventData.Latitude)
    formData.append('Longitude', eventData.Longitude)
    formData.append('EventImage', eventData.EventImage)

    try {
      const response = await axios.post('http://localhost:4000/addevent', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.status === 200) {
        console.log('Event data submitted successfully.')
        // You can handle success accordingly
      } else {
        console.error('Failed to submit event data.')
        // Handle errors from the backend
      }
    } catch (error) {
      console.error('Error sending data to the backend:', error)
    }
  }

  if (!isLoaded) return <div>Loading</div>

  return (
    <div>
      <h1>Event Map</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Name">Event Name:</label>
          <input
            type="text"
            id="Name"
            name="Name"
            value={eventData.Name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="Price">Event Price:</label>
          <input
            type="number"
            id="Price"
            name="Price"
            value={eventData.Price}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="EventImage">Event Image:</label>
          <input
            type="file"
            id="EventImage"
            name="EventImage"
            accept="image/*"
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
        <button type="submit">Submit Event</button>
      </form>
    </div>
  )
}

export default Event
