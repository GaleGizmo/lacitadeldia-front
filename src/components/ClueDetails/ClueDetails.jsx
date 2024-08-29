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

  const { clues, wordToTry, successMessage } = useSelector(
    (state) => state.gameReducer
  );

  const useClue = () => {
    dispatch(handleClues(typeOfClue, wordToTry));
  };
  useEffect(() => {
    switch (typeOfClue) {
      case "letter":
        setClueDescription(
          "Se descubre una letra al azar, incluidas sus repeticiones"
        );

        break;
      case "lettersRight":
        setClueDescription(
          "Número de letras comunes entre la frase y la palabra a intentar"
        );

        break;
      case "actor":
        setClueDescription("Muestra el actor que dijo la frase");

        break;
      case "director":
        setClueDescription("Muestra el director de la película");

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
      <p>{clueDescription}</p>
      {clueDescription && clues[typeOfClue] && clues[typeOfClue].status && (
        <button onClick={useClue}>Usar</button>
      )}
    </div>
  );
};
ClueDetails.propTypes = {
  typeOfClue: PropTypes.string,
};
export default ClueDetails;
