import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import App from "./App";
import { Skeleton } from 'antd';

import * as serviceWorker from "./serviceWorker";

//import fbConfig from "./config/fbConfig";
import firebase from "./config/fbConfig";
//import "firebase/firestore";
import rootReducer from "./store/reducers/rootReducer";

// Redux
import thunk from "redux-thunk";
// import {
//   reduxFirestore,
//   getFirestore,
//   createFirestoreInstance,
// } from "redux-firestore";
import {
  ReactReduxFirebaseProvider,
  getFirebase,
  isLoaded,
} from "react-redux-firebase";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider, useSelector } from "react-redux";

//firebase.firestore();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk.withExtraArgument({ getFirebase })),
    //getFirestore
    // reduxFirestore(firebase, fbConfig)
  )
);

const rrfConfig = {
  //userProfile: "users",
  // useFirestoreForProfile: true,
  attachAuthIsReady: true,
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  //createFirestoreInstance,
};

function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth)) return <Skeleton paragraph={{rows: 1}} active />;
  return children;
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>
        <App />
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
