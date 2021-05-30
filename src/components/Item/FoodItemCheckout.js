/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "../../styles/FoodItemCheckout.css";
import Button from "react-bootstrap/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { useStateValue } from "../../StateProvider";

function FoodItemCheckout({ id, image, name, price, quantity }) {
  const [{ order }, dispatch] = useStateValue();

  const addItem = () => {
    const index = order.findIndex((orderItem) => orderItem.id === id);
    var newItem;
    if (index >= 0) {
      newItem = {
        id,
        image,
        price,
        name,
        count: order[index].count + 1,
      };
    } else {
      newItem = {
        id,
        image,
        price,
        name,
        count: 1,
      };
    }
    dispatch({
      type: "ADD_TO_ORDER",
      item: newItem,
    });
  };

  const removeItem = () => {
    const index = order.findIndex((orderItem) => orderItem.id === id);
    var removeItem;
    if (index >= 0) {
      removeItem = {
        id,
        image,
        price,
        name,
        count: order[index].count - 1,
      };
    } else {
      console.warn("Removing item which is not ordered");
      return;
    }
    dispatch({
      type: "REMOVE_FROM_ORDER",
      item: removeItem,
    });
  };

  const calculateTotalAmount = () => {
    const index = order.findIndex((orderItem) => orderItem.id === id);
    if (index >= 0) {
      return order[index].price * order[index].count;
    }
  };
  return (
    <>
      <Card className="CheckoutFoodItem">
        <Card.Img variant="top" src={image} style={{ height: "12rem" }} />
        <Card.Body>
          <Card.Title>
            <div className="Foodinfo">
              <span>{name}</span>
              <pre> </pre>
              <span className="FoodPrice">&#8377; {price}</span>
            </div>
          </Card.Title>
          <hr />
          <Button
            size="sm"
            onClick={addItem}
            variant="success"
            className="AddRemove"
          >
            <AddIcon />
          </Button>{" "}
          {quantity}{" "}
          <Button
            size="sm"
            onClick={removeItem}
            variant="danger"
            className="AddRemove"
          >
            <RemoveIcon />
          </Button>
          <span className="CheckoutFoodTotal">
            Total &#8377; {calculateTotalAmount()}
          </span>
        </Card.Body>
      </Card>
    </>
  );
}

export default FoodItemCheckout;
