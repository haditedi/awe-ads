import axios from "axios";

export const googleSignIn = (history) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .login({
        provider: "google",
        type: "popup",
      })
      .then((res) => {
        console.log(res);
        const data = {
          name: res.user.displayName,
          email: res.user.email,
          userId: res.user.uid,
        };
        axios.post("/google-sign-in", data);
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
        setTimeout(() => {
          dispatch({ type: "CLEAR_ERROR" });
        }, 2000);
      });
  };
};

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
        setTimeout(() => {
          dispatch({ type: "CLEAR_ERROR" });
        }, 2000);
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
          resp.user.updateProfile({
            displayName: credentials.name,
          });
        })
        .then(() => {
          axios.post("/sign-up", {
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
      dispatch({ type: "SIGN_UP_ERROR", err });
      setTimeout(() => {
        dispatch({ type: "CLEAR_ERROR" });
      }, 3000);
    }
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Log out");
        dispatch({ type: "SIGN_OUT" });
      });
  };
};
