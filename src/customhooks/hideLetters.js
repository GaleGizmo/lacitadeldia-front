import isLetter from "./isLetter";
import removeAccents from "./removeAccents";

function processPhraseToShow (phrase, lettersToCheck) {
    const plainPhrase = removeAccents(phrase);
    return plainPhrase
      .split("")
      .map((char) => {
        if (isLetter(char) && !lettersToCheck.includes(char)) {
          return "_";
        }
        return char;
      })
      .join("");
  }

  export default processPhraseToShow;