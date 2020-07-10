import axios from "axios"

export const signIn = (credentials,history) => {
  console.log(history)
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((resp) => {
        console.log(resp)
        dispatch({
          type: "LOGIN_SUCCESS",
        });
        history.push("/profile")
      })
      .catch((err) => {
        dispatch({
          type: "LOGIN_ERROR",
          err, 
        });
      });
  };
};

export const signUp = (credentials) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
   
    try {
      const result = await firebase
        .auth()
        .createUserWithEmailAndPassword(
          credentials.email,
          credentials.password
        ).then(resp => {
          console.log(resp)
          resp.user.updateProfile({
            displayName: credentials.name,
        })
        return resp;
      })

      const response = await axios.post("http://localhost:5000/sign-up", {
        name: credentials.name,
        email: credentials.email,
        userId: result.user.uid
      })
     
      console.log("sign up success", result, response);
      dispatch({ type: "SIGN_UP_SUCCESS", name: credentials.name });

    } catch (err) {
      console.log(err);
      dispatch({ type: "SIGN_UP_ERROR", err });
    }
  };
};

export const signOut = (history) => {
  
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    firebase.auth().signOut().then(() => history.push("/"));
    dispatch({ type: "SIGN_OUT"})
    console.log("Log out");

  };
};
