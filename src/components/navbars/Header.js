import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import "../../styles/Header.css";
import { Link } from "react-router-dom";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
function Header() {
  const history = useHistory();
  return (
    <Navbar
      bg="dark"
      fixed="top"
      variant="dark"
      expand="md"
      className="RestaurantCustomerHeaderNav"
    >
      <Container fluid>
        <Navbar.Brand href="/restaurant">
          <RestaurantIcon />
          {"  "}Restaurant XYZ
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" style={{ marginRight: "auto" }}>
            <Link style={{ textDecoration: "none" }} to="/restaurant">
              <Nav.Link href="/">Menu</Nav.Link>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/checkout">
              <Nav.Link href="/checkout">Your-Order</Nav.Link>
            </Link>
          </Nav>
          <Nav>
            <Button
              onClick={() => history.push("/restaurant_selection")}
              className="RestaurantCustomerHeaderButton"
              variant="warning"
            >
              Explore
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
