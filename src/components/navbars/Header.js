import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import "../../styles/Header.css";
import { Link } from "react-router-dom";
import RestaurantIcon from "@material-ui/icons/Restaurant";
function Header() {
  return (
    // <div className="Header-wrap">
    <Navbar
      bg="dark"
      fixed="top"
      variant="dark"
      expand="md"
      className="Header-nav"
    >
      <Container fluid>
        <Navbar.Brand href="/restaurant">
          <RestaurantIcon />
          {"  "}Restaurant XYZ
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link style={{ textDecoration: "none" }} to="/restaurant">
              <Nav.Link href="/">Menu</Nav.Link>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/checkout">
              <Nav.Link href="/checkout">Your-Order</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    // </div>
  );
}

export default Header;
