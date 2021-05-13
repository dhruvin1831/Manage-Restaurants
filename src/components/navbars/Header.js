import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import "../../styles/Header.css";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="Header-wrap">
      <Navbar bg="dark" variant="dark" expand="md" className="Header-nav">
        <Container fluid>
          <Navbar.Brand href="/">Restaurant XYZ</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/">
                <Nav.Link href="/">Menu</Nav.Link>
              </Link>
              <Link to="/checkout">
                <Nav.Link href="/checkout">Your-Order</Nav.Link>
              </Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item>Action</NavDropdown.Item>
                <NavDropdown.Item>Another action</NavDropdown.Item>
                <NavDropdown.Item>Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
