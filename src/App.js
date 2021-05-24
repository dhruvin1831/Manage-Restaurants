/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Restaurant from "./components/restaurant/Restaurant";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./components/restaurant/Checkout";
import LandingPage from "./components/LandingPage";
import RestaurantSelection from "./components/pages/RestaurantSelection";
import Login from "./components/login/Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import CreateRestaurant from "./components/restaurant/CreateRestaurant";
import Dashboard from "./components/restaurant/Dashboard";
import PlaceOrder from "./components/checkout/PlaceOrder";
import { useHistory} from "react-router-dom";
function App() {
  
  const [state, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
          <Route path="/checkout/:resId">
            <Checkout />
          </Route>
          <Route path="/restaurant_login">
            <Login />
          </Route>
          <Route path="/create_restaurant">
            <CreateRestaurant />
          </Route>
          <Route path="/place-order">
            <PlaceOrder />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
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
