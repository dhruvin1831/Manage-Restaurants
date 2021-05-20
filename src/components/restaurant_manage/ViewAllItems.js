/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "../../styles/ViewAllItems.css";
import { db } from "../../firebase";
import { useStateValue } from "../../StateProvider";
function ViewAllItems() {
  const [foodItems, setFoodItems] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    var unsubscribe = db
      .collection("restaurant-menus")
      .doc(user?.uid)
      .collection("food-items")
      .onSnapshot((snapShot) => {
        setFoodItems(
          snapShot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <div>
      <h3>Currently all item data is rendered :</h3>
      <hr />
      {foodItems?.map((item) => (
        <div>
          <span>Food Id : {item.id}</span>
          <br />
          <a target="_blank" href={item.data.image}>
            View Uploaded File{" "}
          </a>
          <br />
          <span>Food Name: {item.data.foodName}</span>
          <br />
          <span>Food Category: {item.data.foodCategory}</span>
          <br />
          <span>Available: {item.data.isAvailable ? "true" : "false"}</span>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default ViewAllItems;
