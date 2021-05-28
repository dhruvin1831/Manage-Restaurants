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
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
function RestaurantSelection() {
  const history = useHistory();
  const [{ order }, dispatch] = useStateValue();
  let match = useRouteMatch();
  const [restaurants, setRestaurants] = useState(null);

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
              <ShowLocation restaurants={restaurants} />
              <span
                style={{ backgroundColor: "whitesmoke", color: "red" }}
                className="RestaurantSelectionMessaage"
              >
                Click Marker to see info
              </span>
            </Container>
            <hr />
            <Container fluid>
              <h3>
                Select from available restaurants : (current all rendered)
              </h3>
              {restaurants === null ? "No restaurants" : ""}
              {restaurants?.map((restaurant) => (
                <div>
                  <Link to={`${match.url}/${restaurant.id}`}>
                    {restaurant.data.name}
                  </Link>
                  <br />
                </div>
              ))}
            </Container>
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default RestaurantSelection;
