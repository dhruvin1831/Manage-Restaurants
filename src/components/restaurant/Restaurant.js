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
  const [filterCategory, setFilterCategory] = useState(null);
  const [{ restroPage }, dispatch] = useStateValue();

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
    };
    restroChange();
  }, [resId]);

  return (
    <>
      <Header name={restro?.name} id={restro?.id} />
      <div className="RestaurantWrapper">
        {restroPage === "menu" ? (
          <div>
            <Info restaurant={restro}/>
            <Container fluid className="RestaurantBody">
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
              <Container className="FoodItemsContainer">
                {foodItems?.length > 0 &&
                  foodItems?.map((item) => (
                    <FoodItem
                      name={item.data.foodName}
                      price={item.data.price}
                      image={item.data.image}
                      key={item.id}
                      id={item.id}
                      available={item.data.isAvailable}
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
          <Checkout resId={resId} />
        )}

        <Footer restaurant={restro}/>
      </div>
    </>
  );
}

export default Restaurant;
