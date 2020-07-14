import axios from "axios";

export const signIn = (credentials, history) => {
  console.log(history);
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((resp) => {
        console.log(resp);
        dispatch({
          type: "LOGIN_SUCCESS",
        });
        history.push("/profile");
      })
      .catch((err) => {
        dispatch({
          type: "LOGIN_ERROR",
          err,
        });
      });
  };
};

export const signUp = (credentials, history) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();

    try {
      let response;
      await firebase
        .auth()
        .createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then((resp) => {
          response = resp;
          console.log(resp);
          resp.user.updateProfile({
            displayName: credentials.name,
          });
        })
        .then(() => {
          axios.post("https://dazzling-zion-41313.herokuapp.com/sign-up", {
            name: credentials.name,
            email: credentials.email,
            userId: response.user.uid,
          });
        })
        .then(() => {
          dispatch({ type: "SIGN_UP_SUCCESS", name: credentials.name });
          history.push("/profile");
        });
    } catch (err) {
      console.log(err);
      dispatch({ type: "SIGN_UP_ERROR", err });
    }
  };
};

export const signOut = (history) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => history.push("/"));
    dispatch({ type: "SIGN_OUT" });
    console.log("Log out");
  };
};
