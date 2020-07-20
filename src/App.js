import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Account from "./pages/Account";
import Profile from "./pages/Profile";
import { connect } from "react-redux";
import NotFound from "./pages/NotFound";
import firebase from "./config/fbConfig";
import axios from "axios";

function App(props) {
  const [token, setToken] = useState();
  firebase
    .auth()
    .currentUser.getIdToken(true)
    .then((res) => {
      setToken(res);
    });

  console.log(token);
  axios.defaults.baseURL = "http://localhost:5000";
  axios.defaults.headers.common["Authorization"] = token;

  let routes;
  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/profile" component={Profile} />
        <Route path="/" exact component={Home} />
        <Route path="/" component={NotFound} />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/account" component={Account} />
        <Route path="/" exact component={Home} />
        <Route path="/" component={NotFound} />
      </Switch>
    );
  }
  return <BrowserRouter>{routes}</BrowserRouter>;
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.firebase.auth.uid,
  };
};

export default connect(mapStateToProps)(App);
