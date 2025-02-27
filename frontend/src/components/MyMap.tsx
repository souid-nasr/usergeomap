import React from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MyMapProps {
  onLocationSelect: (lat: number, lng: number) => void;
}

const MyMap: React.FC<MyMapProps> = ({ onLocationSelect }) => {
  const MapEvents = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        onLocationSelect(lat, lng);
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={[34.8209989, 10.7830562]}
      zoom={13}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapEvents />
    </MapContainer>
  );
};

export default MyMap;
