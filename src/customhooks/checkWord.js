import { useState } from "react";
import { checkWord } from "../shared/api";

function useCheckWord() {
  const [isVerifying, setIsVerifying] = useState(false);

  const verifyWord = async (word, userId) => {
    setIsVerifying(true);
    try {
      const response = await checkWord(word, userId); // Llamada a la API
      return response; // Retorna directamente el resultado
    } catch (error) {
      console.error("Error al verificar la palabra:", error);
      return false; // Si hay error, retorna `false`
    } finally {
      setIsVerifying(false);
    }
  };

  return [verifyWord, isVerifying];
}

export default useCheckWord;
