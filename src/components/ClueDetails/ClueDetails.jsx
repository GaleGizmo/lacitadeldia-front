import { useEffect, useState } from "react";
import "./ClueDetails.css";
import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import {
  handleClues,
  resetSuccessMessage,
} from "../../redux/game/game.actions";

const ClueDetails = ({ typeOfClue }) => {
  const dispatch = useDispatch();
  const [clueDescription, setClueDescription] = useState("");
  const [wordToTry, setWordToTry] = useState("");
  const { clues, successMessage } = useSelector(
    (state) => state.gameReducer
  );

  const useClue = () => {
    dispatch(handleClues(typeOfClue, wordToTry));
  };
  useEffect(() => {
    switch (typeOfClue) {
      case "letter":
        setClueDescription(
          "Revela una letra de la frase"
        );

        break;
      case "lettersRight":
        setClueDescription(
          "Letras comunes con la palabra (5 letras):"
        );

        break;
      case "actor":
        setClueDescription("Actor/actriz que dijo la frase");

        break;
      case "director":
        setClueDescription("Quien dirigió la película");

        break;
      default:
        setClueDescription("");
    }
  }, [typeOfClue]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(resetSuccessMessage());
    }
  }, [successMessage, dispatch]);
  return (
    <div className="clue-details">
      <p className="clue-description">{clueDescription}</p>
      {(typeOfClue === "lettersRight" &&clues.lettersRight.status ) &&  (
        <input type="text" placeholder="Palabra a probar" onChange={(e) => setWordToTry(e.target.value.toLocaleUpperCase())} />
      )}
      {clueDescription && clues[typeOfClue] && clues[typeOfClue].status ? (
      <button onClick={useClue}>Usar</button>
    ) : clueDescription && (
      <p className="consumed-message">Pista consumida</p> 
    )}
    </div>
  );
};
ClueDetails.propTypes = {
  typeOfClue: PropTypes.string,
};
export default ClueDetails;
