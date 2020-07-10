import axios from "axios";

export const postAds = (ads) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    let token = await firebase.auth().currentUser.getIdToken(true)
    
    try {
      const result = await axios.post("http://localhost:5000/post-ads", ads, {
        headers: { authorization: `${token}` },
      });
      console.log(result);
      dispatch({ type: "POST_ADS" });
    } catch (err) {
      console.log(err);
      dispatch({ type: "POST_ERROR", err });
    }
  };
};
