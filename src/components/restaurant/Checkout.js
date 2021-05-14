/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Header from "../navbars/Header";
import Container from "react-bootstrap/esm/Container";
import "../../styles/Checkout.css";
import FoodItemCheckout from "../Item/FoodItemCheckout";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import { useStateValue } from "../../StateProvider";
import { Link } from "react-router-dom";

function Checkout() {
  // eslint-disable-next-line no-unused-vars
  const [{ order }, dispatch] = useStateValue();
  const [currentOrder, setCurrentOrder] = useState([]);

  useEffect(() => {
    var newOrder = [...order];
    newOrder.sort((a, b) => {
      return a.id - b.id;
    });
    setCurrentOrder(newOrder);
  }, [order]);

  const calculateTotalAmount = () => {
    let sum = 0;
    for (var i = 0; i < order.length; ++i)
      sum = sum + order[i].count * order[i].price;
    return sum;
  };

  const clearOrder = () => {
    dispatch({
      type: "CLEAR_ORDER",
    });
  };

  return (
    <>
      <Header />
      <Container className="Checkout-container">
        <Jumbotron className="Checkout-placeOrder">
          <h1>Total Amount : &#8377; {calculateTotalAmount()}</h1>
          <p>Manage your Order below or Place your order to confirm.</p>
          <p>
            <Button variant="success">Place Order</Button>
          </p>
        </Jumbotron>
        <br />
        <div className="YourOrder-wrap">
          <span className="YourOrder">Your Order</span>
          <div className="Checkout-buttons">
            <Link to="/">
              <Button variant="warning">Order More</Button>
            </Link>
            <Button onClick={clearOrder} variant="danger">
              Remove All Items
            </Button>
          </div>
        </div>
        <hr />
        <div className="FoodItems-checkout">
          {currentOrder.length === 0
            ? "Your have not ordered anything !"
            : currentOrder.map(({ image, price, name, count, id }) => (
                <FoodItemCheckout
                  key={id}
                  id={id}
                  image={image}
                  price={price}
                  name={name}
                  quantity={count}
                />
              ))}
        </div>
      </Container>
    </>
  );
}

export default Checkout;
