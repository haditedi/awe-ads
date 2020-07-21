import axios from "axios";

export const postAds = (ads) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    let data = { ...ads, imageUrl: [] };

    function getData(param) {
      return new Promise((resolve, reject) => {
        let imageLength = param.image.length;

        param.image.map((el) => {
          let progress;
          const uploadTask = firebase
            .storage()
            .ref(`images/${el.file.name}`)
            .put(el.file);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
            },
            (err) => reject(err),

            () => {
              uploadTask.snapshot.ref
                .getDownloadURL()
                .then(function (downloadURL) {
                  data.imageUrl.push({ url: downloadURL, alt: el.alt });
                  imageLength--;
                  console.log(imageLength);
                  if (progress === 100 && imageLength === 0) {
                    console.log("complete");
                    resolve("complete");
                  }
                });
            }
          );
        });
      });
    }
    getData(ads)
      .then(() => {
        axios.post("/post-ads", data);
      })
      .then((resp) => {
        console.log("ADS POSTED", resp);
        dispatch({ type: "POST_ADS_SUCCESS", payload: ads.title });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "POST_ADS_ERROR", err });
      });
  };
};

export const clearMessage = () => {
  return (dispatch) => {
    dispatch({ type: "CLEAR_MESSAGE" });
  };
};
