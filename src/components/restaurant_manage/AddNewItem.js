/* eslint-disable default-case */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "../../styles/AddNewItem.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import { firebaseApp } from "../../firebase";
import { useStateValue } from "../../StateProvider";
import { db } from "../../firebase";
import firebase from "firebase/app";
import Container from "react-bootstrap/esm/Container";

function AddNewItem() {
  const [price, setPrice] = useState(0);
  const [now, setNow] = useState(0);
  const [fileUrl, setFileUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Choose");
  const [name, setName] = useState("");
  const [foodCategories, setFoodCategories] = useState(null);
  const [{ user }, dispatch] = useStateValue();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      name === "" ||
      price === 0 ||
      selectedCategory === null ||
      fileUrl === null
    ) {
      alert("Enter data in all fields !!");
      return;
    }
    await db
      .collection("restaurant-menus")
      .doc(user?.uid)
      .collection("food-items")
      .add({
        foodName: name,
        price: price,
        foodCategory: selectedCategory,
        image: fileUrl,
        isAvailable: true,
      });

    setPrice(0);
    setName("");
    setFileUrl(null);
    setSelectedCategory(null);
    setLoading(true);
    setNow(0);

    alert("item added successfully");
  };

  const fileChange = (e) => {
    const file = e.target.files[0];
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
    const fileName = Date.now().toString();
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
        });
      }
    );
  };

  const addNewCategory = async () => {
    var docRef = db.collection("restaurants").doc(user?.uid);
    const newCategory = prompt("enter Food Category you want to add");

    if (!newCategory) {
      alert("enter valid food Category");
      return;
    }

    await docRef.update({
      foodCategories: firebase.firestore.FieldValue.arrayUnion(newCategory),
    });
    setLoading(true);
  };

  useEffect(() => {
    const loadFoodCategories = async () => {
      var docRef = db.collection("restaurants").doc(user?.uid);

      const doc = await docRef.get();
      if (doc.exists) {
        setFoodCategories(doc.data().foodCategories);
        setLoading(false);
      }
    };
    loadFoodCategories();
  }, [user, loading]);

  const nameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div>
      <h2>Add Item :</h2>
      <br />
      {loading ? (
        <h4>loading...</h4>
      ) : (
        <Form>
          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>Select Food Category :</Form.Label>{" "}
            {selectedCategory !== "Choose" ? selectedCategory : ""}
            <br />
            <Form.Control
              placeholder="Select Food Category"
              style={{ minWidth: "200px" }}
              as="select"
              custom
              onChange={(e) => {
                setSelectedCategory(e.target.value);
              }}
              value={selectedCategory}
            >
              <option value="0">Choose</option>
              {foodCategories?.map((item) => (
                <option>{item}</option>
              ))}
            </Form.Control>{" "}
            <Button size="sm" onClick={addNewCategory} variant="success">
              Add New Food Category
            </Button>
          </Form.Group>
          <br />
          <Form.Group style={{ maxWidth: "330px" }} controlId="formBasicName">
            <Form.Label>Food Item :</Form.Label>
            <Form.Control
              required
              onChange={nameChange}
              value={name}
              type="text"
              placeholder="Name of food Item"
            />
          </Form.Group>
          <br />
          <Form.Group style={{ maxWidth: "100px" }} controlId="formBasicName">
            <Form.Label>Price :</Form.Label>
            <Form.Control
              required
              value={price}
              onChange={(e) => {
                if (isNaN(e.target.value)) {
                  alert("Enter valid Price");
                } else {
                  setPrice(e.target.value);
                }
              }}
              type="text"
              placeholder="Price"
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.File
              onChange={fileChange}
              id="exampleFormControlFile1"
              label="Food image :"
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
          <br />
          <Button onClick={onSubmit} variant="primary">
            Submit
          </Button>
        </Form>
      )}
      <br />
    </div>
  );
}

export default AddNewItem;
