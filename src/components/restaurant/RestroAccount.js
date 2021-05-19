import React from "react";
import "../../styles/RestroAccount.css";
import Container from "react-bootstrap/Container";
function RestroAccount({ email }) {
  return (
    <div>
      <Container className="RestroContainer">
        <h2 className="RestroHeading">Your Account </h2>
        <hr />
        <h6 className="RestroHeading">Email : {email}</h6>
        Manage Location
        <br />
        Manage Name
        <br /> Manage Email
        <br /> Manage Other Info
      </Container>
    </div>
  );
}

export default RestroAccount;
