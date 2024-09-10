const INITIAL_STATE = {
  userId: localStorage.getItem("laCitaDelDiaUserId"),
  dontShowInstructions: true,
  userStats:null,
  loading: false,
  error: null,
};
export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_USER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        userId: action.payload._id,
        dontShowInstructions: action.payload.dontShowInstructions,
      };
    case "GET_USER_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "CREATE_USER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "CREATE_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        userId: action.payload._id,
        dontShowInstructions: action.payload.instructions,
      };
      
    case "CREATE_USER_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "SET_DONT_SHOW_INSTRUCTIONS":
      return {
        ...state,
        dontShowInstructions: action.payload,
      };
    case "SET_DONT_SHOW_INSTRUCTIONS_FAIL":
      return {
        ...state,
        error: action.payload,
      };
    case "CLOSE_INSTRUCTIONS_BANNER":
      return {
        ...state,
        dontShowInstructions: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "SET_USERSTATS":
      return {
        ...state,
        userStats: action.payload,
      };
    case "SET_USERSTATS_FAIL":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
