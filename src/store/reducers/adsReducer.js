const initState = {
  adsError: null,
  message: null,
};

const adsReducer = (state = initState, action) => {
  switch (action.type) {
    case "POST_ADS_SUCCESS":
      return {
        ...state,
        message: `${action.payload} Post Added`,
        adsError: null,
      };
    case "POST_ADS_ERROR":
      return {
        ...state,
        adsError: action.err.message,
      };

    default:
      return state;
  }
};

export default adsReducer;
