/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useStateValue } from "../../StateProvider";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "../../styles/CreateRestaurant.css";
import { db } from "../../firebase";
import { useHistory } from "react-router-dom";
import MapsModal from "../maps/MapsModal";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import firebase from "firebase/app";
import { firebaseApp } from "../../firebase";
import { auth } from "../../firebase";
function CreateRestaurant() {
  const [{ user, location }, dispatch] = useStateValue();
  const [restro, setRestro] = useState("");
  const history = useHistory();
  const [modalShow, setModalShow] = useState(false);
  const [now, setNow] = useState(0);
  const [fileUrl, setFileUrl] = useState(null);

  const signOut = () => {
    auth.signOut();
    history.push("/");
  };

  const proceed = async (e) => {
    e.preventDefault();
    if (restro === "") return alert("Please Enter Name");
    if (fileUrl === null) return alert("please upload Profile Image");
    if (location === null) return alert("Please Mark Location");
    await db.collection("restaurants").doc(user?.uid).set({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      name: restro,
      location: location,
      email: user.email,
      id: user.uid,
      createdAt: Date.now(),
      foodCategories: [],
      profileImage: fileUrl,
      cover1: null,
      cover2: null,
      cover3: null
    });
    history.push("/dashboard");
  };

  const fileChange = (e) => {
    const file = e.target.files[0];
    if (file === null) return;
    var t = file?.type.split("/").pop().toLowerCase();
    if (
      t !== "jpeg" &&
      t !== "jpg" &&
      t !== "png" &&
      t !== "bmp" &&
      t !== "gif"
    ) {
      alert("Please select a valid image file");
      document.getElementById("exampleFormControlFile1").value = "";
      return false;
    }
    if (file.size > 1024000) {
      alert("Max Upload size is 1MB only");
      document.getElementById("exampleFormControlFile1").value = "";
      return false;
    }
    const storageRef = firebaseApp.storage().ref();
    const userRef = storageRef.child(user?.uid);
    const fileName = "ProfileImage";
    const fileRef = userRef.child(fileName);
    var uploadTask = fileRef.put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setNow(Math.round(progress));
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        alert("File upload unsuccessful");
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          setFileUrl(downloadURL);
        });
      }
    );
  };

  return (
    <div>
      <Container fluid>
        <div className="RestroCreateContainer">
          <span className="RestroCreateFormContainer">
            <h1>Provide Restaurant Details</h1>
            {user ? (
              <div>
                <h5 className="RestroCreateEmail">
                  SignedIn as : {user?.email}
                </h5>
                <Button
                  size="sm"
                  onClick={signOut}
                  className="DashboardHeaderButton"
                  variant="danger"
                >
                  Sign-Out
                </Button>
              </div>
            ) : (
              ""
            )}
            <hr />

            <Form>
              <Form.Group
                style={{ maxWidth: "330px" }}
                controlId="formBasicName"
              >
                <Form.Label>Restaurant Name :</Form.Label>
                <Form.Control
                  required
                  onChange={(e) => setRestro(e.target.value)}
                  value={restro}
                  type="text"
                  placeholder="Restaurant Name"
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.File
                  required
                  onChange={fileChange}
                  id="exampleFormControlFile1"
                  label="Profile Image :"
                />
              </Form.Group>
              <br />
              File Uploading :
              <ProgressBar
                style={{ maxWidth: "330px" }}
                now={now}
                label={`${now}%`}
              />
              <br />
              <a target="_blank" href={fileUrl}>
                View Uploaded File :{" "}
                {fileUrl === null ? "file not uploaded yet" : ""}
              </a>
              <br />
            </Form>

            <hr />
            <div className="CreateRestaurantButtons">
              <Button variant="danger" onClick={() => setModalShow(true)}>
                Mark Location
              </Button>
              {/* {location === null ? (
              <h6>location not marked</h6>
            ) : (
              <h6>location marked</h6>
            )}
            <br /> */}

              <Button onClick={proceed} type="submit" variant="success">
                Proceed
              </Button>
            </div>
          </span>
        </div>
      </Container>

      <MapsModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}

export default CreateRestaurant;
