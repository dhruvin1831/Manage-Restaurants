/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "../../styles/RestaurantSelection.css";
import Container from "react-bootstrap/esm/Container";
import Restaurant from "../restaurant/Restaurant";
import { useStateValue } from "../../StateProvider";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/esm/Button";
import { useHistory } from "react-router-dom";
import ShowLocation from "../maps/ShowLocation";
import { db } from "../../firebase";
import Card from "react-bootstrap/Card";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
function RestaurantSelection() {
  const [userLocation, setUserLocation] = useState(null);
  const history = useHistory();
  const [{ order }, dispatch] = useStateValue();
  let match = useRouteMatch();
  const [restaurants, setRestaurants] = useState(null);
  const [anyRestro, setAnyRestro] = useState(null);

  useEffect(() => {
    var unsubscribe = db.collection("restaurants").onSnapshot((snapShot) => {
      setRestaurants(
        snapShot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );

      if (restaurants?.length === 0) {
        setAnyRestro(false);
      } else {
        setAnyRestro(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295; // Math.PI / 180
    var c = Math.cos;
    var a =
      0.5 -
      c((lat2 - lat1) * p) / 2 +
      (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }

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
    setUserLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }

  return (
    <div className="RestaurantSelectionBody">
      <Switch>
        <Route path={`${match.path}/:resId`}>
          <Restaurant />
        </Route>
        <Route path={match.path}>
          <div>
            <Container style={{ paddingTop: "20px" }}>
              <span className="RestaurantSelectionMessaage">
                Explore Restaurants Around You
              </span>
              <Button
                size="sm"
                variant="dark"
                style={{
                  float: "right",
                }}
                onClick={() => history.push("/")}
              >
                Back
              </Button>

              <ShowLocation restaurants={restaurants} />
              <span
                style={{ backgroundColor: "whitesmoke", color: "red" }}
                className="RestaurantSelectionMessaage"
              >
                Click Marker to see info
              </span>
            </Container>
            <hr />
            <Container>
              <h3 className="RestaurantSelectionMessaage" align="center">
                Select from Nearby restaurants
              </h3>
              <br />

              <Container className="RestaurantsContainer">
                {anyRestro === null ? "loading..." : ""}
                {anyRestro === false ? "No Restaurant Nearby" : ""}
                {restaurants?.map((restaurant) => {
                  const dist = distance(
                    restaurant.data.location.latitude,
                    restaurant.data.location.longitude,
                    userLocation?.latitude,
                    userLocation?.longitude
                  );

                  if (dist < 1000) {
                    return (
                      <div>
                        <Card
                          style={{ width: "18rem" }}
                          className="RestaurantSelectionRestaurant"
                        >
                          <Card.Img
                            style={{ maxHeight: "11rem" }}
                            variant="top"
                            src={
                              restaurant.data.profileImage
                                ? restaurant.data.profileImage
                                : "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                            }
                          />
                          <Card.Body>
                            <Card.Title>{restaurant.data.name}</Card.Title>
                            <Card.Text>
                              Some quick example text to build on the card title
                              and make up the bulk of the card's content.
                            </Card.Text>
                            <Link to={`${match.url}/${restaurant.id}`}>
                              <Button size="sm" variant="success">
                                Go To Restaurant
                              </Button>
                            </Link>
                          </Card.Body>
                        </Card>
                      </div>
                    );
                  }
                })}
              </Container>
            </Container>
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default RestaurantSelection;
