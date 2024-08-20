import { useSelector } from "react-redux";
import LetterBox from "../LetterBox/LetterBox";
import PropTypes from "prop-types";
import "./tryWord.css";

const TryWord = ({ index }) => {
  const { lettersFound, lettersFailed, wordToTry, currentTry, triedWords } = useSelector(
    (state) => state.gameReducer
  );

  const letterBoxes = [];
  const active = index === currentTry;
  const wordToShow = active ? wordToTry : triedWords[index] || "";

  for (let i = 0; i < 5; i++) {
    let letterClass = "";
    if (lettersFound || lettersFailed) {
      if (lettersFound.includes(wordToShow[i])) letterClass="in-phrase";
      if (lettersFailed.includes(wordToShow[i])) letterClass="not-in-phrase";
      let isActiveLetter;
      if (active) {
        isActiveLetter = i === wordToTry.length;
      }
      letterBoxes.push(
        <LetterBox
          isBoxActive={isActiveLetter}
          boxContent={wordToShow[i] || ""}
          key={i}
          letterClass={letterClass}
        />
      );
    }
  }
  return <div className="wordToTry">{letterBoxes}</div>;
};
TryWord.propTypes = {
  index: PropTypes.number.isRequired,
};
export default TryWord;
