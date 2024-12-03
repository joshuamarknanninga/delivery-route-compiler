import React from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 0,
  lng: 0
};

function RouteMap({ addresses }) {
  const [directions, setDirections] = React.useState(null);

  const handleDirectionsCallback = (response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        setDirections(response);
      } else {
        console.error('Directions request failed due to ' + response.status);
      }
    }
  };

  const waypoints = addresses.slice(1, -1).map(addr => ({
    location: addr.address,
    stopover: true
  }));

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={2}
      >
        {addresses.length > 1 && (
          <DirectionsService
            options={{
              origin: addresses[0].address,
              destination: addresses[addresses.length - 1].address,
              waypoints: waypoints,
              optimizeWaypoints: true,
              travelMode: 'DRIVING'
            }}
            callback={handleDirectionsCallback}
          />
        )}

        {directions && (
          <DirectionsRenderer
            options={{
              directions: directions
            }}
          />
        )}

        {addresses.map((addr, index) => (
          <Marker 
            key={addr.id} 
            position={{ lat: addr.lat, lng: addr.lng }} 
            label={`${index + 1}`} 
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(RouteMap);
