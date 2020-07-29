const initState = {
  authError: null,
  name: "",
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        authError: null,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        authError: action.err.message,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        authError: "",
      };

    case "SIGN_UP_SUCCESS":
      return {
        ...state,
        authError: null,
        name: action.name,
      };

    case "SIGN_UP_ERROR":
      return {
        ...state,
        authError: action.err.message,
      };
    case "SIGN_OUT":
      return initState;
    default:
      return state; 
  }
};

export default authReducer;
