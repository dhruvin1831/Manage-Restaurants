import React from "react";
import Container from "react-bootstrap/Container";
import "../styles/LandingPage.css";
import PersonIcon from "@material-ui/icons/Person";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import { Link } from "react-router-dom";
function LandingPage() {
  return (
    <div>
      <Container fluid className="LandingPageBody">
        <div style={{ top: "0", marginBottom: "50px", fontSize: "50px" }}>
          Manage Restaurants
        </div>
        <div className="LandingPageSelectWrapper">
          <Link to="/restaurant_selection" style={{ textDecoration: "none" }}>
            <span className="LandingPageSelectContainer">
              <PersonIcon
                className="Icon"
                style={{
                  fontSize: "40",
                }}
              />{" "}
              Customer
            </span>
          </Link>
        </div>
        <div className="LandingPageSelectWrapper">
          <Link to="/restaurant_login" style={{ textDecoration: "none" }}>
            <span className="LandingPageSelectContainer">
              <RestaurantIcon
                className="LandingPageIcon"
                style={{ fontSize: "40", transition: "none" }}
              />{" "}
              Restaurant
            </span>
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default LandingPage;
