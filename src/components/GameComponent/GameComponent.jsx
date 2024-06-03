/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {

  gameOver,
  getExistingGame,
  startGame,
} from "../../redux/game/game.actions";
import TryWord from "../TryWord/TryWord";
import Keyboard from "../Keyboard/Keyboard";
import ShowPhrase from "../ShowPhrase/ShowPhrase";
import "./game.css";
import getOrCreateUUId from "../../customhooks/uuid";
import { toast } from "sonner";
import { getPhraseOfTheDay, updateGame } from "../../shared/api";
import { checkEndGame } from "../../shared/checkEndGame";

const GameComponent = () => {
  const dispatch = useDispatch();
  const userId = getOrCreateUUId(); // Obtener el UUID del usuario
  const [wordsToTry, setWordsToTry] = useState([]);
  const gameId = localStorage.getItem("gameId");
  const phraseNumber = localStorage.getItem("phraseNumber");
  const [isInitialized, setIsInitialized] = useState(false);
  let game = useSelector((state) => state.gameReducer);

  useEffect(() => {
    const initializeGame = async () => {
      const phrase = await getPhraseOfTheDay();
      if (phraseNumber != phrase.number) {
        console.log("phrase number en local y en back no coinciden");
        localStorage.setItem("phraseNumber", phrase.number);
        localStorage.removeItem("gameId");
        localStorage.removeItem("activeGame");
        dispatch(startGame(userId));
      } else if (gameId) {
        dispatch(getExistingGame(gameId));
      } else {
        dispatch(startGame(userId));
      }
      setIsInitialized(true);
    };
    initializeGame();
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
  }, [game.phrase, game.triedWords, game.currentTry]);

  // Nuevo useEffect separado para checkEndGame
  useEffect(() => {
    if (game.phrase && game.triedWords.length > 0) {
      const endGameResult = checkEndGame(game.phrase, game.maximumTries, game.currentTry);
      if (endGameResult && game.isGameOver === "") {
        console.log("resultado", endGameResult);
        dispatch(gameOver(endGameResult));
       updateGame(gameId, game);
      }
    }
  }, [game.phrase]);

  useEffect(() => {
   if(game.isGameOver==="win"){
    toast.success("¡Bien hecho!", {style:{background: "#51e651"}});

   } else if(game.isGameOver==="lose"){
   toast.error("Has perdido, lo siento");
   }
   updateGame(gameId, game);
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
      <ShowPhrase  triedWords={game.triedWords} displayPhraseLink={game.isGameOver} />
      <Keyboard userId={userId} />
    </div>
  );
};

export default GameComponent;
