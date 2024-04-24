import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import React, { useState, useEffect, useCallback } from 'react';

export default function GoogleMapsContainerComponenet({ user }) {

  // console.log(user, 'user at the beginning')

  const [center, setCenter] = useState(user ? {
    lat: user.location.coordinates[1],
    lng: user.location.coordinates[0]
  } : null);
  const [containerStyle, setContainerStyle] = useState({
    width: 'auto',
    height: '400px'
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [map, setMap] = useState(null);
  const [zoom, setZoom] = useState(18)

  const { isLoaded: apiIsLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: `AIzaSyCX2bWFyZvH_rjXTpikoIC_8tO0KFcNQYI`
  });

  const onLoad = useCallback(
    async function callback(map) {
      // const bounds = new window.google.maps.LatLngBounds(center);
      // map.fitBounds(bounds);
      setMap(map);
      console.log(center, 'center coordinates in onLoad')
    },
    [center]
  );

  const onUnmount = useCallback(
    function callback(map) {
      setMap(null);
    },
    []
  );

  useEffect(() => {
    if (user) {
      setCenter({
        lat: user.location.coordinates[1],
        lng: user.location.coordinates[0]
      });
    }
  }, [user]);

  useEffect(() => {
    setIsLoaded(apiIsLoaded);
    console.log('made it inside useEffect for isLoaded', isLoaded)
  }, [apiIsLoaded]);

  console.log(center, 'center before return')
  return (
    <div className="container">
      {isLoaded && center && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {center && <Marker position={center} />}
        </GoogleMap>
      )}
    </div>
  );
}