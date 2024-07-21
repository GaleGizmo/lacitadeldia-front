const INITIAL_STATE = {
  user: localStorage.getItem("userUUID"),
  userStats:null,
  loading: false,
  error: null,
};
export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case "LOGIN_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "SETUSERSTATS":
      return {
        ...state,
        userStats: action.payload,
      };
    case "SETUSERSTATSFAIL":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
