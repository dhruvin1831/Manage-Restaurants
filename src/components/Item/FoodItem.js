/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../../styles/FoodItem.css";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { useStateValue } from "../../StateProvider";

function FoodItem({ id, key, image, name, price, viewOnly, isAvailable }) {
  // eslint-disable-next-line no-unused-vars
  const [{ order }, dispatch] = useStateValue();
  const [count, setCount] = useState(0);

  useEffect(() => {
    let index = order.findIndex((orderItem) => orderItem.id === id);
    if (index === -1) setCount(0);
    else setCount(order[index].count);
  }, [order]);

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

  return (
    <>
      <Card className="FoodItem">
        <Card.Img variant="top" src={image} style={{ height: "12rem" }} />
        <Card.Body>
          <Card.Title>
            <div className="Foodinfo">
              <span>{name}</span>
              <span className="FoodPrice">&#8377; {price}</span>
            </div>
          </Card.Title>
          <hr />
          {!viewOnly ? (
            <div>
              <Button
                size="sm"
                onClick={addItem}
                variant="success"
                className="AddRemove"
              >
                <AddIcon />
              </Button>{" "}
              {count}{" "}
              <Button
                size="sm"
                onClick={removeItem}
                variant="danger"
                className="AddRemove"
              >
                <RemoveIcon />
              </Button>
            </div>
          ) : (
            <h6>Available: {isAvailable ? "Yes" : "No"}</h6>
          )}
        </Card.Body>
      </Card>
    </>
  );
}

export default FoodItem;
