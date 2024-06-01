import isLetter from "./isLetter";
import removeAccents from "./removeAccents";

function processPhraseToShow (phrase, wordsToCheck) {
    const plainPhrase = removeAccents(phrase);
    return plainPhrase
      .split("")
      .map((char) => {
        if (isLetter(char) && !wordsToCheck.some((word) => word.includes(char))) {
          return "_";
        }
        return char;
      })
      .join("");
  }

  export default processPhraseToShow;