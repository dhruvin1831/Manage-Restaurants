/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Container from "react-bootstrap/Container";
import React, { useState, useEffect } from "react";
import "../../styles/Login.css";
import Button from "react-bootstrap/Button";
import { auth } from "../../firebase";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
function Login() {
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) history.push("/dashboard");
      })
      .catch((err) => alert(err.message));
  };

  useEffect(() => {
    if (user) history.push("/dashboard");
  }, [user]);

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        if (auth) history.push("/create_restaurant");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div>
      <Container fluid className="LoginWrapper">
        <div className="LoginContainer">
          <span className="LoginFormContainer">
            <h1>Sign In</h1>
            <hr />
            <form className="LoginForm">
              <h5>Email</h5>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="LoginFormInput"
                type="email"
              />
              <h5>Password</h5>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="LoginFormInput"
                type="password"
              />
              <div className="LoginButtonWrap">
                <Button type="submit" onClick={signIn} variant="success">
                  Sign In
                </Button>
                {"  "}
                <Button type="submit" onClick={register} variant="warning">
                  Create Your New Account
                </Button>
              </div>
            </form>
          </span>
        </div>
      </Container>
    </div>
  );
}

export default Login;
