import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import React, { useState, useEffect, useCallback } from 'react';

export default function GoogleMapsContainerComponenet({ user }) {

  console.log(user, 'user at the beginning')

  const [center, setCenter] = useState(null);
  const [containerStyle, setContainerStyle] = useState({
    width: 'auto',
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

  const loadAdvancedMarker = async () => {
    try {
      const libraries = await google.maps.importLibrary("marker");
      const AdvancedMarkerElement = libraries.AdvancedMarkerElement;
      console.log(AdvancedMarkerElement, 'advancedMarker in loadAdvancedMarker function');
    } catch (error) {
      console.error('Error loading advanced marker:', error);
    }
  };

  useEffect(() => {
    setIsLoaded(apiIsLoaded);
    if (apiIsLoaded && center) {
      loadAdvancedMarker();
    }
  }, [apiIsLoaded, center]);

  const onLoad = useCallback(
    async function callback(map) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
      setMap(map);
      await loadAdvancedMarker();
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

  console.log(center, 'center before return')

  // if (center == null) {
  //   return <div>Loading...</div>
  // }
  // console.log(AdvancedMarkerElement, 'advancedMarker')
  return (
    <div className="container">
      {/* <h6 className="text-center">Google Maps Container Component</h6> */}
      {/* <div>Google Maps API Section</div> */}
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
        <div className='marker position'>
          {center && (

            <Marker position={center} />
          )}
          </div>
        </GoogleMap>
      ) : (
        <>No map to be displayed</>
      )}
    </div>
  );
}