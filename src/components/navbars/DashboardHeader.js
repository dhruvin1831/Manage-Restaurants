/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import "../../styles/DashboardHeader.css";
import { Link, useHistory } from "react-router-dom";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import Button from "react-bootstrap/Button";
import { useStateValue } from "../../StateProvider";
function DashboardHeader({ name, email }) {
  const history = useHistory();
  const [{ page }, dispatch] = useStateValue();
  const signOut = () => {};
  return (
    <Navbar
      bg="dark"
      fixed="top"
      variant="dark"
      expand="md"
      className="Header-nav"
    >
      <Container fluid>
        <Navbar.Brand
          onClick={() => dispatch({ type: "SET_PAGE", page: "Select" })}
          href="/dashboard"
        >
          <RestaurantIcon />
          {"  "}
          {name}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" style={{ marginRight: "auto" }}>
            <Link
              onClick={() => dispatch({ type: "SET_PAGE", page: "Menu" })}
              style={{ textDecoration: "none" }}
            >
              <Nav.Link href="/menu">Manage-Menu</Nav.Link>
            </Link>
            <Link
              onClick={() => dispatch({ type: "SET_PAGE", page: "Orders" })}
              style={{ textDecoration: "none" }}
            >
              <Nav.Link href="/order">Manage-Orders</Nav.Link>
            </Link>
          </Nav>
          <Nav>
            <Button
              onClick={() =>
                dispatch({ type: "SET_PAGE", page: "RestroAccount" })
              }
              className="button"
              variant="success"
            >
              Account
            </Button>
            <Button onClick={signOut} className="button" variant="danger">
              Sign-Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default DashboardHeader;
