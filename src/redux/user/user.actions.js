import { createNewUser, updateUserData, getUserData } from "../../shared/api";

const createUser = () => async (dispatch) => {
  dispatch({ type: "CREATE_USER_REQUEST" });
  try {
    const user = await createNewUser();
 
    localStorage.setItem("laCitaDelDiaUserId", user._id);
    dispatch({ type: "CREATE_USER_SUCCESS", payload: user });
  } catch (error) {
    dispatch({ type: "CREATE_USER_FAIL" });
  }
};

const getUser = (userId) => async (dispatch) => {
  dispatch({ type: "GET_USER_REQUEST" });
  try {
    const user = await getUserData(userId);
    dispatch({ type: "GET_USER_SUCCESS", payload: user });
  } catch (error) {
    dispatch({ type: "GET_USER_FAIL", payload: error.message });
  }
};
const updateDontShowInstructions = (userId, updates) => async (dispatch) => {
  try {
    const response = await updateUserData(userId, {dontShowInstructions:updates});
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

export { createUser, updateDontShowInstructions, getUser, setUserStatsAction, closeInstructionsBanner };
