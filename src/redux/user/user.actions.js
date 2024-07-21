

const setUserStatsAction = (userStats)=> async (dispatch) => {
  try {
   
    dispatch({ type: "SETUSERSTATS", payload: userStats});
  } catch (err) {
    dispatch({ type: "SETUSERSTATSFAIL", payload: err.message });
  }
};

export { setUserStatsAction };