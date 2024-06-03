const INITIAL_STATE = (() => {
  const savedGame = localStorage.getItem('activeGame');
  if (savedGame) {
    try {
      const parsedGame = JSON.parse(savedGame);
      return {
        ...parsedGame,
        loading: null,
        error: null,
        successMessage: null,
        wordToTry: "",
        isGameOver: "",

        
      };
    } catch (e) {
      console.error("Error parsing activeGame from localStorage", e);
      return {
        loading: null,
        error: null,
        phrase: null,
        maximumTries: 0,
        phraseNumber: 0,
        successMessage: null,
        wordToTry: "",
        triedWords: [],
        isGameOver: "",
        
        currentTry: 0,
      };
    }
  } else {
    return {
      loading: null,
      error: null,
      phrase: null,
      maximumTries: 0,
      phraseNumber: 0,
      successMessage: null,
      wordToTry: "",
      triedWords: [],
      isGameOver: "",
     
      currentTry: 0,
    };
  }
})();

export const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "START_GAME_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        maximumTries: action.payload.maximumTries,
        triedWords: action.payload.triedWords,
        phraseNumber: action.payload.phraseNumber,
        currentTry: action.payload.currentTry,
        isGameOver: action.payload.isGameOver,
       
      };
    case "START_GAME_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "GET_ACTIVE_GAME_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "GET_ACTIVE_GAME_SUCCESS":
      return {
        ...state,
        loading: false,
        phrase: action.payload.phrase,
        triedWords: action.payload.triedWords,
        phraseNumber: action.payload.phraseNumber,
        currentTry: action.payload.currentTry,
        maximumTries: action.payload.maximumTries,
        isGameOver: action.payload.isGameOver,
        
      };
    case "GET_ACTIVE_GAME_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "FETCH_PHRASE_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_PHRASE_SUCCESS":
      return { ...state, loading: false, phrase: action.payload };
    case "FETCH_PHRASE_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_PHRASE":
      return { ...state, phrase: action.payload };
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
    case "NEXT_TRY": {
      const newTriedWords = [...state.triedWords, state.wordToTry];
      return {
        ...state,
        triedWords: newTriedWords,
        currentTry: state.currentTry + 1,
      };
    }
    case "GAME_OVER":
      return { ...state, isGameOver: action.payload };

    default:
      return state;
  }
};
