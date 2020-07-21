const initState = {
  adsError: null,
  message: null,
};

const adsReducer = (state = initState, action) => {
  switch (action.type) {
    case "POST_ADS_SUCCESS":
      return {
        ...state,
        message: `${action.payload} ads Added`,
        adsError: null,
      };
    case "POST_ADS_ERROR":
      return {
        ...state,
        adsError: action.err.message,
      };
    case "CLEAR_MESSAGE":
      return {
        initState,
      };
    case "DELETE_AD_SUCCESS":
      return {
        ...state,
        message: `${action.payload} ads deleted`,
      };
    case "DELETE_AD_ERROR":
      return {
        ...state,
        adsError: action.err.message,
      };

    default:
      return state;
  }
};

export default adsReducer;
