import axios from "axios";




export const APIHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
 
};


export const APIGetPhrase = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: APIHeaders,
});
export const APIGame = axios.create({
  baseURL: import.meta.env.VITE_APP_GAME_URL,
  headers: APIHeaders,
});

export const checkWord = async (word, userId) => {
  try {
    const response = await APIGame.post('/checkWord', { word, userId });
    return response.data;
  } catch (error) {
    console.error('Error al verificar la palabra:', error);
    throw error;
  }
};
export const getPhraseOfTheDay = async () => {
  try {
    const response = await APIGetPhrase.get('/');

    return response.data.quote;
  } catch (error) {
    console.error('Error al obtener la frase del día:', error);
    throw error;
  }
};