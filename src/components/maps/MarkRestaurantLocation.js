/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable no-unused-vars */
import * as React from "react";
import { useState, useCallback, useEffect } from "react";
import MapGL, { Marker, NavigationControl } from "react-map-gl";
import { useStateValue } from "../../StateProvider";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import ControlPanel from "./control-panel";
import Pin from "./pin";
import "../../styles/MarkRestaurantLocation.css";
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const TOKEN =
  "pk.eyJ1IjoiZGhydXZpbnBhdGVsMTgzMSIsImEiOiJja3A0YXV2ZWUwNTB1Mm9xdGhubDR3bTU2In0.t4cAxSdsVcxXFAZBTJLOug"; // Set your mapbox token here

const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px",
};

export default function MarkRestaurantLocation() {
  const [{ location }, dispatch] = useStateValue();
  const [viewport, setViewport] = useState({
    latitude: 40,
    longitude: -100,
    zoom: 3.5,
    bearing: 0,
    pitch: 0,
  });
  const [marker, setMarker] = useState({
    latitude: 40,
    longitude: -100,
  });
  const [events, logEvents] = useState({});

  const onMarkerDragStart = useCallback((event) => {
    logEvents((_events) => ({ ..._events, onDragStart: event.lngLat }));
  }, []);

  const onMarkerDrag = useCallback((event) => {
    logEvents((_events) => ({ ..._events, onDrag: event.lngLat }));
  }, []);

  const onMarkerDragEnd = useCallback((event) => {
    logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));
    setMarker({
      longitude: event.lngLat[0],
      latitude: event.lngLat[1],
    });
    dispatch({
      type: "SET_LOCATION",
      location: {
        longitude: event.lngLat[0],
        latitude: event.lngLat[1],
      }
    });
  }, []);

  useEffect(() => {
    getLocation();
  }, []);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError, {
        enableHighAccuracy: true,
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
    }
  }

  function showPosition(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    setViewport({
      ...viewport,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });

    setMarker({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }

  return (
    <div style={{ width: "inherit", height: "inherit" }}>
      <MapGL
        {...viewport}
        width="100%"
        height="60vh"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={setViewport}
        mapboxApiAccessToken={TOKEN}
      >
        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          offsetTop={-20}
          offsetLeft={-10}
          draggable
          onDragStart={onMarkerDragStart}
          onDrag={onMarkerDrag}
          onDragEnd={onMarkerDragEnd}
        >
          <Pin size={20} />
        </Marker>

        <div className="nav" style={navStyle}>
          <NavigationControl />
        </div>
      </MapGL>
      {/* <ControlPanel events={events} /> */}
    </div>
  );
}
