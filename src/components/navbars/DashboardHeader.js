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
import { auth } from "../../firebase";
function DashboardHeader({ name }) {
  const history = useHistory();
  const [{ page }, dispatch] = useStateValue();
  const signOut = () => {
    auth.signOut();
    history.push("/");
  };
  return (
    <Navbar
      bg="dark"
      fixed="top"
      variant="dark"
      expand="md"
      className="DashboardHeaderNav"
    >
      <Container fluid>
        <Navbar.Brand
          style={{ cursor: "pointer" }}
          onClick={() => dispatch({ type: "SET_PAGE", page: "Select" })}
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
              <Nav.Link>Manage-Menu</Nav.Link>
            </Link>
            <Link
              onClick={() => dispatch({ type: "SET_PAGE", page: "Orders" })}
              style={{ textDecoration: "none" }}
            >
              <Nav.Link>Manage-Orders</Nav.Link>
            </Link>
          </Nav>
          <Nav>
            <Button
              onClick={() =>
                dispatch({ type: "SET_PAGE", page: "RestroAccount" })
              }
              className="DashboardHeaderButton"
              variant="success"
            >
              Account
            </Button>
            <Button
              onClick={signOut}
              className="DashboardHeaderButton"
              variant="danger"
            >
              Sign-Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default DashboardHeader;
