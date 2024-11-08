import { createNewUser, updateUserData, getUserData } from "../../shared/api";
import Cookies from "js-cookie";

const createUser = () => async (dispatch) => {
  dispatch({ type: "CREATE_USER_REQUEST" });
  try {
    const user = await createNewUser();
    Cookies.set("laCitaDelDiaUserId", user._id);
    localStorage.setItem("laCitaDelDiaUserId", user._id);
    dispatch({ type: "CREATE_USER_SUCCESS", payload: user });
  } catch (error) {
    dispatch({ type: "CREATE_USER_FAIL", payload: error.message });
    throw error;
  }
};

const getUser = (userId) => async (dispatch) => {
  dispatch({ type: "GET_USER_REQUEST" });
  try {
    const user = await getUserData(userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    dispatch({ type: "GET_USER_SUCCESS", payload: user });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Si el servidor devuelve un 404, es que el usuario no existe en la base de datos
      dispatch({ type: "GET_USER_FAIL", payload: "Usuario no encontrado" });
    } else {
      // Otros errores 
      dispatch({ type: "GET_USER_FAIL", payload: "Error al obtener usuario" });
    }
    throw error;  
  }
};
const updateDontShowInstructions = (userId, updates) => async (dispatch) => {
  try {
    const response = await updateUserData(userId, {
      dontShowInstructions: updates,
    });
    dispatch({ type: "SET_DONT_SHOW_INSTRUCTIONS", payload: response.data });
  } catch (error) {
    dispatch({
      type: "SET_DONT_SHOW_INSTRUCTIONS_FAIL",
      payload: error.message,
    });
  }
};
const closeInstructionsBanner = () => ({
  type: "CLOSE_INSTRUCTIONS_BANNER",
});
const setUserStatsAction = (userStats) => async (dispatch) => {
  try {
    dispatch({ type: "SET_USERSTATS", payload: userStats });
  } catch (err) {
    dispatch({ type: "SET_USERSTATS_FAIL", payload: err.message });
  }
};

const setUserPointsAction = (userPoints) => async (dispatch) => {
  try {
    dispatch({ type: "SET_USERPOINTS", payload: userPoints });
  } catch (err) {
    dispatch({ type: "SET_USERPOINTS_FAIL", payload: err.message });
  }
};
const setUserRankingAction = (userRanking) => async (dispatch) => {
  try {
    dispatch({ type: "SET_USERRANKING", payload: userRanking });
  } catch (err) {
    dispatch({ type: "SET_USERRANKING_FAIL", payload: err.message });
  }
};

export {
  createUser,
  updateDontShowInstructions,
  getUser,
  setUserStatsAction,
  closeInstructionsBanner,
  setUserPointsAction,
  setUserRankingAction
};
