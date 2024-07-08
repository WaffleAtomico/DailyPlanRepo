import React, { useState } from 'react';

const LocationComponent = () => {

  const [location, setLocation] = useState({ lat: null, lon: null });
  const [error, setError] = useState(null);

  const getLocation = () => {
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'granted') {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
      } else if (result.state === 'prompt') {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
      } else if (result.state === 'denied') {
        setError('Permission denied. Please enable location access in your browser settings.');
      }

      result.onchange = function () {
        if (result.state === 'granted') {
          navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        }
      };
    });
  };

  const successCallback = (position) => {
    setLocation({
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    });
    setError(null);
  };

  const errorCallback = (err) => {
    setError(err.message);
  };
  /*
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [error, setError] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
        alert("aqui");
      navigator.geolocation.getCurrentPosition(
        (position) => {
            alert("position");
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setError(null);
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation no es soportada por éste navegador.");
    }
  };*/

  return (
    <div>
      <button onClick={getLocation}>Obtener ubicación</button>
      {location.lat && location.lon ? (
        <div>
          <p>Latitud: {location.lat}</p>
          <p>Longitud: {location.lon}</p>
        </div>
      ) : (
        <p>Debe otorgar permiso para obtener la ubicación</p>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default LocationComponent;
