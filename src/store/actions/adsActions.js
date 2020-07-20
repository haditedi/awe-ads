import axios from "axios";

export const postAds = (ads) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    let token = await firebase.auth().currentUser.getIdToken(true);

    try {
      let data = { ...ads, imageUrl: [] };
      ads.image.map(async (el) => {
        const uploadTask = firebase
          .storage()
          .ref(`images/${el.file.name}`)
          .put(el.file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (err) => console.log(err),

          () => {
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function (downloadURL) {
                data.imageUrl.push({ url: downloadURL, alt: el.alt });
              });
          }
        );
      });
      console.log(data);
      setTimeout(() => {
        axios.post("/post-ads", data, {
          headers: { authorization: `${token}` },
        });
        dispatch({ type: "POST_ADS_SUCCESS", payload: ads.title });
      }, 2000);
    } catch (err) {
      dispatch({ type: "POST_ADS_ERROR", err });
      console.log(err);
    }
  };
};
