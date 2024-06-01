/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./showPhrase.css";
import { getPhraseOfTheDay, updateGame } from "../../shared/api";
import { useDispatch } from 'react-redux';
import { gameOver, updatePhrase } from "../../redux/game/game.actions";
import processPhraseToShow from "../../customhooks/hideLetters";
import { checkEndGame } from "../../shared/checkEndGame";
import isLetter from "../../customhooks/isLetter";


const ShowPhrase = ({triedWords}) => {
  // let { triedWords, isGameOver, isWin, currentTry, maximumTries } = useSelector(
  //   (state) => state.gameReducer
  // );
  const dispatch = useDispatch();
  // const [showEndGameAlert, setShowEndGameAlert] = useState(false);
  const [phraseToWords, setPhraseToWords] = useState([]);
  
  useEffect(() => {
    const fetchPhrase = async () => {
      try {
        // const gameId=localStorage.getItem("gameId");
        const fetchedPhrase = await getPhraseOfTheDay();
        console.log("palabras intentadas", triedWords);
        const processPhrase = processPhraseToShow(fetchedPhrase.quote, triedWords);
        dispatch(updatePhrase(processPhrase));
      //   if (checkEndGame(processPhrase, maximumTries, currentTry )==="win"){
      //     isWin=true;
      //     isGameOver=true;
      //     dispatch(gameOver(isWin))
      //   }
      //   if (checkEndGame(processPhrase, maximumTries, currentTry)==="lose"){

      //     isWin=false;
      //     isGameOver=true;
      //     dispatch(gameOver(isWin))
      //   }
      //   const gameData={
      //     phrase:processPhrase,
      //     currentTry:currentTry,
      //     triedWords:triedWords,
      //     isGameOver:isGameOver,
      //     isWin:isWin
      //   }
      //  if (gameId) updateGame(gameId, gameData)
        setPhraseToWords(processPhrase.split(" "));
        
      } catch (error) {
        console.error("Error fetching phrase:", error);
      }
    };

    fetchPhrase();
  }, [triedWords]);

   


  return (
    <div className="phrase-container">
      {phraseToWords.map((word, wordIndex) => (
        <span key={wordIndex} className="word">
          {word.split("").map((char, charIndex) => (
            <span
              key={charIndex}
              className={`phrase-letter ${char==="_" ? "letter-box" : isLetter(char) ? "visible-letter":"visible-char"}`}
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
