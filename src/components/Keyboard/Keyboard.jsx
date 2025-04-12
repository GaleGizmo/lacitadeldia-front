/* eslint-disable react/prop-types */
import "./keyboard.css";
import { useDispatch, useSelector } from "react-redux";

import {
  addLetter,
  deleteLastLetter,
  setWordToCheck,
} from "../../redux/game/game.actions";
import { useEffect, useCallback } from "react";
import DeleteIcon from "../../assets/DeleteIcon";
import AcceptIcon from "../../assets/AcceptIcon";
import { toast } from "sonner";
import KeyboardRow from "../KeyboardRow/KeyboardRow";

const Keyboard = ({ userId }) => {
  const dispatch = useDispatch();

  const lettersUp = "QWERTYUIOP".split("");
  // const [failedLetters, setFailedLetters] = useState("");
  const lettersMiddle = "ASDFGHJKLÑ".split("");

  const lettersDown = "ZXCVBNM".split("");

  const { lettersFound, lettersFailed, wordToTry, gameStatus, isInputFocused } =
    useSelector((reducer) => reducer.gameReducer);
    
    const sendWord = useCallback(() => {
      if (wordToTry.length === 5) {
        dispatch(setWordToCheck(wordToTry));
      } else {
        toast.error("La palabra debe tener 5 letras");
      }
    }, [dispatch, wordToTry]);
  //captura letras desde el teclado en pantalla
  const handleClick = useCallback(
    (content) => {
      if (gameStatus !== "playing" || !userId) return;

      if (content === "DELETE") {
        if (wordToTry.length === 0) return;
        dispatch(deleteLastLetter());
        return;
      }
      if (content === "SEND") {
        sendWord();
        return;
      }
      if (wordToTry.length === 5) {
        return;
      }
      dispatch(addLetter(content));
    },
    [dispatch, wordToTry, gameStatus, userId, sendWord]
  );

  //captura letras desde el teclado físico
  const handleKeyDown = useCallback(
    (event) => {
      const { key } = event;

      if (gameStatus !== "playing" || isInputFocused || !userId) return;

      if (key === "Backspace") {
        if (wordToTry.length === 0) return;
        dispatch(deleteLastLetter());
        return;
      }
      if (key === "Enter") {
        sendWord();
        return;
      }
      if (wordToTry.length >= 5) return;
      if (key.length === 1 && key.match(/[a-zñ]/i)) {
        dispatch(addLetter(key.toUpperCase()));
      }
    },
    [dispatch, wordToTry, gameStatus, isInputFocused, sendWord, userId]
  );

  // Añade el listener del teclado físico
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);



  return (
    <div className="keyboard">
      <KeyboardRow
        letters={lettersUp}
        handleClick={handleClick}
        gameStatus={gameStatus}
        lettersFound={lettersFound}
        lettersFailed={lettersFailed}
      />
      <KeyboardRow
        letters={lettersMiddle}
        handleClick={handleClick}
        gameStatus={gameStatus}
        lettersFound={lettersFound}
        lettersFailed={lettersFailed}
      />
      <div className="keys">
        <div
          className="action"
          onClick={() => gameStatus === "playing" && handleClick("DELETE")}
        >
          <DeleteIcon width="33" height="33" viewBox="2 3 20 18" />
        </div>
        <KeyboardRow
          letters={lettersDown}
          handleClick={handleClick}
          gameStatus={gameStatus}
          lettersFound={lettersFound}
          lettersFailed={lettersFailed}
        />
        <div
          className="action"
          onClick={() => gameStatus === "playing" && handleClick("SEND")}
        >
          <AcceptIcon width="33" height="33" viewBox="2 3 20 18" />
        </div>
      </div>
    </div>
  );
};

export default Keyboard;
