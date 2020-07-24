import React, { useState } from "react";
import { useLocation, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Account from "./pages/Account";
import Profile from "./pages/Profile";
import AdDetail from "./pages/AdDetail";
import ViewCategory from "./pages/ViewCategory";
import { connect } from "react-redux";
import NotFound from "./pages/NotFound";
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

  axios.defaults.baseURL = "https://dazzling-zion-41313.herokuapp.com/";
  axios.defaults.headers.common["Authorization"] = token;

  let routes;
  if (props.isAuth) {
    routes = (
      <Switch location={location} key={location.key}>
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/profile" component={Profile} />
        <Route path="/view-category" component={ViewCategory} />
        <Route path="/ad-detail/:id" component={AdDetail} />
        <Route path="/" exact component={Home} />
        <Route path="/" component={NotFound} />
      </Switch>
    );
  } else {
    routes = (
      <Switch location={location} key={location.key}>
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/account" component={Account} />
        <Route path="/view-category" component={ViewCategory} />
        <Route path="/ad-detail/:id" component={AdDetail} />
        <Route path="/" exact component={Home} />
        <Route path="/" component={NotFound} />
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
