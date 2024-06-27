import React, { useState, useEffect } from "react";

const RealTimeLocationComponent = () => {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [error, setError] = useState(null);
  const [watchId, setWatchId] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setError(null);
        },
        (err) => {
          setError(err.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
      setWatchId(id);
    } else {
      setError("El navegador no soporta la Geolocalización.");
    }

    // Limpieza del efecto para detener la observación de la posición
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  return (
    <div>
      <h2>Tu ubicación actual es:</h2>
      {location.lat && location.lon ? (
        <div>
          <p>Latitude: {location.lat}</p>
          <p>Longitude: {location.lon}</p>
        </div>
      ) : (
        <p>No se puede obtener la ubicación</p>
      )}
      {error && (
        <p>
          Error: {error}
          <br /> Favor de establecer el acceso a la ubicación en la
          configuración de tu navegador.
        </p>
      )}
    </div>
  );
};

export default RealTimeLocationComponent;
