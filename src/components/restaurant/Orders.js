import React from "react";
import "../../styles/Orders.css";
import Container from "react-bootstrap/Container";
function Orders() {
  return (
    <div>
      <Container className="OrderContainer">
        <h2 className="OrderHeading">Manage Orders </h2>
        <hr />
        Pending orders, order history goes here!
      </Container>
    </div>
  );
}

export default Orders;
