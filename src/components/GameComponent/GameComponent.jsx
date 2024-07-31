/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  gameOver,
  getExistingGame,
  setNotificationShown,
  startGame,
} from "../../redux/game/game.actions";
import TryWord from "../TryWord/TryWord";
import Keyboard from "../Keyboard/Keyboard";
import ShowPhrase from "../ShowPhrase/ShowPhrase";
import "./game.css";
import getOrCreateUUId from "../../customhooks/uuid";
import {  toast } from "sonner";
import { getPhraseByNumber, updateGame } from "../../shared/api";
import { checkEndGame } from "../../shared/checkEndGame";
import { PropTypes } from "prop-types";
import ShareButton from "../ShareButton/ShareButton";

const GameComponent = () => {
  let oldPhraseNumber = localStorage.getItem("oldPhraseToPlay");
  

  if (!oldPhraseNumber) {
    oldPhraseNumber = 0;
  }
  const dispatch = useDispatch();
  
  const userId = getOrCreateUUId(); // Obtener el UUID del usuario
  const [wordsToTry, setWordsToTry] = useState([]);
  const gameId = localStorage.getItem("gameId");
  const phraseNumber = oldPhraseNumber || localStorage.getItem("phraseNumber");
  const [isInitialized, setIsInitialized] = useState(false);
  let game = useSelector((state) => state.gameReducer);

  useEffect(() => {
    const initializeGame = async () => {
      let phrase = "";

      phrase = await getPhraseByNumber(oldPhraseNumber);
      console.log(phrase);

      if (phraseNumber != phrase.number) {
        
        localStorage.setItem("phraseNumber", phrase.number);
        localStorage.removeItem("gameId");
        localStorage.removeItem("activeGame");
        dispatch(startGame(userId, oldPhraseNumber));
      } else if (gameId) {
        dispatch(getExistingGame(gameId));
      } else {
        dispatch(startGame(userId, oldPhraseNumber));
      }
      const storedNotificationShown = localStorage.getItem(`notificationShown_${phrase.number}`);
      dispatch(setNotificationShown(storedNotificationShown === 'true', phrase.number));
      setIsInitialized(true);
    };
    initializeGame();
    localStorage.removeItem("oldPhraseToPlay");
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    const words = [];
    for (let i = 0; i < game.maximumTries; i++) {
      words.push(<TryWord key={i} index={i} />);
    }
    setWordsToTry(words);
    
    if (gameId) {
      updateGame(gameId, game);
    }
  }, [ game.triedWords, game.currentTry]);

  // useEffect para checkEndGame
  useEffect(() => {
    if (game.phrase && game.triedWords.length > 0 ) {
      const endGameResult = checkEndGame(
        game.phrase,
        game.maximumTries,
        game.currentTry
      );
      if (endGameResult && game.isGameOver === "") {
        console.log("resultado", endGameResult);
        dispatch(gameOver(endGameResult));
       
      }
    }
  }, [game.phrase]);
//ACTUALIZA EL BACKEND CUANDO EL JUEGO ACABA
  useEffect(() => {
    if (game.isGameOver && gameId) {
      updateGame(gameId, game);
    }
  }, [game.isGameOver, gameId, game.phrase, game.triedWords, game.currentTry]);

  useEffect(() => {
    if (game.isGameOver && !game.notificationShown[game.phraseNumber]) {
      if (game.isGameOver === "win") {
        toast.success("¡Bien hecho!", { style: { background: "#51e651" } });
      } else if (game.isGameOver === "lose") {
        toast.error("Has perdido, lo siento");
      }
      dispatch(setNotificationShown(true, game.phraseNumber));
      
    }
  }, [game.isGameOver]);

  if (game.loading) {
    return <div className="loader"></div>;
  }

  if (game.error) {
    return <div>Error: {game.error}</div>;
  }

  return (
    <div className="game">

      <div className="words">{wordsToTry} </div>
      
      <ShowPhrase
        triedWords={game.triedWords}
        displayPhraseLink={game.isGameOver==="win"}
      />
      
      <Keyboard userId={userId} />
      {game.isGameOver && (
        <ShareButton 
          gameResult={game.isGameOver}
          phraseNumber={game.phraseNumber}
          attempts={game.currentTry}
        />
      )}
    </div>
  );
};
GameComponent.propTypes = {
  oldPhraseNumber: PropTypes.number,
};
export default GameComponent;
