/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import DashboardHeader from "../navbars/DashboardHeader";
import { db } from "../../firebase";
import { useStateValue } from "../../StateProvider";
import Select from "./Select";
import RestroAccount from "./RestroAccount";
import Orders from "./Orders";
import Menu from "./Menu";
import { useHistory } from "react-router-dom";
import { Container } from "@material-ui/core";

function Dashboard() {
  const history = useHistory();
  const [{ user, page }, dispatch] = useStateValue();
  const [email, setEmail] = useState();
  const [name, setName] = useState();

  useEffect(() => {
    if (!user) history.push("/restaurant_login");
  }, [user]);

  useEffect(() => {
    var docRef = db.collection("restaurants").doc(user?.uid);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          setEmail(doc.data().email);
          setName(doc.data().name);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [user]);
  return (
    <Container style={{ backgroundColor: "whitesmoke", minHeight: "100vh" }}>
      <div>
        <DashboardHeader name={name} />
        <div style={{ marginTop: "56px" }}></div>
        {page === "Select" ? (
          <Menu />
        ) : page === "RestroAccount" ? (
          <RestroAccount email={email} />
        ) : page === "Orders" ? (
          <Orders />
        ) : page === "Menu" ? (
          <Menu />
        ) : (
          ""
        )}
      </div>
    </Container>
  );
}

export default Dashboard;
