import React from "react";
import "../../styles/ManageMenu.css";
import AddNewItem from "./AddNewItem";
import RemoveItem from "./RemoveItem";
import ManageItems from "./ManageItems";
import ViewAllItems from "./ViewAllItems";
function ManageMenu({ state }) {
  return (
    <div>
      {state === "ADD" ? (
        <AddNewItem />
      ) : state === "REMOVE" ? (
        <RemoveItem />
      ) : state === "MANAGE" ? (
        <ManageItems />
      ) : state === "VIEW" ? (
        <ViewAllItems />
      ) : (
        ""
      )}
    </div>
  );
}

export default ManageMenu;
