import { APIBase } from "../../shared/api.js";

const startGame = (userUUID, phraseToPlay) => async (dispatch) => {
  dispatch({ type: "START_GAME_REQUEST" });

  try {
    let response = "";
    const activeGame = localStorage.getItem("gameId");
    if (activeGame) {
      
      response = await APIBase.get(`/game/active/${activeGame}`);
    } else {
      response = await APIBase.post("/game/start", {
        userUUID,
        phraseToPlay,
      });
    }

    localStorage.setItem("gameId", response.data._id);
    localStorage.setItem("phraseNumber", response.data.phraseNumber);
    localStorage.setItem("activeGame", JSON.stringify(response.data));
    dispatch({ type: "START_GAME_SUCCESS", payload: response.data });
  } catch (err) {
    dispatch({ type: "START_GAME_FAILURE", payload: err.message });
  }
};

const updateGameData = (gameId, gameData) => async (dispatch) => {
  dispatch({ type: "UPDATE_GAME_DATA_REQUEST" });
  try {
    console.log("enviados al back", gameData);
    const updatedData = await APIBase.put(`/game/update/${gameId}`, {
      gameData,
    });
    console.log("recibidos del back", updatedData.data);
    localStorage.setItem("activeGame", JSON.stringify(updatedData.data));
    dispatch({ type: "UPDATE_GAME_DATA_SUCCESS", payload: updatedData.data });
  } catch (err) {
    dispatch({ type: "UPDATE_GAME_DATA_FAILURE", payload: err.message });
  }
};
const updatePhrase = (phraseUpdated) => ({
  type: "UPDATE_PHRASE",
  payload: phraseUpdated,
});

const setMaximumTries = (maxTries) => ({
  type: "SET_MAXIMUM_TRIES",
  payload: maxTries,
});

const addLetter = (letter) => ({ type: "ADD_LETTER", payload: letter });

const deleteLastLetter = () => ({
  type: "DELETE_LAST_LETTER",
});
const addWordToTried = () => ({ type: "ADD_WORD_TO_TRIEDWORDS" });

const clearWord = () => ({ type: "CLEAR_WORD" });

const gameOver = (gameResult) => ({
  type: "GAME_OVER",
  payload: gameResult,
});
const setNotificationShown = (shown, phraseNumber) => {
  localStorage.setItem(
    `notificationShown_${phraseNumber}`,
    JSON.stringify(shown)
  );
  return {
    type: "SET_NOTIFICATION_SHOWN",
    payload: { shown, phraseNumber },
  };
};
export {
  startGame,
  addLetter,
  clearWord,
  deleteLastLetter,
  updatePhrase,
  setMaximumTries,
  addWordToTried,
  gameOver,
  setNotificationShown,
  updateGameData,
};
