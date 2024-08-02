const INITIAL_STATE = (() => {
  const savedGame = localStorage.getItem("activeGame");
  if (savedGame) {
    try {
      const parsedGame = JSON.parse(savedGame);
      const phraseNumber = parsedGame.phraseNumber;
      return {
        ...parsedGame,
        loading: null,
        error: null,
        successMessage: null,
        
        wordToTry: "",
        notificationShown: {
          [phraseNumber]:
            localStorage.getItem(`notificationShown_${phraseNumber}`) ===
            "true",
        },
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
    lettersFound:[],
    wordToTry: "",
    triedWords: [],
    isGameOver: "",
    currentTry: 0,
    notificationShown: {},
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
        maximumTries: action.payload.maximumTries,
        triedWords: action.payload.triedWords,
        phraseNumber: action.payload.phraseNumber,
        currentTry: action.payload.currentTry,
        isGameOver: action.payload.isGameOver,
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
        phrase: action.payload.phrase,
        lettersFound: action.payload.lettersFound,
        phraseNumber: action.payload.phraseNumber,
        currentTry: action.payload.currentTry,
        maximumTries: action.payload.maximumTries,
        isGameOver: action.payload.isGameOver,
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
    case "UPDATE_LETTERS_FOUND":{
      
      return {
        ...state,
        lettersFound: action.payload,
      };
    }
    case "UPDATE_LETTERS_FOUND_ERROR":{
      return { ...state, loading: false, error: action.payload };
    }
    case "GAME_OVER":
      return { ...state, isGameOver: action.payload };
    case "SET_NOTIFICATION_SHOWN":
        return {
          ...state,
          notificationShown: {
            ...state.notificationShown,
            [action.payload.phraseNumber]: action.payload.shown
          }
        };

    default:
      return state;
  }
};
