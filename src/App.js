import React from "react";
import Restaurant from "./components/restaurant/Restaurant";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./components/restaurant/Checkout";
import LandingPage from "./components/LandingPage";
import RestaurantSelection from "./components/pages/RestaurantSelection";
import Login from "./components/login/Login";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/restaurant">
            <Restaurant />
          </Route>
          <Route path="/restaurant_selection">
            <RestaurantSelection />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/restaurant_login">
            <Login />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
