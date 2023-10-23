import React, { useState, useMemo } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from 'use-places-autocomplete'
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from '@reach/combobox'
import '@reach/combobox/styles.css'

import Axios from 'axios'

const Event = () => {
  const [selected, setSelected] = useState(null)
  const [mapCenter, setMapCenter] = useState({ lat: 26.0667, lng: 50.5577 })

  const { isLoaded } = useLoadScript({
    libraries: ['places'],
    googleMapsApiKey: 'AIzaSyC6DwktZ3BWJv42jfFa0n_M0p5opKEBKs4' 
  })

  const center = useMemo(() => mapCenter, [mapCenter])
  const options = useMemo(() => ({ clickableIcons: false }), [])

  const handleMapClick = (event) => {
    setSelected({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    })
  }

  const PlacesAutocomplete = () => {
    const {
      ready,
      value,
      setValue,
      suggestions: { status, data },
      clearSuggestions
    } = usePlacesAutocomplete()

    const handleSelect = async (address) => {
      setValue(address, false)
      clearSuggestions()

      const results = await getGeocode({ address })
      const { lat, lng } = await getLatLng(results[0])

      setSelected({ lat, lng })
      setMapCenter({ lat, lng }) 
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

  if (!isLoaded) return <div>Loading</div>

  return (
    <div>
      <h1>Event Map</h1>
      <PlacesAutocomplete />
      <GoogleMap
        zoom={10.36}
        center={center}
        mapContainerClassName="map-container"
        options={options}
        onClick={handleMapClick}
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
      {selected && (
        <div>
          <p>Latitude: {selected.lat}</p>
          <p>Longitude: {selected.lng}</p>
        </div>
      )}
    </div>
  )
}

export default Event
