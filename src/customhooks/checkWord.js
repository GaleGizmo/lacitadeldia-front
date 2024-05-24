import { useState } from 'react';
import { checkWord } from '../shared/api';

function useCheckWord() {
  const [result, setResult] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const verifyWord = (word, userId) => {
    setIsVerifying(true);
    checkWord(word, userId)
      .then(response => {
        console.log( response);
        setResult(response.wordFound);
        setIsVerifying(false);
      })
      .catch(error => {
        console.error('Error al verificar la palabra:', error);
        setResult(false);
        setIsVerifying(false);
      });
  };

  return [result, verifyWord, isVerifying];
}

export default useCheckWord;
