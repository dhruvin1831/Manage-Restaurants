import React from "react";
import Restaurant from "./components/restaurant/Restaurant";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./components/restaurant/Checkout";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/restaurant">
            <Restaurant />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/">
            <Restaurant />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
