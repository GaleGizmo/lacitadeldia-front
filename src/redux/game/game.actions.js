import {  APIGame } from "../../shared/api.js";

const startGame =(userUUID)=> async (dispatch) => {
  try {
    const response = await APIGame.post("/start", {userUUID});
    console.log(response.data);
    dispatch({ type: "START_GAME_SUCCESS", payload: response.data });
  } catch (err) {
    dispatch({ type: "START_GAME_FAILURE", payload: err.message });
  }
  
}
const updatePhrase=(phraseUpdated)=>({
 
    type: "UPDATE_PHRASE",
    payload: phraseUpdated,
  })


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

export {
  startGame,
  addLetter,
  clearWord,
  deleteLastLetter,
  updatePhrase,
  setMaximumTries,
  nextTry,
};
