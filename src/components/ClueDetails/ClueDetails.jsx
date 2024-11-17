import { useEffect, useState } from "react";
import "./ClueDetails.css";
import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import {
  handleClues,
  resetSuccessMessage,
  setInputFocus,
} from "../../redux/game/game.actions";

const ClueDetails = ({ typeOfClue }) => {
  const dispatch = useDispatch();
  const [clueDescription, setClueDescription] = useState("");
  const [wordToTry, setWordToTry] = useState("");
  const [consumedClueMessage, setConsumedClueMessage] = useState("Pista usada");
  const { clues, successMessage } = useSelector((state) => state.gameReducer);

  const useClue = () => {
    dispatch(handleClues(typeOfClue, wordToTry));
  };
  useEffect(() => {
    switch (typeOfClue) {
      case "letter":
        setClueDescription("Revela una letra");
        if (clues.letter.value) setConsumedClueMessage(clues.letter.value);
        break;
      case "lettersRight":
        setClueDescription("Letras comunes con:");
        if (clues.lettersRight.value)
          setConsumedClueMessage(
            `${clues.lettersRight.value.word} (${clues.lettersRight.value.commons})`
          );
        break;
      case "actor":
        setClueDescription("Quién dijo la frase");
        if (clues.actor.value) setConsumedClueMessage(clues.actor.value);
        break;
      case "director":
        setClueDescription("Quién dirigió la película");
        if (clues.director.value) setConsumedClueMessage(clues.director.value);
        break;
      default:
        setClueDescription("");
    }
  }, [typeOfClue, clues]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(resetSuccessMessage());
    }
  }, [successMessage, dispatch]);
  return (
    <div className="clue-details">
      <p className="clue-description">{clueDescription}</p>
      <div className="button-input-container">
        {typeOfClue === "lettersRight" && clues.lettersRight.status && (
          <input
            type="text"
            maxLength={"5"}
            onChange={(e) => setWordToTry(e.target.value.toLocaleUpperCase())}
            onFocus={() => dispatch(setInputFocus(true))}
            onBlur={() => dispatch(setInputFocus(false))}
          />
        )}
        {clueDescription && clues[typeOfClue] && clues[typeOfClue].status ? (
          <>
            {" "}
            <button onClick={useClue}>Usar</button>
            <p className="clue-price">{clues[typeOfClue].price}</p>
          </>
        ) : (
          clueDescription && (
            <p className="consumed-message">{consumedClueMessage}</p>
          )
        )}{" "}
      </div>
    </div>
  );
};
ClueDetails.propTypes = {
  typeOfClue: PropTypes.string,
};
export default ClueDetails;
