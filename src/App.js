import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Account from "./pages/Account";
import CreateAds from "./pages/CreateAds";
import { connect } from "react-redux";

function App(props) {
  let routes;
  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/create-ads" component={CreateAds} />
        <Route path="/" component={Home} />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/account" component={Account} />
        <Route path="/" component={Home} />
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
