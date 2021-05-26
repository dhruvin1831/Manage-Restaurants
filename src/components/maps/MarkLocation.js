/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import ReactMapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import Button from "react-bootstrap/Button";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

function MarkLocation() {
  const [userLocation, setUserLocation] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

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

    setUserLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }

  return (
    <div>
      {console.log(viewport)}
      <ReactMapGL
        {...viewport}
        onViewportChange={(viewport) => setViewport(viewport)}
        mapboxApiAccessToken="pk.eyJ1IjoiZGhydXZpbnBhdGVsMTgzMSIsImEiOiJja3A0YXV2ZWUwNTB1Mm9xdGhubDR3bTU2In0.t4cAxSdsVcxXFAZBTJLOug"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        container="map"
        center={[userLocation?.longitude, userLocation?.latitude]}
      >
        {userLocation ? (
          <Marker
            latitude={userLocation?.latitude}
            longitude={userLocation?.longitude}
          >
            <Button></Button>
          </Marker>
        ) : (
          ""
        )}
      </ReactMapGL>
    </div>
  );
}

export default MarkLocation;
