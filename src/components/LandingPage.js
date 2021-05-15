import React from "react";
import Container from "react-bootstrap/Container";
import "../styles/LandingPage.css";
import PersonIcon from "@material-ui/icons/Person";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import { Link } from "react-router-dom";
function LandingPage() {
  return (
    <div>
      <Container fluid className="LandingPage-body">
        <div className="wrapper">
          <Link to="/restaurant_selection" style={{ textDecoration: "none" }}>
            <span className="Select-container">
              <PersonIcon style={{ fontSize: "40" }} /> Customer
            </span>
          </Link>
        </div>
        <div className="wrapper">
          <Link to="/restaurant_login" style={{ textDecoration: "none" }}>
            <span className="Select-container">
              <RestaurantIcon style={{ fontSize: "40" }} /> Restaurant
            </span>
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default LandingPage;
