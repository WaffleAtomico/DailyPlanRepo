// components/MapView.jsx
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const SearchControl = (props) => {
  const map = useMapEvents({
    geosearch_showlocation: (result) => {
      const { x, y, label } = result.location;
      props.onLocationSelected({ lat: y, lng: x, label });
    },
  });

  React.useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      showMarker: true,
      retainZoomLevel: false,
      animateZoom: true,
      autoClose: true,
      searchLabel: 'Enter city or place',
    });

    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, [map]);

  return null;
};

const MapView = ({ onLocationSelected }) => {
  const [position, setPosition] = useState([51.505, -0.09]);
  const [markerPosition, setMarkerPosition] = useState(null);

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setMarkerPosition([lat, lng]);
    onLocationSelected({ lat, lng, label: "Selected Location" }); // Placeholder label
  };

  return (
    <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }} onClick={handleMapClick}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <SearchControl onLocationSelected={onLocationSelected} />
      {markerPosition && (
        <Marker position={markerPosition}>
          <Popup>Selected Location</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapView;
