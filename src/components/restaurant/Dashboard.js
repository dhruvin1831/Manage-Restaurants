/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import DashboardHeader from "../navbars/DashboardHeader";
import { db } from "../../firebase";
import { useStateValue } from "../../StateProvider";
import Select from "./Select";
import RestroAccount from "./RestroAccount";
import Orders from "./Orders";
import Menu from "./Menu";

function Dashboard() {
  const [{ user, page }, dispatch] = useStateValue();
  const [email, setEmail] = useState();
  const [name, setName] = useState();

  useEffect(() => {
    var docRef = db.collection("users").doc(user?.uid);

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
    <div>
      <DashboardHeader email={email} name={name} />
      <div style={{ marginTop: "56px" }}></div>
      {page === "Select" ? (
        <Select />
      ) : page === "RestroAccount" ? (
        <RestroAccount />
      ) : page === "Orders" ? (
        <Orders />
      ) : page === "Menu" ? (
        <Menu />
      ) : (
        ""
      )}
    </div >
  );
}

export default Dashboard;
