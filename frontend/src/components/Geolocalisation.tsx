import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
// Creation custom icon pour Marker avec svg
const customIcon = L.icon({
  iconUrl: "/assets/icons/position-map-point.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
const Geolocalisation: React.FC = () => {
  const users = useSelector((state: RootState) => state.users.users);

  return (
    <MapContainer
      center={[34.8209989, 10.7830562]}
      zoom={11}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {users.map((user) => (
        <Marker
          position={[user.location[1], user.location[0]]}
          icon={customIcon}
        >
          <Popup>
            {user.name} - {user.email}
            <br />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Geolocalisation;
