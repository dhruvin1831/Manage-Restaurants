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
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import firebase from "firebase/app";

function Checkout({ resId }) {
  // eslint-disable-next-line no-unused-vars
  const [customer, setCustomer] = useState({ name: "", contact: "" });
  const [show, setShow] = useState(false);
  const [{ order }, dispatch] = useStateValue();
  const [currentOrder, setCurrentOrder] = useState([]);
  const history = useHistory();
  const [restro, setRestro] = useState(null);

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    var unsubscribe = db.collection("restaurants").onSnapshot((snapShot) => {
      snapShot.docs.forEach((doc) => {
        if (doc.id === resId) {
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlePlaceOrder = () => {
    if (customer.name === "" || customer.contact === "")
      return alert("Enter Valid Customer Information");
    if (isNaN(customer.contact) || customer.contact.length !== 10) {
      return alert("Enter Valid Contact No.");
    }
    var newOrder = {
      createdAt: Date.now(),
      list: order,
      amount: calculateTotalAmount(),
      isProcessed: false,
      customerData: customer,
    };

    db.collection("restaurants")
      .doc(resId)
      .collection("orders")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        data: newOrder,
      })
      .then(() => {
        handleClose();
        setCustomer({ name: "", contact: "" });
        clearOrder();
        return alert("Order Placed Successfully");
      })
      .catch((err) => {
        return alert(err);
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
              onClick={() => {
                if (calculateTotalAmount() === 0)
                  return alert("You have not ordered Anything !");
                return handleShow();
              }}
              variant="success"
            >
              Place Order
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Place Order</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Order type:{" "}
                <input
                  type="radio"
                  id="restaurant"
                  name="type"
                  value="restaurant"
                  checked
                />
                <label for="restaurant">Restaurant</label> |
                <input
                  type="radio"
                  id="takeaway"
                  name="type"
                  value="takeaway"
                  disabled
                />
                <label style={{ color: "gray" }} for="takeaway">
                  {" "}
                  Takeaway
                </label>{" "}
                |
                <input
                  disabled
                  type="radio"
                  id="reserve"
                  name="type"
                  value="reserve"
                />
                <label style={{ color: "gray" }} for="reserve">
                  Reserve a Table
                </label>
                <br />
                <h6>**Only Restaurant Orders available</h6>
                <hr />
                <Form>
                  <Form.Group
                    style={{ maxWidth: "330px" }}
                    controlId="formBasicName"
                  >
                    <Form.Label>Customer Name :</Form.Label>

                    <Form.Control
                      required
                      onChange={(e) =>
                        setCustomer({ ...customer, name: e.target.value })
                      }
                      value={customer.name}
                      type="text"
                      placeholder="Customer Name"
                    />
                    <br />
                    <Form.Label>Contact no. :</Form.Label>
                    <Form.Control
                      required
                      onChange={(e) =>
                        setCustomer({ ...customer, contact: e.target.value })
                      }
                      value={customer.contact}
                      type="text"
                      placeholder="Contact no."
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button size="sm" variant="success" onClick={handlePlaceOrder}>
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal>
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
