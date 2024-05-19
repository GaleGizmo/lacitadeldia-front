const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")),
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
    default:
      return state;
  }
};
