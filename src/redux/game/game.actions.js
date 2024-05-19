import { APIGetPhrase } from "../../shared/api.js";

const getPhraseOfTheDay = () => {
  return async (dispatch) => {
    dispatch({ type: "CLEAR_PHRASE" });
    try {
      const response = await APIGetPhrase.get("/");
      dispatch({ type: "FETCH_PHRASE_SUCCESS", payload: response.data.quote });
    } catch (err) {
      dispatch({ type: "FETCH_PHRASE_FAILURE", payload: err.message });
    }
  };
};


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
  addLetter,
  clearWord,
  deleteLastLetter,
  getPhraseOfTheDay,
  setMaximumTries,
  nextTry,
};
