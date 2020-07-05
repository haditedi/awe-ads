import axios from "axios";

export const signIn = (credentials) => {
  return (dispatch, getState) => {
    axios
      .post("https://dazzling-zion-41313.herokuapp.com/", credentials)
      .then(() => {
        console.log("success");
        dispatch({ type: "SIGN_IN", payload: credentials });
      })
      .catch((err) => console.log(err));
  };
};

export const signUp = (credentials) => {
  return (dispatch, getState) => {
    axios
      .post("https://dazzling-zion-41313.herokuapp.com/users", credentials)
      .then(() => {
        console.log("sign up success");
        dispatch({ type: "SIGN_UP", payload: credentials });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
