/* eslint-disable react/prop-types */

import "./keyboard.css";
import { useDispatch, useSelector } from "react-redux";
import useCheckWord from "../../customhooks/checkWord";
import {
  addLetter,
  deleteLastLetter,
  clearWord,
  nextTry, 
} from "../../redux/game/game.actions"; // Importa la acción para actualizar la letra escrita
import { useEffect } from "react";
import DeleteIcon from '../../assets/DeleteIcon';
import AcceptIcon from "../../assets/AcceptIcon";

const Keyboard = ({userId}) => {
  const dispatch = useDispatch();
  // Array de letras del teclado
  const lettersUp = "QWERTYUIOP".split(""); 
  const lettersMiddle = "ASDFGHJKLÑ".split("");
  const lettersDown = "ZXCVBNM".split("");
  const { phrase, wordToTry, isGameOver } = useSelector((reducer) => reducer.gameReducer);
  const [result, verifyWord, isVerifying] = useCheckWord();
  // Función para manejar el clic en una tecla del teclado
  const handleClick = (content) => {
    // Actualiza el estado de Redux con la letra correspondiente
    if (content === "DELETE") {
      dispatch(deleteLastLetter());
      return;
    }
    if (content === "SEND") {
      if (wordToTry.length < 5) {
        alert("La palabra debe tener 5 letras");
        return;
      }
      verifyWord(wordToTry, userId);
     
      return;
    }
    if (wordToTry.length >= 5) {
      
      return;
    }
    dispatch(addLetter(content));
  };
  useEffect(() => {
    if (result !== null && !isVerifying) {
      if (result) {
       
        dispatch(nextTry());
      } else {
        alert('No es válida');
      }
      
      dispatch(clearWord());
    }
  }, [result, isVerifying, dispatch]);
  

  return (
    <div className="keyboard">
      {/* Mapea las letras del teclado y renderiza cada tecla */}
      <div className="keys">
        {lettersUp.map((letter) => (
          <div key={letter} onClick={() => !isGameOver && handleClick(letter)} className={`key ${phrase.includes(letter) ? "in-phrase":""}`}>
            {letter}
          </div>
        ))}
      </div>
      <div className="keys">
        {lettersMiddle.map((letter) => (
          <div key={letter} onClick={() => !isGameOver && handleClick(letter)}  className={`key ${phrase.includes(letter) ? "in-phrase":""}`}>
            {letter}
          </div>
        ))}
      </div>
      <div className="keys">
        <div className="action" onClick={() => !isGameOver && handleClick("DELETE")}>
          <DeleteIcon />
        </div>
        {lettersDown.map((letter) => (
          <div key={letter} onClick={() => !isGameOver && handleClick(letter)} className={`key ${phrase.includes(letter) ? "in-phrase":""}`}>
            {letter}
          </div>
        ))}
        <div className="action" onClick={() => !isGameOver && handleClick("SEND")}>
          <AcceptIcon />
        </div>
      </div>
    </div>
  );
};

export default Keyboard;
