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
export const APICheckWord = axios.create({
  baseURL: import.meta.env.VITE_APP_CHECK_WORD_URL,
  headers: APIHeaders,
});

export const checkWord = (word, userId) => {
  return APICheckWord.post('/checkWord', { word, userId });
};