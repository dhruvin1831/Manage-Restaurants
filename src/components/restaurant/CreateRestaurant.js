/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useStateValue } from "../../StateProvider";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "../../styles/CreateRestaurant.css";
import { db } from "../../firebase";
import { useHistory } from "react-router-dom";
function CreateRestaurant() {
  const [{ user }, dispatch] = useStateValue();
  const [restro, setRestro] = useState("");
  const history = useHistory();

  const proceed = async (e) => {
    e.preventDefault();
    await db
      .collection("restaurants")
      .doc(user?.uid)
      .set({
        name: restro,
        location: "",
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
              <Button type="submit" variant="danger">
                Mark Location
              </Button>
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
    </div>
  );
}

export default CreateRestaurant;
