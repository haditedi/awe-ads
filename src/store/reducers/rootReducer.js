import adsReducer from "./adsReducer";
import authReducer from "./authReducer";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  auth: authReducer,
  ads: adsReducer,
});

export default rootReducers;
