import axios from "axios";

export const APIHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
   
};

export const APIGetPhrase = axios.create({
  baseURL: import.meta.env.VITE_APP_LOCAL_DAILY_URL,
  headers: APIHeaders,
});
export const APIBase = axios.create({
  baseURL: import.meta.env.VITE_APP_LOCAL_BASE_URL,
  headers: APIHeaders,
});

export const APIAddPhrase = axios.create({
  baseURL: import.meta.env.VITE_APP_ADD_PHRASE,
  headers: APIHeaders,
});
//Manejo común de errores y respuestas
const handleResponse = (response) => response.data;

const handleError = (error) => {
  console.error("Error en la API:", error.response?.data?.message || "Error desconocido");
  throw error;
}
// Funciones relacionadas con el usuario
export const createNewUser = async () => {
  return APIBase.post("/user/register")
    .then(handleResponse)
    .catch(handleError);
};

export const getUserData = async (userId) => {
  return APIBase.get(`/user/getuser/${userId}`)
    .then(handleResponse)
    .catch(handleError);
};

export const updateUserData = async (userId, userData) => {
  return APIBase.patch(`/user/updateuser/${userId}`, {userData})
    .then(handleResponse)
    .catch(handleError);
};

// Funciones relacionadas con el juego
export const checkWord = async (word, userId) => {
  return APIBase.post("/game/checkWord", { word, userId })
    .then(handleResponse)
    .catch(handleError);
};

export const updateGame = async (gameId, gameData) => {
  return APIBase.put(`/game/update/${gameId}`, gameData)
    .then((response) => {
      localStorage.setItem("activeGame", JSON.stringify(response.data)); 
      return response.data;
    })
    .catch(handleError);
};

export const getUserStats = async (userId) => {
  return APIBase.post("/game/getuserstats", { userId })
    .then(handleResponse)
    .catch(handleError);
};

export const getUserPoints = async (userId) => {
  return APIBase.get(`/user/getpoints/${userId}`)
    .then(handleResponse)
    .catch(handleError);
};

export const getUserPastPhrases = async (userId) => {
  return APIBase.get(`/phrases/getoldphrases/${userId}`)
    .then(handleResponse)
    .catch(handleError);
};

// Funciones relacionadas con frases
export const getPhraseOfTheDay = async () => {
  return APIGetPhrase.get("/")
    .then(handleResponse)
    .catch(handleError);
};

export const getPhraseOfTheDayNumber = async () => {
  return APIGetPhrase.get(`/getnumber`)
    .then(handleResponse)
    .catch(handleError);
};

export const getPhraseByNumber = async (phraseNumber) => {
  return APIGetPhrase.get(`/getphrasebynumber/${phraseNumber}`)
    .then(handleResponse)
    .catch(handleError);
};

export const addPhrase = async (phraseData) => {
  
  return APIAddPhrase.post("/", {phraseData})
    .then(handleResponse)
    .catch(handleError);
};
export const addMessage = async (messageData) => {
  return APIBase.post("/messages/addmessage", {message:messageData})
    .then(handleResponse)
    .catch(handleError);
};