import React, { useState, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "../styles/Map.css";
import { marker } from "leaflet";
import AddMarkers from "./AddMarkers";

const Map = () => {
  return (
    <div className="leaflet-container">
      <MapContainer
        center={[50.868031999999996, -95.626854]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <AddMarkers />
        {/* {markers.map((marker, i) => {
          {
            console.log(marker);
          }
          <Marker key={`marker-${i}`} position={marker}>
            <Popup>
              <span>
                A pretty CSS3 popup. <br /> Easily customizable.
              </span>
            </Popup>
          </Marker>;
        })} */}
        {/* <Marker position={markers[0]}>
          <Popup>
            <span>
              A pretty CSS3 popup. <br /> Easily customizable.
            </span>
          </Popup>
        </Marker> */}
      </MapContainer>
    </div>
  );
};

export default Map;
