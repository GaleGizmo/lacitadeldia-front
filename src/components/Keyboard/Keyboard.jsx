/* eslint-disable react/prop-types */
import "./keyboard.css";
import { useDispatch, useSelector } from "react-redux";
import useCheckWord from "../../customhooks/checkWord";
import {
  addLetter,
  deleteLastLetter,
  clearWord,
  nextTry,
} from "../../redux/game/game.actions";
import { useEffect, useCallback } from "react";
import DeleteIcon from "../../assets/DeleteIcon";
import AcceptIcon from "../../assets/AcceptIcon";
import { toast } from "sonner";
import KeyboardRow from "../KeyboardRow/KeyboardRow";

const Keyboard = ({ userId }) => {
  const dispatch = useDispatch();
  const lettersUp = "QWERTYUIOP".split("");
  const lettersMiddle = "ASDFGHJKLÑ".split("");
  const lettersDown = "ZXCVBNM".split("");
  const { phrase, wordToTry, isGameOver } = useSelector(
    (reducer) => reducer.gameReducer
  );

  const [result, verifyWord, isVerifying] = useCheckWord();

  //captura letras desde el teclado en pantalla
  const handleClick = useCallback((content) => {
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
  }, [dispatch, wordToTry, userId, verifyWord]);

//captura letras desde el teclado físico
  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;

      if (isGameOver) return;

      if (key === "Backspace") {
        dispatch(deleteLastLetter());
      } else if (key === "Enter") {
        if (wordToTry.length < 5) {
          toast.error("La palabra debe tener 5 letras");
          return;
        }
        verifyWord(wordToTry, userId);
      } else if (key.length === 1 && key.match(/[a-z]/i)) {
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
  }, [dispatch, wordToTry, userId, verifyWord, isGameOver]);

  useEffect(() => {
    if (result !== null && !isVerifying) {
      if (result) {
        dispatch(nextTry());
      } else {
        toast.error("Palabra no válida");
      }
      dispatch(clearWord());
    }
  }, [result, isVerifying, dispatch]);

  return (
    <div className="keyboard">
      <KeyboardRow
        letters={lettersUp}
        handleClick={handleClick}
        isGameOver={isGameOver}
        phrase={phrase}
      />
      <KeyboardRow
        letters={lettersMiddle}
        handleClick={handleClick}
        isGameOver={isGameOver}
        phrase={phrase}
      />
      <div className="keys">
        <div
          className="action"
          onClick={() => !isGameOver && handleClick("DELETE")}
        >
          <DeleteIcon />
        </div>
        <KeyboardRow
          letters={lettersDown}
          handleClick={handleClick}
          isGameOver={isGameOver}
          phrase={phrase}
        />
        <div
          className="action"
          onClick={() => !isGameOver && handleClick("SEND")}
        >
          <AcceptIcon />
        </div>
      </div>
    </div>
  );
};

export default Keyboard;
