import axios from "axios";

export const postAds = (ads) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    let token = await firebase.auth().currentUser.getIdToken(true);

    const uploadTask = firebase
      .storage()
      .ref(`images/${ads.image.name}`)
      .put(ads.image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (err) => dispatch({ type: "IMAGE_UPLOAD_ERROR", err }),
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          dispatch({ type: "IMAGE_UPLOAD_SUCCESS", payload: downloadURL });
          axios
            .post(
              "/post-ads",
              { ...ads, imageUrl: downloadURL },
              {
                headers: { authorization: `${token}` },
              }
            )
            .then(() => {
              dispatch({ type: "POST_ADS", payload: ads.title });
            })
            .catch((err) => {
              console.log(err);
              dispatch({ type: "POST_ERROR", err });
            });
        });
      }
    );
  };
};
