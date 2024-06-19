import { APIGame, APIGetPhrase } from "../../shared/api.js";

const startGame = (userUUID, oldPhraseToPlay) => async (dispatch) => {
  dispatch({ type: "START_GAME_REQUEST" });

  try {
    const response = await APIGame.post("/start", { userUUID, oldPhraseToPlay });
    console.log(response.data);
    localStorage.setItem("gameId", response.data._id);
    localStorage.setItem("phraseNumber", response.data.phraseNumber);
    localStorage.setItem('activeGame', JSON.stringify(response.data));
    dispatch({ type: "START_GAME_SUCCESS", payload: response.data });
  } catch (err) {
    dispatch({ type: "START_GAME_FAILURE", payload: err.message });
  }
};

const getExistingGame = (gameId) => async (dispatch) => {
  dispatch({ type: "GET_ACTIVE_GAME_REQUEST" });
  try {
    const phraseNumber = localStorage.getItem("phraseNumber");
    const userId = localStorage.getItem("userUUID");
    const currentPhrase = await APIGetPhrase.get("/");
    
    if (phraseNumber == currentPhrase.data.number) {
      const response = await APIGame.get(`/active/${gameId}`);
      console.log(response.data);
      localStorage.setItem('activeGame', JSON.stringify(response.data));
      dispatch({ type: "GET_ACTIVE_GAME_SUCCESS", payload: response.data });
    } else {
      startGame(userId)(dispatch);
    }
  } catch (err) {
    dispatch({ type: "GET_ACTIVE_GAME_FAILURE", payload: err.message });
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
const nextTry = () => ({ type: "NEXT_TRY" });

const clearWord = () => ({ type: "CLEAR_WORD" });

const gameOver = (gameResult) => ({
  type: "GAME_OVER",
  payload: gameResult,
});

export {
  startGame,
  addLetter,
  clearWord,
  deleteLastLetter,
  updatePhrase,
  setMaximumTries,
  nextTry,
  getExistingGame,
  gameOver,
};
