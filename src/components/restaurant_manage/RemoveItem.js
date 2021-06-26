/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "../../styles/RemoveItem.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import Dropdown from "react-bootstrap/Dropdown";
import { db } from "../../firebase";
import { useStateValue } from "../../StateProvider";
import DropdownButton from "react-bootstrap/DropdownButton";
import FoodItem from "../Item/FoodItem";

function RemoveItem() {
  const [foodItems, setFoodItems] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [restro, setRestro] = useState(null);
  const [filterCategory, setFilterCategory] = useState(null);

  const setFoodItemsFilter = (food) => {
    if (filterCategory === "ALL") setFoodItems(food);
    else {
      setFoodItems(
        food.filter((item) => item.data.foodCategory === filterCategory)
      );
    }
  };

  useEffect(() => {
    setFilterCategory("ALL");
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    var unsubscribe = db.collection("restaurants").onSnapshot((snapShot) => {
      snapShot.docs.forEach((doc) => {
        if (doc.id === user?.uid) {
          console.log(doc.data());
          setRestro({ name: doc.data().name, id: doc.id, data: doc.data() });
        }
      });
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    var unsubscribe = db
      .collection("restaurant-menus")
      .doc(user?.uid)
      .collection("food-items")
      .onSnapshot((snapShot) => {
        setFoodItemsFilter(
          snapShot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

    return () => {
      unsubscribe();
    };
  }, [filterCategory, user]);
  return (
    <div>
      {/* <Jumbotron className="PlaceOrderUnderConstruction">
        <h1>Under Construction</h1>
        <ul>
          <li>Manage Items</li>
          <li>Order in restaurant</li>
          <li>Reserve a table</li>
          <li>Take away</li>
          <li>Past Orders</li>
          <li>Payment</li>
        </ul>
        <hr />
        <h3>
          Currently Menu functionality available, please proceed to add
          foodItems in ADD ITEM
        </h3>
      </Jumbotron> */}
      **To change Availibility/Price Go to Manage Section.
      <br />
      **This page is to Remove Item permanently.
      <div className="FoodCategoryMenu">
        <div className="FoodCategoryMenu">
          <DropdownButton
            id="dropdown-basic-button"
            variant="success"
            title="Select FoodCategory"
          >
            <Dropdown.Item onClick={() => setFilterCategory("ALL")}>
              All
            </Dropdown.Item>
            {restro?.data.foodCategories?.map((item) => (
              <Dropdown.Item onClick={() => setFilterCategory(item)}>
                {item}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>
      </div>
      <div className="FoodItemsContainer">
        {foodItems?.map((item) => (
          <div>
            {/* <span>Food Id : {item.id}</span>
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
          <hr /> */}
            <FoodItem
              id={item.id}
              key={item.id}
              image={item.data.image}
              name={item.data.foodName}
              price={item.data.price}
              viewOnly={true}
              isAvailable={item.data.isAvailable}
              removeOption={true}
             
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RemoveItem;
