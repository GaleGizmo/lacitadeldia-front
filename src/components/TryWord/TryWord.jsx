import { useSelector } from "react-redux";
import LetterBox from "../LetterBox/LetterBox";
import PropTypes from "prop-types";
import "./tryWord.css";
import { useDispatch } from 'react-redux';
import { updateLettersFound } from "../../redux/game/game.actions";

const TryWord = ({ index }) => {
  const { phrase, wordToTry, currentTry, triedWords, lettersFound } = useSelector(
    (state) => state.gameReducer
  );
  const dispatch=useDispatch();
  const letterBoxes = [];
  const active = index === currentTry;
  const wordToShow = active ? wordToTry : triedWords[index] || "";

  for (let i = 0; i < 5; i++) {
    if (phrase) {
      const isInPhrase = phrase.includes(wordToShow[i]);
      if (isInPhrase && !lettersFound.includes(wordToShow[i])) {
        dispatch(updateLettersFound(wordToShow[i]));
      }
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
