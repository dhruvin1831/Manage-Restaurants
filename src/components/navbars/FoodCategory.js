/* eslint-disable no-unused-vars */
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "../../styles/FoodCategory.css";
import { useStateValue } from "../../StateProvider";
function FoodCategory({ categories }) {
  const [{ filterCategory }, dispatch] = useStateValue();
  return (
    <>
      <div className="FoodCategoryMenu">
        <DropdownButton
          id="dropdown-basic-button"
          variant="success"
          title="Select FoodCategory"
        >
          <Dropdown.Item
            onClick={() =>
              dispatch({
                type: "SET_FILTER",
                category: "ALL",
              })
            }
          >
            All
          </Dropdown.Item>
          {categories?.map((item) => (
            <Dropdown.Item
              onClick={() =>
                dispatch({
                  type: "SET_FILTER",
                  category: item,
                })
              }
            >
              {item}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
    </>
  );
}

export default FoodCategory;
