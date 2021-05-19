/* eslint-disable no-unused-vars */
import React from "react";
import "../../styles/Select.css";
import Container from "react-bootstrap/Container";
import { useStateValue } from "../../StateProvider";
import Button from "react-bootstrap/Button";
function Select() {
  const [{ page }, dispatch] = useStateValue();
  return (
    <div>
      <Container className="SelectContainer">
        <Button
          variant="warning"
          onClick={() => dispatch({ type: "SET_PAGE", page: "Orders" })}
        >
          Orders
        </Button>
        <br />
        <br />
        <Button
          variant="warning"
          onClick={() => dispatch({ type: "SET_PAGE", page: "Menu" })}
        >
          Manage Restaurant
        </Button>
      </Container>
    </div>
  );
}

export default Select;
