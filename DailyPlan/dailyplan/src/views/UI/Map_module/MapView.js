import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import L from 'leaflet';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import '../../../styles/UI/Map/MapView.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const SearchControl = () => {
  const map = useMapEvents({
    geosearch_showlocation: (result) => {
      const { x, y, label } = result.location;
      console.log(`Location selected: ${label} (${y}, ${x})`);
    },
  });

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      showMarker: true,
      retainZoomLevel: false,
      animateZoom: true,
      autoClose: true,
      searchLabel: 'Ingresa el nombre de una ciudad o lugar',
    });

    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, [map]);

  return null;
};

const ClickHandler = ({ setDepartureMarker, setArrivalMarker, selectingDeparture, onPlaceSelect }) => {
  const fetchAddress = async (lat, lng) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
    const data = await response.json();
    return data.display_name;
  };

  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
   
      const address = await fetchAddress(lat, lng);
      const place = `${address} (Lat: ${lat}, Lng: ${lng})`;

      if (selectingDeparture) {
        setDepartureMarker([lat, lng]);
        onPlaceSelect('departure', place, { lat, lng });
        console.log("Lugar de salida:", address, lat, lng);
      } else {
        setArrivalMarker([lat, lng]);
        onPlaceSelect('arrival', place, { lat, lng });
        console.log("Lugar de llegada:", address, lat, lng);
      }
    }
  });
  return null;
};

const MapView = ({ onPlaceSelect }) => {
  const [locationPermission, setLocationPermission] = useState(false);
  const [position, setPosition] = useState([0, 0]); // Default position
  const [departureMarker, setDepartureMarker] = useState(null);
  const [arrivalMarker, setArrivalMarker] = useState(null);
  const [error, setError] = useState(null);
  const [selectingDeparture, setSelectingDeparture] = useState(true); // State to toggle between departure and arrival

  useEffect(() => {
    navigator.permissions.query({ name: 'geolocation' }).then(result => {
      if (result.state !== 'granted') {
        setLocationPermission(true);
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setPosition([latitude, longitude]); // Set the map's initial position to the user's location
          },
          (error) => {
            console.error('Error getting location:', error);
            setError('Error getting location');
          }
        );
      } else {
        setLocationPermission(false);
      }
    });
  }, []);

  const MyMapComponent = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center, 13);
    }, [center, map]);
    return null;
  };

  const MousePositionLogger = () => {
    useMapEvents({
      mousemove: (e) => {
       
      },
    });
    return null;
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      {locationPermission ? (
        <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
          <MyMapComponent center={position} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <SearchControl />
          <ClickHandler
            setDepartureMarker={setDepartureMarker}
            setArrivalMarker={setArrivalMarker}
            selectingDeparture={selectingDeparture}
            onPlaceSelect={onPlaceSelect}
          />
          <MousePositionLogger />
          {departureMarker && (
            <Marker position={departureMarker}>
              <Popup>Lugar de salida</Popup>
            </Marker>
          )}
          {arrivalMarker && (
            <Marker position={arrivalMarker}>
              <Popup>Lugar de llegada</Popup>
            </Marker>
          )}
        </MapContainer>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <FaExclamationTriangle size={50} color="red" />
          <p>No se dio el permiso. Verifíquelo en Permisos.</p>
        </div>
      )}
      <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1000 }}>
        <Button
          variant={selectingDeparture ? "primary" : "secondary"}
          onClick={() => setSelectingDeparture(true)}
          style={{ marginRight: '5px' }}
        >
          Seleccionar Lugar de Salida
        </Button>
        <Button
          variant={!selectingDeparture ? "primary" : "secondary"}
          onClick={() => setSelectingDeparture(false)}
          style={{ marginRight: '5px' }}
        >
          Seleccionar Lugar de Llegada
        </Button>
        <Button
          variant="danger"
          onClick={() => setDepartureMarker(null)}
          style={{ marginRight: '5px' }}
        >
          Borrar Lugar de Salida
        </Button>
        <Button
          variant="danger"
          onClick={() => setArrivalMarker(null)}
        >
          Borrar Lugar de Llegada
        </Button>
      </div>
    </div>
  );
};

export default MapView;
