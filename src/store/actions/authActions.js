export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({
          type: "LOGIN_SUCCESS",
        });
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
    const firestore = getFirestore();

    try {
      const result = await firebase
        .auth()
        .createUserWithEmailAndPassword(
          credentials.email,
          credentials.password
        );

      result.user.updateProfile({
        displayName: credentials.name,
      });

      const database = await firestore
        .collection("users")
        .doc(result.user.uid)
        .set({
          name: credentials.name,
          email: credentials.email,
        });
      console.log(database);
      console.log("sign up success");
      dispatch({ type: "SIGN_UP_SUCCESS" });
    } catch (err) {
      console.log(err);
      dispatch({ type: "SIGN_UP_ERROR", err });
    }
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    firebase.auth().signOut();
    console.log("Log out");
  };
};
