/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../../styles/Menu.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ManageMenu from "../restaurant_manage/ManageMenu";
function Menu() {
  const [state, setState] = useState("VIEW");
  return (
    <div>
      <Container fluid className="MenuContainer">
        <h2 className="MenuHeading">Manage Restaurant Menu </h2>
        <br />
        <Button
          onClick={() => setState("ADD")}
          className="MenuHeadingButton"
          variant="success"
        >
          Add Item
        </Button>
        <Button
          onClick={() => setState("REMOVE")}
          className="MenuHeadingButton"
          variant="danger"
        >
          Remove Item
        </Button>
        <Button
          onClick={() => setState("MANAGE")}
          className="MenuHeadingButton"
          variant="warning"
        >
          Manage Menu
        </Button>
        <Button
          onClick={() => setState("VIEW")}
          className="MenuHeadingButton"
          variant="dark"
        >
          View Current Menu
        </Button>
        <hr />
        <ManageMenu state={state} />
      </Container>
    </div>
  );
}

export default Menu;
