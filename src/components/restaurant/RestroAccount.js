import React from "react";
import "../../styles/RestroAccount.css";
import Container from "react-bootstrap/Container";
function RestroAccount({ email }) {
  return (
    <div>
      <Container className="RestroAccountContainer">
        <h2 className="RestroAccountHeading">Your Account </h2>
        <h6 className="">Email : {email}</h6>
        <hr />
        Manage Location
        <br />
        Manage Name
        <br /> Manage Other Info
        <br /> Manage Profile Photo
        <br /> Manage Cover Photos
      </Container>
    </div>
  );
}

export default RestroAccount;
