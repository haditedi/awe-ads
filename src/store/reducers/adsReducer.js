const initState = {
  adsError: null,
  message: null,
};

const adsReducer = (state = initState, action) => {
  switch (action.type) {
    case "POST_ADS":
      return {
        ...state,
        message: "Post Added",
        adsError: null,
      };
    case "POST_ERROR":
      return {
        ...state,
        adsError: action.err.message,
      };
    default:
      return state;
  }
};

export default adsReducer;
