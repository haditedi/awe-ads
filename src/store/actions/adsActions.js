import axios from "axios";

export const postAds = (ads) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const uid = firebase.auth().currentUser.uid;
    console.log(uid);

    let data = { ...ads, imageUrl: [] };

    function getData(param) {
      return new Promise((resolve, reject) => {
        let imageLength = param.image.length;

        param.image.map((el) => {
          let newFileName = el.file.name.split(".");
          let extension = newFileName.pop();
          let random = Math.floor(Math.random() * 1000000000);
          newFileName.push(random);
          newFileName = newFileName.join("");
          newFileName = newFileName + "." + extension;

          let progress;
          const uploadTask = firebase
            .storage()
            .ref(`images/${uid}/${newFileName}`)
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
                  data.imageUrl.push({
                    url: downloadURL,
                    alt: el.alt,
                    primary: el.primary,
                  });
                  imageLength--;
                  console.log(imageLength);
                  if (progress === 100 && imageLength === 0) {
                    console.log("complete");
                    resolve("complete");
                  }
                });
            }
          );
          return progress;
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
        setTimeout(() => {
          dispatch({ type: "CLEAR_MESSAGE" });
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "POST_ADS_ERROR", err });
        setTimeout(() => {
          dispatch({ type: "CLEAR_MESSAGE" });
        }, 2000);
      });
  };
};

export const deleteAd = (item) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const uid = firebase.auth().currentUser.uid;
    console.log(uid);

    let url = item.imageUrl.map((el) => {
      return el.url.split("?")[0].split("2F").pop();
    });
    let urlLength = url.length;

    function deleteImage(param) {
      return new Promise((resolve, reject) => {
        param.map((el) => {
          firebase
            .storage()
            .ref(`images/${uid}/${el}`)
            .delete()
            .then(() => {
              urlLength--;
              console.log(urlLength);
              if (urlLength === 0) {
                resolve("messages deleted");
              }
            })
            .catch((err) => reject(err));
          return urlLength;
        });
      });
    }

    deleteImage(url)
      .then((resp) => {
        console.log("Success", resp);
        axios.post("/delete-ad", { _id: item._id });
      })
      .then(() => {
        console.log("axios success");
        dispatch({ type: "DELETE_AD_SUCCESS", payload: item.title });
        setTimeout(() => {
          dispatch({ type: "CLEAR_MESSAGE" });
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "DELETE_AD_ERROR" });
        setTimeout(() => {
          dispatch({ type: "CLEAR_MESSAGE" });
        }, 2000);
      });
  };
};
