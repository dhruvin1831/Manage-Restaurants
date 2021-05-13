import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "../../styles/FoodCategory.css";
function FoodCategory() {
  return (
    <>
      <div className="FoodCategory-menu">
        <DropdownButton
          id="dropdown-basic-button"
          variant="success"
          title="Select FoodCategory"
        >
          <Dropdown.Item href="#/action-1">All</Dropdown.Item>
          <Dropdown.Item href="#/action-1">Chinese</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Italian</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Indian</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#/action-4">Popular</Dropdown.Item>
        </DropdownButton>
      </div>
    </>
  );
}

export default FoodCategory;
