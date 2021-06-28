/* eslint-disable no-const-assign */
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
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
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
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
  const [range, setRange] = useState(5000);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    var unsubscribe = db.collection("restaurants").onSnapshot((snapShot) => {
      setRestaurants(
        snapShot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    var flag = false;
    setNearbyRestaurants([]);
    setAnyRestro(null);

    var newNearbyRestaurants = [];
    restaurants?.map((restaurant) => {
      const dist = distance(
        restaurant.data.location.latitude,
        restaurant.data.location.longitude,
        userLocation?.latitude,
        userLocation?.longitude
      );
      const newRestro = {
        data: restaurant,
        dist: dist,
      };
      if (dist <= range) {
        flag = true;
        newNearbyRestaurants.push(newRestro);
      }
    });
    setNearbyRestaurants(newNearbyRestaurants);
    if (restaurants)
      if (flag === false) setAnyRestro(false);
      else setAnyRestro(true);
  }, [restaurants]);

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

  useEffect(() => {
    setAnyRestro(null);
    var flag = false;
    nearbyRestaurants?.map((restro) => {
      if (restro.dist <= range) flag = true;
    });

    if (restaurants)
      if (flag === false) setAnyRestro(false);
      else setAnyRestro(true);
  }, [range]);

  function manageRange() {
    var newRange = prompt("Enter New Range in kms");
    if (newRange === null || newRange === "" || isNaN(newRange)) {
      alert("Enter Valid Range in kms");
    } else {
      setRange(newRange);
    }
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
              <Button onClick={manageRange} variant="success" size="sm">
                Set Range
              </Button>
              {range ? ` Current Range (kms): ${range}` : ""}
              <br />
              <Container className="RestaurantsContainer">
                {restaurants === null ? "loading..." : ""}
                {anyRestro !== null && anyRestro === false
                  ? "No Restaurant Nearby: Try Setting More Range"
                  : ""}
                {nearbyRestaurants?.map((restro) => {
                  const restaurant = restro.data;
                  if (restro.dist <= range) {
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
                              <div>
                                <span></span>
                                {restaurant.data.foodCategories.length > 0 ? (
                                  <span className="popularFoodCategory">
                                    {restaurant.data.foodCategories[0]}
                                  </span>
                                ) : (
                                  ""
                                )}
                                {restaurant.data.foodCategories.length > 1 ? (
                                  <span className="popularFoodCategory">
                                    {restaurant.data.foodCategories[1]}
                                  </span>
                                ) : (
                                  ""
                                )}
                                {restaurant.data.foodCategories.length > 2 ? (
                                  <span className="popularFoodCategory">
                                    {restaurant.data.foodCategories[2]}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </div>
                            </Card.Text>
                            <Link to={`${match.url}/${restaurant.id}`}>
                              <Button size="sm" variant="info">
                                Go To Restaurant
                              </Button>
                            </Link>
                            <Button
                              style={{ float: "right" }}
                              onClick={handleShow}
                              size="sm"
                              variant="danger"
                            >
                              Find On Map
                            </Button>
                            <Modal
                              show={show}
                              onHide={handleClose}
                              size="lg"
                              dialogClassName="modal-90w"
                              aria-labelledby="contained-modal-title-vcenter"
                              centered
                            >
                              <Modal.Header>
                                <Modal.Title id="contained-modal-title-vcenter">
                                  Find On Map
                                </Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <ShowLocation
                                  viewOnly={true}
                                  restaurants={[restaurant]}
                                />
                              </Modal.Body>
                              <Modal.Footer>
                                <Button variant="warning" onClick={handleClose}>
                                  Done
                                </Button>
                              </Modal.Footer>
                            </Modal>
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
