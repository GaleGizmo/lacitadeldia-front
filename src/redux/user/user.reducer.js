import Cookies from "js-cookie";

const getUserId = () => {
  return (
    Cookies.get("laCitaDelDiaUserId") ||
    localStorage.getItem("laCitaDelDiaUserId")
  );
};
const INITIAL_STATE = {
  userId: getUserId(),
  dontShowInstructions: true,
  userStats: null,
  userRanking: 0,
  
  userPoints: null,
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
        userPoints: action.payload.points,
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
        userRanking: action.payload.ranking
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
    case "SET_USERPOINTS":
      return {
        ...state,
        userPoints: action.payload,
      };
    case "SET_USERPOINTS_FAIL":
      return {
        ...state,
        error: action.payload,
      };
    case "SET_USERRANKING": 
      
      return {
        ...state,
        userRanking: action.payload,
      };
    
    case "SET_USERRANKING_FAIL":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
