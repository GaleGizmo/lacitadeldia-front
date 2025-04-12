import { APIBase } from "../../shared/api.js";

const startGame = (userId, phraseToPlay) => async (dispatch) => {
  dispatch({ type: "START_GAME_REQUEST" });

  try {
    let response = "";
    const activeGame = localStorage.getItem("gameId");
    if (activeGame) {
      response = await APIBase.get(`/game/active/${activeGame}`);
    } else {
      response = await APIBase.post("/game/start", {
        userId,
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
    if (!gameId) gameId = localStorage.getItem("gameId");
    if (gameId && gameData) {
      const updatedData = await APIBase.put(`/game/update/${gameId}`, {
        gameData,
      });

      if (updatedData.data.deleteFromTried) {
     
        dispatch(wordNotValid(updatedData.data.message));
      
        
      } else {
        localStorage.setItem("activeGame", JSON.stringify(updatedData.data));
        dispatch({
          type: "UPDATE_GAME_DATA_SUCCESS",
          payload: updatedData.data,
        });
        dispatch(setWordToCheck(""));
      }
    }
  } catch (err) {
    dispatch({ type: "UPDATE_GAME_DATA_FAILURE", payload: err.message });
  }
};
const wordNotValid = (message) =>{
  return{
    type: "WORD_NOT_VALID",
    payload: message
  }
}
const handleClues = (clue, wordToTry) => async (dispatch) => {
  dispatch({ type: "HANDLE_CLUES_REQUEST" });
  try {
    const gameId = localStorage.getItem("gameId");
    if (clue === "lettersRight" && wordToTry.length != 5) {
      dispatch({
        type: "HANDLE_CLUES_FAILURE",
        payload: "La palabra debe tener 5 letras",
      });
      return;
    }
    const response = await APIBase.post(`/game/useclue/${gameId}`, {
      clue,
      wordToTry,
    });

    if (response.data.unusable) {
      dispatch({
        type: "HANDLE_CLUES_FAILURE",
        payload: response.data.unusable,
      });
      return;
    }
    dispatch({
      type: "HANDLE_CLUES_SUCCESS",
      payload: {
        data: response.data.clueResult,
        clues: response.data.updatedGameClues,
      },
    });
    //Si la pista de letra devuelve la última letra, espera y muestra los detalles de la cita
    if (response.data.clueResult.lastLetterRemaining) {
      dispatch({
        type: "UPDATE_GAME_POINTS",
        payload: response.data.clueResult.gamePoints,
      });
      setTimeout(
        () =>
          dispatch({
            type: "UPDATE_GAME_STATUS",
            payload: "win",
          }),
        3000
      );
    }
  } catch (err) {
    dispatch({ type: "HANDLE_CLUES_FAILURE", payload: err.message });
  }
};

const addLetter = (letter) => ({ type: "ADD_LETTER", payload: letter });

const deleteLastLetter = () => ({
  type: "DELETE_LAST_LETTER",
});
const addWordToTried = (verifiedWord) => ({
  type: "ADD_WORD_TO_TRIEDWORDS",
  payload: verifiedWord,
});
const setWordToCheck = (word) => ({
  type: "SET_WORD_TO_CHECK",
  payload: word,
});
const clearWord = () => ({ type: "CLEAR_WORD" });

const clearError = () => ({
  type: "CLEAR_ERROR",
});

const resetSuccessMessage = () => ({
  type: "CLEAR_SUCCESS_MESSAGE",
});
const setInputFocus = (isFocused) => ({
  type: "SET_INPUT_FOCUS",
  payload: isFocused,
});

export {
  startGame,
  addLetter,
  clearWord,
  clearError,
  deleteLastLetter,
  addWordToTried,
  resetSuccessMessage,
  updateGameData,
  handleClues,
  setInputFocus,
  setWordToCheck,
};
