import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React, { useState, useEffect, useCallback } from 'react';

export default function GoogleMapsContainerComponenet({ user }) {
  const [center, setCenter] = useState(null);
  const [containerStyle, setContainerStyle] = useState({
    width: '400px',
    height: '400px'
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (user) {
      setCenter({
        lat: user.location.coordinates[1],
        lng: user.location.coordinates[0]
      });
    }
  }, [user]);

  const { isLoaded: apiIsLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: `AIzaSyCX2bWFyZvH_rjXTpikoIC_8tO0KFcNQYI`
  });

  useEffect(() => {
    setIsLoaded(apiIsLoaded);
  }, [apiIsLoaded]);

  const onLoad = useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
      setMap(map);
    },
    [center]
  );

  const onUnmount = useCallback(
    function callback(map) {
      setMap(null);
    },
    []
  );

  return (
    <div className="container">
      <h6 className="text-center">Google Maps Container Component</h6>
      <div>Google Maps API Section</div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <></>
        </GoogleMap>
      ) : (
        <>No map to be displayed</>
      )}
    </div>
  );
}