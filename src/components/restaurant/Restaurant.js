/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import FoodCategory from "../navbars/FoodCategory";
import Info from "../info/Info";
import Header from "../navbars/Header";
import Container from "react-bootstrap/esm/Container";
import "../../styles/Restaurant.css";
import FoodItem from "../Item/FoodItem";
import Footer from "../navbars/Footer";
import Button from "react-bootstrap/Button";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import { Link, useParams } from "react-router-dom";
import { db } from "../../firebase";
import Checkout from "./Checkout";
import { useStateValue } from "../../StateProvider";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function Restaurant() {
  const { resId } = useParams();
  const [foodItems, setFoodItems] = useState(null);
  const [restro, setRestro] = useState(null);
  const [{ restroPage, filterCategory }, dispatch] = useStateValue();

  const setFoodItemsFilter = (food) => {
    if (filterCategory === "ALL") setFoodItems(food);
    else {
      console.log(filterCategory);
      setFoodItems(
        food.filter((item) => item.data.foodCategory === filterCategory)
      );
    }
  };

  useEffect(() => {
    var unsubscribe = db.collection("restaurants").onSnapshot((snapShot) => {
      snapShot.docs.forEach((doc) => {
        if (doc.id === resId) {
          console.log(doc.data());
          setRestro({ name: doc.data().name, id: doc.id, data: doc.data() });
        }
      });
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    var unsubscribe = db
      .collection("restaurant-menus")
      .doc(resId)
      .collection("food-items")
      .onSnapshot((snapShot) => {
        setFoodItemsFilter(
          snapShot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

    console.log(foodItems);
    return () => {
      unsubscribe();
    };
  }, [filterCategory]);

  useEffect(() => {
    const clearOrder = () => {
      dispatch({
        type: "CLEAR_ORDER",
      });
    };
    clearOrder();

    const restroChange = () => {
      dispatch({
        type: "SET_RESTRO_PAGE",
        page: "menu",
      });
      dispatch({
        type: "SET_FILTER",
        category: "ALL",
      });
    };
    restroChange();
  }, [resId]);

  return (
    <>
      <Header name={restro?.name} id={restro?.id} />
      <div className="RestaurantWrapper">
        {restroPage === "menu" ? (
          <div>
            <Info />
            <Container fluid className="RestaurantBody">
              <div className="FoodCategoryMenu">
                <FoodCategory categories={restro?.data.foodCategories} />
              </div>
              <Container className="FoodItemsContainer">
                {foodItems?.length > 0 &&
                  foodItems?.map((item) => (
                    <FoodItem
                      name={item.data.foodName}
                      price={item.data.price}
                      image={item.data.image}
                      key={item.id}
                      id={item.id}
                    />
                  ))}
              </Container>
            </Container>
            <Button
              onClick={() =>
                dispatch({
                  type: "SET_RESTRO_PAGE",
                  page: "checkout",
                })
              }
              variant="warning"
              size="lg"
              className="OrderButton"
            >
              <FastfoodIcon />
            </Button>
          </div>
        ) : (
          <Checkout />
        )}

        <Footer />
      </div>
    </>
  );
}

export default Restaurant;
