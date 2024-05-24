/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import removeAccents from "../../customhooks/removeAccents";
import "./showPhrase.css";
import { getPhraseOfTheDay } from "../../shared/api";
import { useDispatch } from 'react-redux';
import { updatePhrase } from "../../redux/game/game.actions";

const isLetter = (char) => /[a-zA-Z]/.test(char);

//sustituye las letras que no se han encontrado en la frase por "_"
const processPhraseToShow = (phrase, wordsToCheck) => {
  const plainPhrase = removeAccents(phrase);
  return plainPhrase
    .split("")
    .map((char) => {
      if (isLetter(char) && !wordsToCheck.some((word) => word.includes(char))) {
        return "_";
      }
      return char;
    })
    .join("");
};

const ShowPhrase = () => {
  const { triedWords, isGameOver, isWin } = useSelector(
    (state) => state.gameReducer
  );
  const dispatch = useDispatch();
  const [showEndGameAlert, setShowEndGameAlert] = useState(false);
  const [phraseToWords, setPhraseToWords] = useState([]);
  
  useEffect(() => {
    if (isGameOver) {
      setShowEndGameAlert(true);
    }
  }, [isGameOver]);

  useEffect(() => {
    if (showEndGameAlert) {
      if (isWin) {
        alert("Has ganado, felicidades");
      } else {
        alert("Has perdido, no hay más intentos");
      }
    }
  }, [showEndGameAlert, isWin]);

  useEffect(() => {
    const fetchPhrase = async () => {
      try {
        const fetchedPhrase = await getPhraseOfTheDay();
        const processPhrase = processPhraseToShow(fetchedPhrase, triedWords);
        dispatch(updatePhrase(processPhrase));
        setPhraseToWords(processPhrase.split(" "));
      } catch (error) {
        console.error("Error fetching phrase:", error);
      }
    };

    fetchPhrase();
  }, [triedWords, dispatch]);



  return (
    <div className="phrase-container">
      {phraseToWords.map((word, wordIndex) => (
        <span key={wordIndex} className="word">
          {word.split("").map((char, charIndex) => (
            <span
              key={charIndex}
              className={char==="_" ? "letter-box" : "visible-char"}
            >
              {char}
            </span>
          ))}
          <span className="space">&nbsp;</span>
        </span>
      ))}
    </div>
  );
};

export default ShowPhrase;
