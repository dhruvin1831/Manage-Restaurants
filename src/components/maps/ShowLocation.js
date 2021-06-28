/* eslint-disable array-callback-return */
/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable no-unused-vars */
import * as React from "react";
import { useState, useCallback, useEffect } from "react";
import MapGL, { Marker, NavigationControl, Popup } from "react-map-gl";
import { useStateValue } from "../../StateProvider";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import ControlPanel from "./control-panel";
import Pin from "./pin";
import "../../styles/MarkRestaurantLocation.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
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

export default function MarkRestaurantLocation({ restaurants, viewOnly }) {
  let match = useRouteMatch();
  const [selectedRestro, setSelectedRestro] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 40,
    longitude: -100,
    zoom: 3,
    bearing: 0,
    pitch: 0,
  });
  const [markers, setMarkers] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

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
      <MapGL
        {...viewport}
        width="100%"
        height="60vh"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={setViewport}
        mapboxApiAccessToken={TOKEN}
      >
        {userLocation !== null ? (
          <Marker
            longitude={userLocation?.longitude}
            latitude={userLocation?.latitude}
            offsetTop={-20}
            offsetLeft={-10}
          >
            <Pin color="red" size={20} />
          </Marker>
        ) : (
          ""
        )}

        {restaurants?.map((restro) => {
          if (restro.data.location !== "") {
            return (
              <Marker
                longitude={restro.data.location.longitude}
                latitude={restro.data.location.latitude}
                offsetTop={-20}
                offsetLeft={-10}
              >
                <div
                  onClick={() => {
                    console.log(restro);
                    setSelectedRestro(restro);
                  }}
                >
                  <Pin color={"#00008b"} size={20} />
                </div>
              </Marker>
            );
          }
        })}

        <div className="nav" style={navStyle}>
          <NavigationControl />
        </div>

        {!viewOnly && selectedRestro && (
          <Popup
            style={{ padding: 0 }}
            longitude={selectedRestro.data.location.longitude}
            latitude={selectedRestro.data.location.latitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setSelectedRestro(false)}
            anchor="top"
          >
            <Card style={{ width: "10rem", marginTop: "10px" }}>
              <Card.Img
                variant="top"
                src={
                  selectedRestro.data.profileImage
                    ? selectedRestro.data.profileImage
                    : "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                }
              />
              <Card.Body>
                <Card.Title>{selectedRestro.data.name}</Card.Title>

                <Card.Text>
                  <div>
                    {selectedRestro.data.foodCategories.length > 0 ? (
                      <span
                        style={{ fontSize: "xx-small" }}
                        className="popularFoodCategory"
                      >
                        {selectedRestro.data.foodCategories[0]}
                      </span>
                    ) : (
                      ""
                    )}
                    {selectedRestro.data.foodCategories.length > 1 ? (
                      <span
                        style={{ fontSize: "xx-small" }}
                        className="popularFoodCategory"
                      >
                        {selectedRestro.data.foodCategories[1]}
                      </span>
                    ) : (
                      ""
                    )}
                    {selectedRestro.data.foodCategories.length > 2 ? (
                      <span
                        style={{ fontSize: "xx-small" }}
                        className="popularFoodCategory"
                      >
                        {selectedRestro.data.foodCategories[2]}
                      </span>
                    ) : (
                      ""
                    )}
                    {/* <span
                      style={{ fontSize: "xx-small" }}
                      className="popularFoodCategory"
                    >
                      {selectedRestro.data.foodCategories[0]}
                    </span>
                    <span
                      style={{ fontSize: "xx-small" }}
                      className="popularFoodCategory"
                    >
                      {selectedRestro.data.foodCategories[1]}
                    </span>
                    <span
                      style={{ fontSize: "xx-small" }}
                      className="popularFoodCategory"
                    >
                      {selectedRestro.data.foodCategories[2]}
                    </span> */}
                  </div>
                </Card.Text>
                <Link to={`${match.url}/${selectedRestro.id}`}>
                  <Button size="sm" variant="info">
                    Go to Restaurant
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Popup>
        )}
      </MapGL>

      {/* <ControlPanel events={events} /> */}
    </div>
  );
}
