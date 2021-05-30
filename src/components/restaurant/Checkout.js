/* eslint-disable react-hooks/exhaustive-deps */
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
import { useHistory } from "react-router-dom";
import { db } from "../../firebase";

function Checkout({ resId }) {
  // eslint-disable-next-line no-unused-vars
  const [{ order }, dispatch] = useStateValue();
  const [currentOrder, setCurrentOrder] = useState([]);
  const history = useHistory();
  const [restro, setRestro] = useState(null);

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    var unsubscribe = db.collection("restaurants").onSnapshot((snapShot) => {
      snapShot.docs.forEach((doc) => {
        if (doc.id === resId) {
          console.log(doc.data());
          setRestro({ name: doc.data().name, id: doc.id, doc: doc.data() });
        }
      });
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    var newOrder = [...order];
    newOrder.sort((a, b) => {
      return a.id.localeCompare(b.id);
    });
    console.log(newOrder);
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
      <Container className="CheckoutContainer">
        <Jumbotron className="CheckoutPlaceOrder">
          <h1>Total Amount : &#8377; {calculateTotalAmount()}</h1>
          <p>Manage your Order below or Place your order to confirm.</p>
          <p>
            <Button
              onClick={() => history.push("/place-order")}
              variant="success"
            >
              Place Order
            </Button>
          </p>
        </Jumbotron>
        <br />
        <div className="YourOrderWrap">
          <span className="YourOrder">Your Order</span>
          <div className="CheckoutButtons">
            <Link
              onClick={() =>
                dispatch({
                  type: "SET_RESTRO_PAGE",
                  page: "menu",
                })
              }
            >
              <Button variant="warning">Order More</Button>
            </Link>
            <Button onClick={clearOrder} variant="danger">
              Remove All Items
            </Button>
          </div>
        </div>
        <hr />
        <div className="FoodItemsCheckout">
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
