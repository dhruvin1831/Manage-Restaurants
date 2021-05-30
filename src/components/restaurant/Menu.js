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
      <Container className="MenuContainer">
        <h2 className="MenuHeading">Manage Restaurant Menu </h2>

        <div className="MenuButtons">
          <Button
            size="sm"
            onClick={() => setState("ADD")}
            className="MenuHeadingButton"
            variant="success"
          >
            Add
          </Button>
          <Button
            size="sm"
            onClick={() => setState("REMOVE")}
            className="MenuHeadingButton"
            variant="danger"
          >
            Remove
          </Button>
          <Button
            size="sm"
            onClick={() => setState("MANAGE")}
            className="MenuHeadingButton"
            variant="warning"
          >
            Manage
          </Button>
          <Button
            size="sm"
            onClick={() => setState("VIEW")}
            className="MenuHeadingButton"
            variant="dark"
          >
            Current Menu
          </Button>
        </div>
        <hr />
        <ManageMenu state={state} />
      </Container>
    </div>
  );
}

export default Menu;
