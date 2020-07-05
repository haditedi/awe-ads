import axios from "axios";

export const createAds = (ads) => {
  return (dispatch, getState) => {
    console.log(ads);
    axios
      .post("https://dazzling-zion-41313.herokuapp.com/", ads)
      .then((resp) => {
        console.log("success");
        dispatch({ type: "CREATE_ADS", payload: ads });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
