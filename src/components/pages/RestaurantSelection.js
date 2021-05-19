import React from "react";
import "../../styles/RestaurantSelection.css";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
function RestaurantSelection() {
  return (
    <div>
      <Container fluid>
        Hello These are some best recommendations for you!!
        <Link to="/restaurant">demo restaurant</Link>
      </Container>
    </div>
  );
}

export default RestaurantSelection;
