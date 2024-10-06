import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// Map container style
const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 23.0225, // Latitude for Ahmedabad
  lng: 72.5714, // Longitude for Ahmedabad
};

const markers = [
  { lat: 23.0301, lng: 72.5286, label: 'HP Petrol Pump - Het Petroleum' },
  { lat: 23.0258, lng: 72.5299, label: 'HP Petrol Pump' },
  { lat: 23.0161, lng: 72.5235, label: 'HP Petrol Pump (Grand Millenium)' },
  { lat: 23.0456, lng: 72.5668, label: 'HP Petrol Pump Auto Care Center' },
  // Add more marker coordinates as needed...
];

const MapComponent = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Total Sites 100</h2>
      <LoadScript googleMapsApiKey="YOUR_API_KEY">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
          {markers.map((marker, index) => (
            <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} label={marker.label} />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;
