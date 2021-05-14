import React from "react";
import FoodCategory from "../navbars/FoodCategory";
import Info from "../info/Info";
import Header from "../navbars/Header";
import Container from "react-bootstrap/esm/Container";
import "../../styles/Restaurant.css";
import FoodItem from "../Item/FoodItem";
import Footer from "../navbars/Footer";
import Button from "react-bootstrap/Button";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import { Link } from "react-router-dom";
function Menu() {
  return (
    <>
      <Header />
      <div className="Restaurant-wrapper">
        <Info />
        <Container fluid className="Restaurant-body">
          <FoodCategory />
          <Container className="Food-items-container">
            <FoodItem
              id={1}
              name="FoodName A"
              price="200"
              image="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?webp=true&quality=90&resize=620%2C563"
            />
            <FoodItem
              id={2}
              name="FoodName B"
              price="120"
              image="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?webp=true&quality=90&resize=620%2C563"
            />
            <FoodItem
              id={3}
              name="FoodName C"
              price="20"
              image="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?webp=true&quality=90&resize=620%2C563"
            />
            <FoodItem
              id={4}
              name="FoodName C"
              price="100"
              image="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?webp=true&quality=90&resize=620%2C563"
            />
          </Container>
        </Container>
        <Link to="/checkout">
          <Button variant="warning" size="lg" className="Place-order">
            <FastfoodIcon />
          </Button>
        </Link>
        <Footer />
      </div>
    </>
  );
}

export default Menu;
