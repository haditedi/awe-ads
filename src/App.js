import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Account from "./pages/Account";
import PostAds from "./pages/PostAds";
import Profile from "./pages/Profile";
import { connect } from "react-redux";
import NotFound from "./pages/NotFound"

function App(props) {
  let routes;
  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/post-ads" component={PostAds} />
        <Route path="/profile" component={Profile} />
        {/* <Route path="/view-ads" component={ViewAds} />
        <Route path="/update-ads" component={UpdateAds} />
        <Route path="/delete-ads" component={DeleteAds} /> */}
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
