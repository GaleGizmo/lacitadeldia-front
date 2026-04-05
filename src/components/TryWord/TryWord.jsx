import LetterBox from "../LetterBox/LetterBox";
import PropTypes from "prop-types";
import "./tryWord.css";

const TryWord = ({  lettersFound, lettersFailed, wordToTry,}) => {
 

  const letterBoxes = [];

  const wordToShow = wordToTry || "";
  for (let i = 0; i < 5; i++) {
    let letterClass = "";
    if (lettersFound || lettersFailed) {
      if (lettersFound.includes(wordToShow[i])) letterClass = "in-phrase";
      if (lettersFailed.includes(wordToShow[i])) letterClass = "not-in-phrase";
      let isActiveLetter;
      isActiveLetter = i === wordToTry.length;
      
      letterBoxes.push(
        <LetterBox
          isBoxActive={isActiveLetter}
          boxContent={wordToShow[i] || ""}
          key={i}
          letterClass={letterClass}
        />,
      );
    }
  }
  return <div className="wordToTry">{letterBoxes}</div>;
};
TryWord.propTypes = {
  lettersFound: PropTypes.array.isRequired,
  lettersFailed: PropTypes.array.isRequired,
  wordToTry: PropTypes.string.isRequired,
};
export default TryWord;
