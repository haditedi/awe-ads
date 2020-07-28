import axios from "axios";

export const postAds = (ads) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const uid = firebase.auth().currentUser.uid;
    console.log(uid);

    let data = { ...ads, imageUrl: [] };
    delete data._id;
    console.log("DATA", data);

    // CREATING PROMISE FOR POSTING AT GOOGLE STORAGE
    function getData(param) {
      return new Promise((resolve, reject) => {
        let imageLength = param.image.length;

        // ASSIGNING NEW UNIQUE IMAGE NAME
        param.image.map((el) => {
          let newFileName = el.file.name.split(".");
          let extension = newFileName.pop();
          let random = Math.floor(Math.random() * 1000000000);
          newFileName.push(random);
          newFileName = newFileName.join("");
          newFileName = newFileName + "." + extension;

          // PERFORM POST IN GOOGLE STORAGE
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

    // PERFORMING BACKEND AFTER PROMISE RETURN FROM GOOGLE
    try {
      const resultFirebase = await getData(ads);
      if (resultFirebase) {
        await axios.post("/post-ads", data);
        dispatch({ type: "POST_ADS_SUCCESS", payload: ads.title });
        setTimeout(() => {
          dispatch({ type: "CLEAR_MESSAGE" });
        }, 2000);
      }
    } catch (err) {
      console.log("ERROR", err);
      dispatch({ type: "POST_ADS_ERROR", err });
      setTimeout(() => {
        dispatch({ type: "CLEAR_MESSAGE" });
      }, 2000);
    }
  };
};

export const editAds = (ads) => {
  return async (dispatch, getState, { getFirebase }) => {
    console.log(ads);
    axios
      .post(`/edit-ads/${ads._id}`, ads)
      .then((resp) => {
        console.log(resp);
        dispatch({ type: "EDIT_ADS_SUCCESS", payload: ads.title });
        setTimeout(() => {
          dispatch({ type: "CLEAR_MESSAGE" });
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "EDIT_ADS_ERROR" });
        setTimeout(() => {
          dispatch({ type: "CLEAR_MESSAGE" });
        }, 2000);
      });
  };
};

export const deleteAd = (item) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const uid = firebase.auth().currentUser.uid;

    // GET IMAGE NAME AND NUMBER OF IMAGES
    let url = item.imageUrl.map((el) => {
      return el.url.split("?")[0].split("2F").pop();
    });
    let urlLength = url.length;

    // CREATE PROMISE FOR FIREBASE
    function deleteImage(param) {
      return new Promise((resolve, reject) => {
        param.map((el) => {
          firebase
            .storage()
            .ref(`images/${uid}/${el}`)
            .delete()
            .then(() => {
              urlLength--;

              if (urlLength === 0) {
                resolve("messages deleted");
              }
            })
            .catch((err) => reject(err));
          return urlLength;
        });
      });
    }

    // CONSUME PROMISE FROM FIREBASE AND SEND TO BACKEND
    try {
      const firebaseDelete = await deleteImage(url);

      if (firebaseDelete) {
        await axios.post("/delete-ad", { _id: item._id });
        dispatch({ type: "DELETE_AD_SUCCESS", payload: item.title });
        setTimeout(() => {
          dispatch({ type: "CLEAR_MESSAGE" });
        }, 2000);
      } else {
        throw new Error("Error");
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: "DELETE_AD_ERROR" });
      setTimeout(() => {
        dispatch({ type: "CLEAR_MESSAGE" });
      }, 2000);
    }
  };
};
