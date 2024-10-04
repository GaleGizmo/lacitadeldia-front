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
import getRandomInvalidWordMessage from "../../customhooks/randomInvalidWordMessages";

const Keyboard = ({ userId }) => {
  const dispatch = useDispatch();

  const lettersUp = "QWERTYUIOP".split("");
  // const [failedLetters, setFailedLetters] = useState("");
  const lettersMiddle = "ASDFGHJKLÑ".split("");

  const lettersDown = "ZXCVBNM".split("");

  const { lettersFound, lettersFailed, wordToTry, gameStatus, isInputFocused } =
    useSelector((reducer) => reducer.gameReducer);

  const [ verifyWord, isVerifying] = useCheckWord();
 // Función para manejar el resultado de la verificación
  const handleWordVerificationResult = useCallback(
    (result) => {
      if (result) {
        dispatch(addWordToTried(wordToTry)); // Añade la palabra si es válida
      } else {
        const randomMessage = getRandomInvalidWordMessage();
        toast.error(randomMessage); // Muestra el error si la palabra es inválida
         dispatch(clearWord()); // Limpia la palabra actual
      }
      
    },
    [dispatch, wordToTry]
  );
  //captura letras desde el teclado en pantalla
  const handleClick = useCallback(
   async (content) => {
      if (gameStatus !== "playing" || isVerifying) return; 
      
      if (content === "DELETE") {
        if (wordToTry.length === 0) return;
        dispatch(deleteLastLetter());
        return;
      }
      if (content === "SEND") {
      
        if (wordToTry.length < 5) {
          toast.error("La palabra debe tener 5 letras");
          return;
        }
        const result = await verifyWord(wordToTry, userId);
        handleWordVerificationResult(result);
        return;
      }
      if (wordToTry.length === 5) {
        return;
      }
      dispatch(addLetter(content));
    },
    [dispatch, wordToTry, userId, verifyWord, gameStatus, isVerifying]
  );

  //captura letras desde el teclado físico
  const handleKeyDown = useCallback(
    async (event) => {
      const { key } = event;

      if (gameStatus !== "playing" || isInputFocused || isVerifying) return;

      if (key === "Backspace") {
        dispatch(deleteLastLetter());
      } else if (key === "Enter") {
        if (wordToTry.length < 5) {
          toast.error("La palabra debe tener 5 letras");
          return;
        }
        const result = await verifyWord(wordToTry, userId); // Verifica la palabra al presionar Enter
        handleWordVerificationResult(result); // Maneja el resultado
      } else if (key.length === 1 && key.match(/[a-zñ]/i)) {
        if (wordToTry.length >= 5) return;
        dispatch(addLetter(key.toUpperCase()));
      }
    },
    [dispatch, wordToTry, userId, verifyWord, gameStatus, isInputFocused, isVerifying, handleWordVerificationResult]
  );

  // Añade el listener del teclado físico
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  //verifica si la palabra es válida y la añade a triedWords
  //luego limpia la palabra actual
  //si no es válida muestra un mensaje de error

  // useEffect(() => {
  //   if (result !== null && !isVerifying) {
  //     console.log("Verificación de palabra:", result);
  //     if (result) {
  //       dispatch(addWordToTried(wordToTry));
  //     } else {
  //       const randomMessage = getRandomInvalidWordMessage();
  //     toast.error(randomMessage);
  //       dispatch(clearWord());
  //     }
  //   }
  // }, [result, isVerifying, dispatch]);

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
