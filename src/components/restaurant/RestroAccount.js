/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable default-case */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../../styles/RestroAccount.css";
import Container from "react-bootstrap/Container";
import firebase from "firebase/app";
import { db } from "../../firebase";
import { firebaseApp } from "../../firebase";
import { useStateValue } from "../../StateProvider";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";

function RestroAccount({ email }) {
  const [fileUrl, setFileUrl] = useState(null);
  const [now, setNow] = useState(0);
  const [{ user }, dispatch] = useStateValue();
  const [num, setNum] = useState(0);
  const [restro, setRestro] = useState("");
  
  const fileChange = (e) => {
    const file = e.target.files[0];
    const number = num;
    var t = file.type.split("/").pop().toLowerCase();
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
      return false;
    }
    const storageRef = firebaseApp.storage().ref();
    const userRef = storageRef.child(user?.uid);
    const coverRef = userRef.child("cover");
    const fileName = `cover${number}`;
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
          if (number === 1) {
            db.collection("restaurants").doc(user?.uid).update({
              cover1: downloadURL,
            });
          }
          if (number === 2) {
            db.collection("restaurants").doc(user?.uid).update({
              cover2: downloadURL,
            });
          }
          if (number === 3) {
            db.collection("restaurants").doc(user?.uid).update({
              cover3: downloadURL,
            });
          }
        });
      }
    );
  };
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
        <hr />
        <h4 className="">Manage Cover Photos :</h4>
        <Form.Group>
          <Form.File
            onClick={() => {
              setNum(1);
            }}
            onChange={fileChange}
            id="exampleFormControlFile1"
            label="Cover Image 1 :"
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.File
            onClick={() => {
              setNum(2);
            }}
            onChange={fileChange}
            id="exampleFormControlFile1"
            label="Cover Image 2 :"
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.File
            onClick={() => {
              setNum(3);
            }}
            onChange={fileChange}
            id="exampleFormControlFile1"
            label="Cover Image 3 :"
          />
        </Form.Group>
        <br />
        Current File Uploading :
        <ProgressBar
          style={{ maxWidth: "330px" }}
          now={now}
          label={`${now}%`}
        />
        <br />
        <a target="_blank" href={fileUrl}>
          View Uploaded File : {fileUrl === null ? "file not uploaded yet" : ""}
        </a>
        <br />
      </Container>
    </div>
  );
}

export default RestroAccount;
