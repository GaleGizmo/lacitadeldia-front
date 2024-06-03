import { useSelector } from "react-redux";
import LetterBox from "../LetterBox/LetterBox";
import PropTypes from "prop-types";
import "./tryWord.css";

const TryWord = ({ index }) => {
  const { phrase, wordToTry, currentTry, triedWords } = useSelector(
    (state) => state.gameReducer
  );
  const letterBoxes = [];
  const active = index === currentTry;
  const wordToShow = active ? wordToTry : triedWords[index] || "";

  
  for (let i = 0; i < 5; i++) {
    if (phrase) {
      const isInPhrase = phrase.includes(wordToShow[i]);
      letterBoxes.push(
        <LetterBox
          isBoxActive={false}
          boxContent={wordToShow[i] || ""}
          key={i}
          isLetterInPhrase={isInPhrase}
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
