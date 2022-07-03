import React, { useEffect, useState } from 'react'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

function Map ({ address }) {
  const [position, setPosition] = useState({ lat: 16.007350, lng: 108.191960 })

  const handleSelect = () => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        setPosition(latLng)
      })
  }
  useEffect(() => {
    handleSelect()
  }, [])
  return (
    <>
      <GoogleMap defaultZoom={15} defaultCenter={position} center={position}>
        <Marker position={position} />
      </GoogleMap>
    </>
  )
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default function HotelDetailsMaps ({ address }) {
  // const mapRef = useRef()
  // const [zoom, setZoom] = useState(10)
  // const [bound, setBound] = useState(null)
  return (
    <div className='listing-section__wrap position-relative mt-4'>
      <div>
        <h2 className='hotel-info__title font-semibold'>Vị trí</h2>
        <span className='d-block mt-2 text-neutral-500'>Địa chỉ cụ thể</span>
      </div>
      <div className='hotel-map-wrap'>
        <WrappedMap
          address={address}
          googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyCCczmSUdglW4ptnhcheoKJlCKm5Q_mzcU&libraries=places'
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>
    </div>
  )
}
