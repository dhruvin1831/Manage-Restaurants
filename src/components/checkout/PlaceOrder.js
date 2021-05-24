import React from "react";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/esm/Button";
import { useHistory } from "react-router-dom";
import "../../styles/PlaceOrder.css";
function PlaceOrder() {
  const history = useHistory();
  return (
    <div>
      <Container>
        <Jumbotron className="PlaceOrderUnderConstruction">
          <h1>Under Construction</h1>
          <ul>
            <li>Order in restaurant</li>
            <li>Reserve a table</li>
            <li>Take away</li>
            <li>Past Orders</li>
            <li>Online Payment</li>
          </ul>
          <Button
            onClick={() => history.push("/restaurant_selection")}
            className="PlaceOrderButton"
            variant="warning"
          >
            Explore more restaurants
          </Button>
          <Button
            onClick={() => history.goBack()}
            className="PlaceOrderButton"
            variant="danger"
          >
            Back
          </Button>
        </Jumbotron>
      </Container>
    </div>
  );
}

export default PlaceOrder;
