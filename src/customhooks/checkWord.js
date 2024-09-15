import { useState } from 'react';
import { checkWord } from '../shared/api';

function useCheckWord() {
  const [result, setResult] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const verifyWord = async (word, userId) => {
    setIsVerifying(true);
    try {
      const response = await checkWord(word, userId);
    
      setResult(response.wordFound);
    } catch (error) {
      console.error('Error al verificar la palabra:', error);
      setResult(false);
    } finally {
      setIsVerifying(false);
    }
  };
  
  return [result, verifyWord, isVerifying];
}

export default useCheckWord;
