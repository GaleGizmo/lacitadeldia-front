/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import removeAccents from "../../customhooks/removeAccents";
import "./showPhrase.css";

const ShowPhrase = () => {
  const { phrase, triedWords, isGameOver, isWin } = useSelector((state) => state.gameReducer);
  const [showEndGameAlert, setShowEndGameAlert] = useState(false);
  const [phraseToWords, setPhraseToWords] = useState([]);

  useEffect(() => {
    if (phrase) {
      const plainPhrase = removeAccents(phrase);
      setPhraseToWords(plainPhrase.split(" "));
    }
  }, [phrase]);
  const isLetter = (char) => /[a-zA-Z]/.test(char);
  useEffect(() => {
    if (isGameOver) {
      setShowEndGameAlert(true);
    }
  }, [isGameOver]);
  useEffect(() => {
    if (showEndGameAlert) {
      if (isWin) {
        
        alert('Has ganado, felicidades');
      } else {
        alert('Has perdido, no hay más intentos');
      }
    }
  }, [showEndGameAlert, isWin]);

  return (
    <div className="phrase-container">
      {phraseToWords.map((word, wordIndex) => (
        <span key={wordIndex} className="word">
          {word.split("").map((char, charIndex) => (
            <span
              key={charIndex}
              className={isLetter(char) ? "letter-box" : "visible-char"}
            >
              {triedWords.some(word => word.includes(char)) ? char: ''}
            </span>
          ))}
          <span className="space">&nbsp;</span>
        </span>
      ))}
    </div>
  );
};

export default ShowPhrase;
