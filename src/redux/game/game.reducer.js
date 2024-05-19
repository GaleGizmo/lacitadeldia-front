const INITIAL_STATE = {
  loading: null,
  error: null,
  phrase: null,
  maximumTries: 0,
  successMessage: null,
  wordToTry: "",
  triedWords:[],
  isGameOver: false,
  isWin:false,
  currentTry: 0,
};
export const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_PHRASE_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_PHRASE_SUCCESS":
      return { ...state, loading: false, phrase: action.payload };
    case "FETCH_PHRASE_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "SET_MAXIMUM_TRIES":
      return { ...state, maximumTries: action.payload };
    case "ADD_LETTER":
      return { ...state, wordToTry: state.wordToTry + action.payload };
    case "DELETE_LAST_LETTER":
      return {
        ...state,
        wordToTry: state.wordToTry.slice(0, -1),
      };
    case "CLEAR_WORD":
      return { ...state, wordToTry: "" };
    case "CLEAR_PHRASE":
      return { ...state, phrase: null };
      case "NEXT_TRY":{
        const newTriedWords = [...state.triedWords, state.wordToTry];
        const phraseUpperCase=state.phrase.toUpperCase();
        const isAllLettersFound = phraseUpperCase
          .split("")
          .every(char => !/[a-zA-Z]/.test(char) || newTriedWords.some(word => word.includes(char)));
        const isMaximumTriesExceeded = state.currentTry + 1 >= state.maximumTries;
  
        return {
          ...state,
          triedWords: newTriedWords,
          currentTry: state.currentTry + 1,
          isGameOver: isAllLettersFound || isMaximumTriesExceeded,
          isWin: isAllLettersFound
        }}
    default:
      return state;
  }
};
