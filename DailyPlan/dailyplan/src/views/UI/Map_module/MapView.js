import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import L from 'leaflet';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import '../../../styles/UI/Map/MapView.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const SearchControl = () => {
  const map = useMap();
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

const ClickHandler = ({ setDepartureMarker, setArrivalMarker, selectingDeparture, onPlaceSelect, transportMode }) => {
  const fetchAddress = async (lat, lng) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
    const data = await response.json();
    return data.display_name;
  };

  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      const address = await fetchAddress(lat, lng);
      const place = `${address}`;

      if (selectingDeparture) {
        setDepartureMarker([lat, lng]);
        onPlaceSelect('departure', place, [lat, lng], transportMode);
      } else {
        setArrivalMarker([lat, lng]);
        onPlaceSelect('arrival', place, [lat, lng], transportMode);
      }
    }
  });
  return null;
};

const MapView = ({ onPlaceSelect, active }) => {
  const [locationPermission, setLocationPermission] = useState(false);
  const [position, setPosition] = useState([0, 0]);
  const [departureMarker, setDepartureMarker] = useState(null);
  const [arrivalMarker, setArrivalMarker] = useState(null);
  const [error, setError] = useState(null);
  const [selectingDeparture, setSelectingDeparture] = useState(true);
  const [transportMode, setTransportMode] = useState('driving');
  const [sidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    const fetchAddress = async (lat, lng) => {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      return data.display_name;
    };

    const getCurrentPosition = async () => {
      try {
        const result = await navigator.permissions.query({ name: 'geolocation' });
        if (result.state === 'granted') {
          setLocationPermission(false);
          return;
        }

        setLocationPermission(true);

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setPosition([latitude, longitude]);
            setDepartureMarker([latitude, longitude]);

            const address = await fetchAddress(latitude, longitude);
            onPlaceSelect('departure', address, [latitude, longitude], transportMode);
          },
          (error) => {
            console.error('Error getting location:', error);
            setError('Error getting location');
          }
        );
      } catch (error) {
        console.error('Error checking geolocation permission:', error);
        setError('Error checking geolocation permission');
      }
    };

    getCurrentPosition();
  }, [active]);

  const MyMapComponent = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center, 13);
    }, [center, map]);
    return null;
  };

  if (!active) {
    return (
      <div className="no-permission">
        <FaExclamationTriangle size={50} color="red" />
        <p>No se dio el permiso. Verifíquelo en Permisos.</p>
      </div>
    );
  }

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
            transportMode={transportMode}
          />
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
        <div className="no-permission">
          <FaExclamationTriangle size={50} color="red" />
          <p>No se dio el permiso. Verifíquelo en Permisos.</p>
        </div>
      )}
      <div className={`sidebar ${sidebarVisible ? 'visible' : 'hidden'}`}>
        <DropdownButton
          id="dropdown-basic-button"
          title="Modo de Transporte"
          onSelect={(mode) => setTransportMode(mode)}
          className="dropdown-button"
        >
          <Dropdown.Item eventKey="driving">Conduciendo</Dropdown.Item>
          <Dropdown.Item eventKey="walking">Caminando</Dropdown.Item>
          <Dropdown.Item eventKey="bicycling">En bicicleta</Dropdown.Item>
        </DropdownButton>
        <Button
          variant="primary"
          onClick={() => setSelectingDeparture(!selectingDeparture)}
          style={{ marginBottom: '5px' }}
        >
          {selectingDeparture ? 'Seleccionar Lugar de Llegada' : 'Seleccionar Lugar de Salida'}
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            if (selectingDeparture) {
              setDepartureMarker(null);
              onPlaceSelect('departure', '', null, transportMode);
            } else {
              setArrivalMarker(null);
              onPlaceSelect('arrival', '', null, transportMode);
            }
          }}
        >
          Borrar {selectingDeparture ? 'Lugar de Salida' : 'Lugar de Llegada'}
        </Button>
      </div>
      <Button
        className="toggle-sidebar"
        onClick={() => setSidebarVisible(!sidebarVisible)}
      >
        {sidebarVisible ? 'Ocultar' : 'Mostrar'}
      </Button>
    </div>
  );
};

export default MapView;
