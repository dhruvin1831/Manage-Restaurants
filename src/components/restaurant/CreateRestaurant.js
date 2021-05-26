/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useStateValue } from "../../StateProvider";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "../../styles/CreateRestaurant.css";
import { db } from "../../firebase";
import { useHistory } from "react-router-dom";
import MapsModal from "../maps/MapsModal";
function CreateRestaurant() {
  const [{ user, location }, dispatch] = useStateValue();
  const [restro, setRestro] = useState("");
  const history = useHistory();
  const [modalShow, setModalShow] = useState(false);

  const proceed = async (e) => {
    e.preventDefault();
    if (location === null) return alert("Please Mark Location");
    if (restro === "") return alert("Please Enter Name");
    await db
      .collection("restaurants")
      .doc(user?.uid)
      .set({
        name: restro,
        location: location,
        email: user.email,
        id: user.uid,
        createdAt: Date.now(),
        foodCategories: ["test"],
      });
    history.push("/dashboard");
  };

  return (
    <div>
      <Container fluid>
        <div className="RestroCreateContainer">
          <span className="RestroCreateFormContainer">
            <h1>Provide Restaurant Details</h1>
            {user ? (
              <h5 className="RestroCreateEmail">Email : {user?.email}</h5>
            ) : (
              ""
            )}
            <hr />
            <form className="RestroCreateForm">
              <h5>Restaurant Name</h5>
              <input
                value={restro}
                onChange={(e) => setRestro(e.target.value)}
                className="RestroCreateFormInput"
                type="text"
              />
              <Button variant="danger" onClick={() => setModalShow(true)}>
                Mark Location
              </Button>
              {location === null ? (
                <h6>location not marked</h6>
              ) : (
                <h6>location marked</h6>
              )}
              <hr />
              <div>
                <Button onClick={proceed} type="submit" variant="success">
                  Proceed
                </Button>
              </div>
            </form>
          </span>
        </div>
      </Container>

      <MapsModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}

export default CreateRestaurant;
