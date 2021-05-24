import React from "react";
import "../../styles/ManageItems.css";
import Jumbotron from "react-bootstrap/Jumbotron";
function ManageItems() {
  return (
    <div>
      <Jumbotron className="PlaceOrderUnderConstruction">
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
      </Jumbotron>
    </div>
  );
}

export default ManageItems;
