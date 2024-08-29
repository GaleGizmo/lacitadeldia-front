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
    phraseNumber: 0,
    successMessage: null,
    lettersFound: [],
    newLetters: [],
    wordToTry: "",
    triedWords: [],
    gameResult: "",
    gameResultNotification: null,
    currentTry: 0,
    lettersFailed: [],
    clues: null,
    movieDirector:null,
    movieActor: null
  };
}

export const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "START_GAME_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        phrase: action.payload.phrase,
        lettersFound: action.payload.lettersFound,
        lettersFailed: action.payload.lettersFailed,
        maximumTries: action.payload.maximumTries,
        triedWords: action.payload.triedWords,
        phraseNumber: action.payload.phraseNumber,
        currentTry: action.payload.currentTry,
        gameResult: action.payload.gameResult,
        gameResultNotification: action.payload.gameResultNotification,
        movieDirector: action.payload.movieDirector,
        movieActor: action.payload.movieActor,
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
        gameResult: action.payload.gameResult,
        gameResultNotification: action.payload.gameResultNotification,
        movieDirector: action.payload.movieDirector,
        movieActor: action.payload.movieActor,
        clues: action.payload.clues,
      };
    case "UPDATE_GAME_DATA_FAILURE":
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
    case "ADD_WORD_TO_TRIEDWORDS": {
      const newTriedWords = [...state.triedWords, state.wordToTry];
      return {
        ...state,
        triedWords: newTriedWords,
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
    case "GAME_OVER":
      return { ...state, gameResult: action.payload };
    case "SET_NOTIFICATION_SHOWN":
      return {
        ...state,
        notificationShown: {
          ...state.notificationShown,
          [action.payload.phraseNumber]: action.payload.shown,
        },
      };
    case "HANDLE_CLUES_REQUEST":
      return { ...state, loading: true, error: null };
    case "HANDLE_CLUES_SUCCESS":
      return {
        ...state,
        loading: false,
        successMessage: action.payload.data.message,
        clues: {
          ...state.clues,
          [action.payload.clue]: {
            ...state.clues[action.payload.clue],
            status: false,
          },
        },
        ...(action.payload.data.director && {
          movieDirector: action.payload.data.director,
        }),
        ...(action.payload.data.actor && { movieActor: action.payload.data.actor }),
        ...(action.payload.data.updatedLettersFound && { lettersFound: action.payload.data.updatedLettersFound }),
        ...(action.payload.data.updatedPhrase) && { phrase: action.payload.data.updatedPhrase },
        ...(action.payload.data.revealedLetter && { newLetters: action.payload.data.revealedLetter })
      };
    case "HANDLE_CLUES_FAILURE":
      
      return { ...state, loading: false, error: action.payload };
    case "CLEAR_SUCCESS_MESSAGE":
      return { ...state, successMessage: "" };
      case "CLEAR_ERROR":
        return { ...state, error: null };
    default:
      return state;
  }
};
