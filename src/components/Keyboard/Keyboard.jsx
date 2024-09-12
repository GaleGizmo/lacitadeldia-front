/* eslint-disable react/prop-types */
import "./keyboard.css";
import { useDispatch, useSelector } from "react-redux";
import useCheckWord from "../../customhooks/checkWord";
import {
  addLetter,
  deleteLastLetter,
  clearWord,
  addWordToTried,
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

  const { lettersFound, lettersFailed, wordToTry, gameStatus, isInputFocused } = useSelector(
    (reducer) => reducer.gameReducer
  );
  



  const [result, verifyWord, isVerifying] = useCheckWord();

  //captura letras desde el teclado en pantalla
  const handleClick = useCallback(
    (content) => {
      if (content === "DELETE") {
        dispatch(deleteLastLetter());
        return;
      }
      if (content === "SEND") {
        if (wordToTry.length < 5) {
          toast.error("La palabra debe tener 5 letras");
          return;
        }
        verifyWord(wordToTry, userId);
        return;
      }
      if (wordToTry.length >= 5) {
        return;
      }
      dispatch(addLetter(content));
    },
    [dispatch, wordToTry, userId, verifyWord]
  );

  //captura letras desde el teclado físico
  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;

      if (gameStatus!="playing" || isInputFocused) return;

      if (key === "Backspace") {
        dispatch(deleteLastLetter());
      } else if (key === "Enter") {
        if (wordToTry.length < 5) {
          toast.error("La palabra debe tener 5 letras");
          return;
        }
        verifyWord(wordToTry, userId);
      } else if (key.length === 1 && key.match(/[a-zñ]/i)) {
        if (wordToTry.length >= 5) {
          return;
        }
        dispatch(addLetter(key.toUpperCase()));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch, wordToTry, userId, verifyWord, gameStatus, isInputFocused]);

  //verifica si la palabra es válida y la añade a triedWords
  //luego limpia la palabra actual
  //si no es válida muestra un mensaje de error

  useEffect(() => {
    if (result !== null && !isVerifying) {
      if (result) {
        dispatch(addWordToTried());
      } else {
        toast.error("Palabra no válida");
        dispatch(clearWord());
      }
    }
  }, [result, isVerifying, dispatch]);

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
          onClick={() => gameStatus==="playing" && handleClick("DELETE")}
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
          onClick={() => gameStatus==="playing" && handleClick("SEND")}
        >
          <AcceptIcon width="33" height="33" viewBox="2 3 20 18" />
        </div>
      </div>
    </div>
  );
};

export default Keyboard;
