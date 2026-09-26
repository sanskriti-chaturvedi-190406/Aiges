import { useState } from 'react'

function LocationConfirmation({ value, onChange }) {
  const [locationError, setLocationError] = useState('')

  function useCurrentLocation() {
    setLocationError('')
    if (!navigator.geolocation) {
      setLocationError('Location access is not available in this browser. Enter your location below.')
      return
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => onChange(`Current location (${coords.latitude.toFixed(5)}, ${coords.longitude.toFixed(5)})`),
      () => setLocationError('We could not access your location. Check your browser permissions or enter it below.'),
      { timeout: 10000 },
    )
  }

  return (
    <div className="field-group">
      <div className="field-label-row"><label htmlFor="request-location">Where do you need help?</label><span>Required</span></div>
      <div className="location-input-wrap">
        <span className="location-pin" aria-hidden="true">⌖</span>
        <input id="request-location" autoComplete="street-address" value={value} onChange={(event) => onChange(event.target.value)} placeholder="Address, landmark, or area" required />
        <button type="button" className="use-location-button" onClick={useCurrentLocation}>Use my location</button>
      </div>
      <p className="field-hint">Add a nearby landmark if your address is difficult to find.</p>
      {locationError && <p className="field-error" role="alert">{locationError}</p>}
    </div>
  )
}

export default LocationConfirmation
