import React from "react";
import "../../styles/Menu.css";
import Container from "react-bootstrap/Container";
function Menu() {
  return (
    <div>
      <Container className="MenuContainer">
        <h2 className="MenuHeading">Manage Restaurant Menu </h2>
        <hr />
        Manage added Food Items
        <br />
        Add New Food Items
        <br />
        Manage Availibitiy <br />
      </Container>
    </div>
  );
}

export default Menu;
