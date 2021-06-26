/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "../../styles/Orders.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { db } from "../../firebase";
import { useStateValue } from "../../StateProvider";
import Table from "react-bootstrap/Table";
function Orders() {
  const [state, setState] = useState("pending");
  const [orders, setOrders] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    var unsubscribe = db
      .collection("restaurants")
      .doc(user?.uid)
      .collection("orders")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapShot) => {
        var updatedOrders = [];
        snapShot.forEach((doc) => {
          updatedOrders.push({ id: doc.id, data: doc.data()?.data });
        });
        setOrders(updatedOrders);
        console.log(updatedOrders);
      });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleProcessed = (id) => {
    db.collection("restaurants")
      .doc(user?.uid)
      .collection("orders")
      .doc(id)
      .update({
        "data.isProcessed": true,
      })
      .then(() => {
        return alert("Item moved to history");
      })
      .catch((err) => {
        return alert(err);
      });
  };

  return (
    <div>
      <Container className="OrderContainer">
        <h2 className="MenuHeading">Manage Orders </h2>
        <div className="MenuButtons">
          <Button
            size="sm"
            onClick={() => setState("pending")}
            className="MenuHeadingButton"
            variant="success"
          >
            Pending Orders
          </Button>
          <Button
            size="sm"
            onClick={() => setState("history")}
            className="MenuHeadingButton"
            variant="danger"
          >
            History
          </Button>
        </div>
        <hr />

        {state === "pending"
          ? orders.map((order) => {
              if (order.data.isProcessed === false) {
                return (
                  <Card className="OrderItems">
                    <Card.Header as="h5">
                      Customer: {order.data.customerData.name}
                      <span style={{ float: "right" }}>
                        Contact: {order.data.customerData.contact}
                      </span>
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>
                        <h6>Particulars: </h6>
                      </Card.Title>
                      <Table responsive striped bordered hover size="sm">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Food Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.data.list.map((item, _num) => (
                            <tr>
                              <td>{_num + 1}</td>
                              <td>{item.name}</td>
                              <td>{item.count}</td>
                              <td>{item.price}</td>
                              <td>{item.price * item.count}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                      <span>
                        <h4>Total Amount: {order.data.amount}</h4>
                      </span>
                      <span>Order Id: {order.id}</span>
                      <Button
                        onClick={() => {
                          var confirmation = confirm(
                            "Are you sure? Order will move to history."
                          );
                          if (confirmation) {
                            return handleProcessed(order.id);
                          }
                        }}
                        size="sm"
                        style={{ float: "right" }}
                        variant="primary"
                      >
                        Processed
                      </Button>
                    </Card.Body>
                  </Card>
                );
              }
            })
          : orders.map((order) => {
              if (order.data.isProcessed === true) {
                return (
                  <Card className="OrderItems" style={{ marginBottom: "15px" }}>
                    <Card.Header as="h5">
                      Customer: {order.data.customerData.name}
                      <span style={{ float: "right" }}>
                        Contact: {order.data.customerData.contact}
                      </span>
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>
                        <h6>Particulars: </h6>
                      </Card.Title>
                      <Table responsive striped bordered hover size="sm">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Food Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.data.list.map((item, _num) => (
                            <tr>
                              <td>{_num + 1}</td>
                              <td>{item.name}</td>
                              <td>{item.count}</td>
                              <td>{item.price}</td>
                              <td>{item.price * item.count}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                      <span>
                        <h4>Total Amount: {order.data.amount}</h4>
                      </span>
                      <span>Order Id: {order.id}</span>
                    </Card.Body>
                  </Card>
                );
              }
            })}
      </Container>
    </div>
  );
}

export default Orders;
