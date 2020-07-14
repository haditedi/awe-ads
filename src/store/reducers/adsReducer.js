const initState = {
  adsError: null,
  message: null,
  imageUrl: null,
  uploadError: null,
  uploadSuccess: null,
};

const adsReducer = (state = initState, action) => {
  switch (action.type) {
    case "POST_ADS":
      return {
        ...state,
        message: `${action.payload} Post Added`,
        adsError: null,
      };
    case "POST_ERROR":
      return {
        ...state,
        adsError: action.err.message,
      };
    case "IMAGE_UPLOAD_SUCCESS":
      return {
        ...state,
        imageUrl: action.payload,
        uploadSuccess: "Image uploaded",
      };
    case "IMAGE_UPLOAD_ERROR":
      return {
        ...state,
        uploadError: action.payload.message,
      };

    default:
      return state;
  }
};

export default adsReducer;
