/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Header from "../navbars/Header";
import Container from "react-bootstrap/esm/Container";
import "../../styles/Checkout.css";
import FoodItemCheckout from "../Item/FoodItemCheckout";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import { useStateValue } from "../../StateProvider";
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

  return (
    <>
      <Header />
      <Container className="Checkout-container">
        <Jumbotron className="Checkout-placeOrder">
          <h1>Total Amount : &#8377; {calculateTotalAmount()}</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for
            calling extra attention to featured content or information.
          </p>
          <p>
            <Button variant="success">Place Order</Button>
          </p>
        </Jumbotron>
        <br />
        <div className="YourOrder">Your Order</div>
        <hr />
        <div className="FoodItems-checkout">
          {currentOrder.map(({ image, price, name, count, id }) => (
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
