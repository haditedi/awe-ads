const initState = {
  ads: [],
};

const adsReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_ADS":
      return {
        ads: [...state.ads, action.payload],
      };
    default:
      return state;
  }
};

export default adsReducer;
