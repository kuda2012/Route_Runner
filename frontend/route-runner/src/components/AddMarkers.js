import React, { useState, useRef, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

const AddMarkers = () => {
  const [markers, setMarkers] = useState([]);
  const map = useMapEvents({
    onload: (e) => {
      map.locate();
    },

    click: (e) => {
      map.locate();
      setMarkers([...markers, e.latlng]);
    },
    locationfound: (e) => {
      // setMarkers([...markers, e.latlng]);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return (
    <>
      {markers.map((marker, i) => (
        <Marker key={`marker-${i}`} position={marker}>
          <Popup>
            <span>
              A pretty CSS3 popup. <br /> Easily customizable.
            </span>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default AddMarkers;
