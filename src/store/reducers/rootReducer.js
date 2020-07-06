import adsReducer from "./adsReducer";
import authReducer from "./authReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducers = combineReducers({
  auth: authReducer,
  ads: adsReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducers;
