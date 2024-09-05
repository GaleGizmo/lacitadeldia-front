/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  startGame,
  updateGameData,
} from "../../redux/game/game.actions";
import TryWord from "../TryWord/TryWord";
import Keyboard from "../Keyboard/Keyboard";
import ShowPhrase from "../ShowPhrase/ShowPhrase";
import "./game.css";
import getOrCreateUUId from "../../customhooks/uuid";
import { toast } from "sonner";

import { PropTypes } from "prop-types";
import ShareButton from "../ShareButton/ShareButton";
import Clues from "../Clues/Clues";
import ShowPoints from "../ShowPoints/ShowPoints";

const GameComponent = () => {
  let oldPhraseNumber = localStorage.getItem("oldPhraseToPlay");

  if (!oldPhraseNumber) {
    oldPhraseNumber = 0;
  }
  const dispatch = useDispatch();
  const [showPhraseDetails, setShowPhraseDetails] = useState(false);
  const userId = getOrCreateUUId(); // Obtener el UUID del usuario
  const [wordsToTry, setWordsToTry] = useState([]);
  const gameId = localStorage.getItem("gameId");
  const phraseNumber = oldPhraseNumber;
  const [isInitialized, setIsInitialized] = useState(false);
  let game = useSelector((state) => state.gameReducer);

  useEffect(() => {
    const initializeGame = () => {
      dispatch(startGame(userId, phraseNumber));

      setIsInitialized(true);
    };
    initializeGame();
    console.log("juego iniciado")
    localStorage.removeItem("oldPhraseToPlay");
  }, []);
  useEffect(() => {
    if (game.error) {
      toast.error(game.error);
      dispatch(clearError());
    }
  }, [game.error]);
  useEffect(() => {
    if (!isInitialized) return;

    const words = [];
    for (let i = 0; i < game.maximumTries; i++) {
      words.push(<TryWord key={i} index={i} />);
    }
    setWordsToTry(words);

    if (gameId && game.wordToTry && game.currentTry < game.maximumTries) {
      const gameData = {
        triedWord: game.wordToTry,
      };

      dispatch(updateGameData(gameId, gameData));
    }
  }, [game.triedWords]);

  useEffect(() => {
    if (game.gameResult && !game.gameResultNotification) {
      if (game.gameResult === "win") {
        toast.success("¡Bien hecho!", { style: { background: "#51e651" } });
        setShowPhraseDetails(true);
      } else if (game.gameResult === "lose") {
        toast.error("Has perdido, lo siento");
      }
      const gameData = {
        gameResultNotification: true,
      };

      dispatch(updateGameData(gameId, gameData));
    }
  }, [game.gameResult]);

  if (game.loading) {
    return <div className="loader"></div>;
  }

  return (
    <div className="game">
     {!game.gameResult && <div className="clues-container">
        <Clues />{" "}
      </div>}
      <div className="words">{wordsToTry} </div>
      {!game.gameResult && <div className="showPoints">
        <ShowPoints/>{" "}
      </div>}
      <div className="phrase-and-button-container">
        <ShowPhrase
          displayPhraseLink={game.gameResult === "win"}
          showModal={showPhraseDetails}
          onModalClose={() => setShowPhraseDetails(false)}
        />
        {game.gameResult === "win" && (
          <div className="phrase-link-container">
            <button
              className="phrase-link"
              onClick={() => setShowPhraseDetails(true)}
            >
              Ver detalles de la cita
            </button>
          </div>
        )}{" "}
      </div>
      <Keyboard userId={userId} />
      {game.gameResult && (
        <ShareButton
          gameResult={game.gameResult}
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
