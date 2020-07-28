import React, { useState } from "react";
import { useLocation, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Account from "./pages/Account";
import Profile from "./pages/Profile";
import AdDetail from "./pages/AdDetail";
import Logout from "./pages/Logout";
import ViewCategory from "./pages/ViewCategory";
import Search from "./pages/Search";
import { connect } from "react-redux";

import firebase from "./config/fbConfig";
import axios from "axios";
import { AnimatePresence } from "framer-motion";

function App(props) {
  const location = useLocation();

  const [token, setToken] = useState();
  if (firebase.auth().currentUser) {
    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then((res) => {
        setToken(res);
      });
  }

  axios.defaults.baseURL = "https://dazzling-zion-41313.herokuapp.com";
  // axios.defaults.baseURL = "http://localhost:5000";
  axios.defaults.headers.common["Authorization"] = token;

  let routes;
  if (props.isAuth) {
    routes = (
      <Switch location={location} key={location.key}>
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/profile" component={Profile} />
        <Route path="/search" component={Search} />
        <Route path="/view-category/:category" component={ViewCategory} />
        <Route path="/ad-detail/:id" component={AdDetail} />
        <Route path="/logout" component={Logout} />
        <Route path="/" component={Home} />
      </Switch>
    );
  } else {
    routes = (
      <Switch location={location} key={location.key}>
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/account" component={Account} />
        <Route path="/search" component={Search} />
        <Route path="/view-category/:category" component={ViewCategory} />
        <Route path="/ad-detail/:id" component={AdDetail} />
        <Route path="/logout" component={Logout} />
        <Route path="/" component={Home} />
      </Switch>
    );
  }
  return (
    <div>
      <AnimatePresence exitBeforeEnter>{routes}</AnimatePresence>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.firebase.auth.uid,
  };
};

export default connect(mapStateToProps)(App);
