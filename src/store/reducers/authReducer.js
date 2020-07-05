const initState = {
  uid: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        uid: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
