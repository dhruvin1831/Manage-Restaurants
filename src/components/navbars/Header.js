/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import "../../styles/Header.css";
import { Link } from "react-router-dom";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import Button from "react-bootstrap/Button";
import { useHistory, useParams } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
function Header({ name, id }) {
  const { resId } = useParams();
  const history = useHistory();
  const [{ restroPage }, dispatch] = useStateValue();

  return (
    <Navbar
      bg="dark"
      fixed="top"
      variant="dark"
      expand="md"
      className="RestaurantCustomerHeaderNav"
    >
      <Container fluid>
        <Navbar.Brand>
          <RestaurantIcon />
          {"  "}
          {name}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" style={{ marginRight: "auto" }}>
            <Link
              style={{ textDecoration: "none" }}
              onClick={() =>
                dispatch({
                  type: "SET_RESTRO_PAGE",
                  page: "menu",
                })
              }
            >
              <Nav.Link href="/">Menu</Nav.Link>
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              onClick={() =>
                dispatch({
                  type: "SET_RESTRO_PAGE",
                  page: "checkout",
                })
              }
            >
              <Nav.Link href="/checkout">Your Order</Nav.Link>
            </Link>
            {/* <Link
              style={{ textDecoration: "none" }}
              onClick={() => history.push("/place-order")}
            >
              <Nav.Link href="/checkout">Order History</Nav.Link>
            </Link> */}
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
