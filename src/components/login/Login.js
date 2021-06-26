/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Container from "react-bootstrap/Container";
import React, { useState, useEffect } from "react";
import "../../styles/Login.css";
import Button from "react-bootstrap/Button";
import { auth, provider, db } from "../../firebase";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
function Login() {
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const signIn = (e) => {
  //   e.preventDefault();
  //   auth
  //     .signInWithEmailAndPassword(email, password)
  //     .then((auth) => {
  //       if (auth) history.push("/dashboard");
  //     })
  //     .catch((err) => alert(err.message));
  // };

  // useEffect(() => {
  //   if (user) findUser();
  // }, [user]);

  // const register = (e) => {
  //   e.preventDefault();
  //   auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((auth) => {
  //       console.log(auth);
  //       if (auth) history.push("/create_restaurant");
  //     })
  //     .catch((error) => alert(error.message));
  // };

  useEffect(() => {
    if (user) findUser(user);
  }, [user]);

  const findUser = (user) => {
    if (user === null) return;
    var docRef = db.collection("restaurants").doc(user.uid);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          history.push("/dashboard");
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          history.push("/create_restaurant");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
        alert(error);
      });
  };

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        dispatch({
          type: "SET_USER",
          user: user,
        });
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(error);
        alert(error);
        // ...
      });
  };

  return (
    <div>
      <Container fluid className="LoginWrapper">
        <div className="LoginContainer">
          <span className="LoginFormContainer">
            <h1>Sign In</h1>
            <hr />
            <Button onClick={signInWithGoogle} variant="warning">
              <ExitToAppIcon />
              Sign In With Google
            </Button>
            <br />
            {/* <hr />
            <span>
              <h4>Test Account :</h4>
            </span>
            <span>
              <h6>email/login-id: </h6>
            </span>
            <span>
              <h6>Password : 12345_abc</h6>
            </span>
            <span>
              <h6>Restaurant Name : Test Account restro</h6>
            </span> */}
          </span>
        </div>
      </Container>
    </div>
  );
}

export default Login;
