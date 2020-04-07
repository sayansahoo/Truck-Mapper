import React, { useRef } from "react";
import GoogleMapReact from "google-map-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const Map = (props) => {
  const Marker = ({ children }) => children;
  const { data } = props;
  return (
    <GoogleMapReact
     
      defaultCenter={{ lat: 30.759212493896484, lng: 76.13296508789062 }}
      defaultZoom={6}
    >
      {data.map((a, idx) => {
        return (
          <Marker key={idx} lat={a.lastWaypoint.lat} lng={a.lastWaypoint.lng}>
            <FontAwesomeIcon icon={faMapMarkerAlt} color={a.color} />
          </Marker>
        );
      })}
    </GoogleMapReact>
  );
};

export default Map;
