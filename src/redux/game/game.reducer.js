const INITIAL_STATE = (() => {
  const savedGame = localStorage.getItem("activeGame");
  if (savedGame) {
    try {
      const parsedGame = JSON.parse(savedGame);

      return {
        ...parsedGame,
        loading: null,
        error: null,
        successMessage: null,
        newLetters: [],
        wordToTry: "",
        isInputFocused: false,
        hasBoughtDetails: false,
      };
    } catch (e) {
      console.error("Error parsing activeGame from localStorage", e);
      return getDefaultState();
    }
  } else {
    return getDefaultState();
  }
})();

function getDefaultState() {
  return {
    loading: null,
    error: null,
    phrase: null,
    maximumTries: 0,
    userId: null,
    phraseNumber: 0,
    successMessage: null,
    lettersFound: [],
    newLetters: [],
    wordToTry: "",
    triedWords: [],
    gameStatus: "playing",
    gameResultNotification: null,
    currentTry: 0,
    lettersFailed: [],
    clues: { actor: {}, director: {}, letters: {}, lettersRight: {} },
    isInputFocused: false,
    hasBoughtDetails: false,
  };
}

export const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "START_GAME_REQUEST":
      return { ...state, loading: true, error: null };
    case "START_GAME_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        userId: action.payload.userId,
        newLetters:[],
        phrase: action.payload.phrase,
        lettersFound: action.payload.lettersFound,
        lettersFailed: action.payload.lettersFailed,
        maximumTries: action.payload.maximumTries,
        triedWords: action.payload.triedWords,
        phraseNumber: action.payload.phraseNumber,
        currentTry: action.payload.currentTry,
        gameStatus: action.payload.gameStatus,
        gameResultNotification: action.payload.gameResultNotification,
        hasBoughtDetails: action.payload.hasBoughtDetails,
        clues: action.payload.clues,
      };
    case "START_GAME_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_GAME_DATA_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "UPDATE_GAME_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        wordToTry: "",
        newLetters: action.payload.newLetters,
        phrase: action.payload.phrase,
        lettersFound: action.payload.lettersFound,
        lettersFailed: action.payload.lettersFailed,
        phraseNumber: action.payload.phraseNumber,
        currentTry: action.payload.currentTry,
        maximumTries: action.payload.maximumTries,
        gameStatus: action.payload.gameStatus,
        gameResultNotification: action.payload.gameResultNotification,
        hasBoughtDetails: action.payload.hasBoughtDetails,
        clues: action.payload.clues,
      };
    case "UPDATE_GAME_DATA_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

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
    case "ADD_WORD_TO_TRIEDWORDS": {
      const newTriedWords = [...state.triedWords, action.payload];
    
      return {
        ...state,
        triedWords: newTriedWords,
      };
    }
    case "DELETE_WORD_FROM_TRIEDWORDS": {
      const newTriedWords = state.triedWords.filter(
        (word) => word !== action.payload.deleteFromTried
      );

      return {
        ...state,
        triedWords: newTriedWords,
        wordToTry: "",
        error:action.payload.message,
        loading:false,
      };
    }
    case "UPDATE_LETTERS_FOUND": {
      return {
        ...state,
        lettersFound: action.payload,
      };
    }
    case "UPDATE_LETTERS_FOUND_ERROR": {
      return { ...state, loading: false, error: action.payload };
    }

    case "HANDLE_CLUES_REQUEST":
      return { ...state, loading: true, error: null };
    case "HANDLE_CLUES_SUCCESS":
      return {
        ...state,
        loading: false,
        successMessage: action.payload.data.message,
        clues: action.payload.clues,
        newLetters: [],
       

        ...(action.payload.data.updatedLettersFound && {
          lettersFound: action.payload.data.updatedLettersFound,
        }),
        ...(action.payload.data.updatedPhrase && {
          phrase: action.payload.data.updatedPhrase,
        }),
        ...(action.payload.data.revealedLetter && {
          newLetters: action.payload.data.revealedLetter,
        }),
      };
    case "HANDLE_CLUES_FAILURE":
      return { ...state, loading: false, error: action.payload, newLetters: [] };
    case "CLEAR_SUCCESS_MESSAGE":
      return { ...state, successMessage: "" };
    case "UPDATE_GAME_STATUS":
      return { ...state, gameStatus: action.payload };
    case "SET_INPUT_FOCUS":
      return {
        ...state,
        isInputFocused: action.payload,
      };
    case "SET_HAS_BOUGHT_DETAILS":
      return {
        ...state,
        hasBoughtDetails: action.payload,
      };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};
