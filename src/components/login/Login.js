import { Container } from "@material-ui/core";
import React, { useState } from "react";
import "../../styles/Login.css";
import Button from "react-bootstrap/Button";
function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
  };

  const register = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Container fluid>
        <div className="Login-container">
          <span className="Form-container">
            <h1>Sign In</h1>
            <hr />
            <form className="Form">
              <h5>Username</h5>
              <input
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="Form-input"
                type="text"
              />
              <h5>Password</h5>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="Form-input"
                type="password"
              />
              <div className="Button-wrap">
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
