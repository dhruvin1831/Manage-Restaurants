/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../../styles/FoodItem.css";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { db } from "../../firebase";
import { useStateValue } from "../../StateProvider";

function FoodItem({
  id,
  key,
  image,
  name,
  price,
  viewOnly,
  isAvailable,
  removeOption,
  manageItem,
  available,
}) {
  // eslint-disable-next-line no-unused-vars
  const [{ order, user }, dispatch] = useStateValue();
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

  const handleRemove = () => {
    // eslint-disable-next-line no-restricted-globals
    var removeConfirm = confirm("Are you sure you want to Remove this Item?");
    if (!removeConfirm) return;
    db.collection("restaurant-menus")
      .doc(user?.uid)
      .collection("food-items")
      .doc(id)
      .delete()
      .then(() => {
        alert("Item deleted successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const manageAvailibility = () => {
    var toogleAvailibility = confirm(
      "Are you sure you want to change Availibility?"
    );
    if (!toogleAvailibility) return;
    db.collection("restaurant-menus")
      .doc(user?.uid)
      .collection("food-items")
      .doc(id)
      .update({
        isAvailable: !isAvailable,
      })
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const managePrice = () => {
    var newPrice = prompt("Enter New Price");
    if (isNaN(parseInt(newPrice))) {
      alert("Enter Valid Price");
      return;
    }

    db.collection("restaurant-menus")
      .doc(user?.uid)
      .collection("food-items")
      .doc(id)
      .update({
        price: newPrice,
      })
      .then(() => {})
      .catch((err) => {
        console.log(err);
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
          {!viewOnly && available ? (
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
          {manageItem ? (
            <div>
              <Button onClick={manageAvailibility} variant="warning" size="sm">
                Toggle Availibility
              </Button>
              <hr />
              <Button onClick={managePrice} variant="info" size="sm">
                Change Price
              </Button>
            </div>
          ) : (
            ""
          )}
          {removeOption ? (
            <Button size="sm" variant="danger" onClick={handleRemove}>
              Remove
            </Button>
          ) : (
            ""
          )}
        </Card.Body>
      </Card>
    </>
  );
}

export default FoodItem;
