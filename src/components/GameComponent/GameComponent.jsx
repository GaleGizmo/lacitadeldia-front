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
import { toast } from "sonner";
import { PropTypes } from "prop-types";
import ShareButton from "../ShareButton/ShareButton";
import Clues from "../Clues/Clues";
import ShowPoints from "../ShowPoints/ShowPoints";
import { getPhraseOfTheDayNumber } from "../../shared/api";

const GameComponent = () => {
  let oldPhraseNumber = localStorage.getItem("oldPhraseToPlay");

  if (!oldPhraseNumber) {
    oldPhraseNumber = 0;
  }
  const dispatch = useDispatch();
  const [showPhraseDetails, setShowPhraseDetails] = useState(false);

  const [wordsToTry, setWordsToTry] = useState([]);
  const gameId = localStorage.getItem("gameId");
  const phraseNumber = oldPhraseNumber;
  const [isInitialized, setIsInitialized] = useState(false);
  let game = useSelector((state) => state.gameReducer);
  const { userId } = useSelector((state) => state.userReducer);

  useEffect(() => {
    const initializeGame = async () => {
      const phraseOfTheDayNumber = await getPhraseOfTheDayNumber();
      if (phraseOfTheDayNumber != game.phraseNumber) {
        localStorage.removeItem("gameId");
      }
      dispatch(startGame(userId, phraseNumber));

      setIsInitialized(true);
    };
    initializeGame();

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
    if (game.gameStatus != "playing" && !game.gameResultNotification) {
      if (game.gameStatus === "win") {
        toast.success("¡Bien hecho!", { style: { background: "#51e651" } });
        setShowPhraseDetails(true);
      } else if (game.gameStatus === "lose") {
        toast.error("Has perdido, lo siento");
      }
      const gameData = {
        gameResultNotification: true,
      };

      dispatch(updateGameData(gameId, gameData));
    }
  }, [game.gameStatus]);

  if (game.loading) {
    return <div className="loader"></div>;
  }

  return (
    <div className="game">
      <div className="words-clues-points-container">
       
        <div className="words">{wordsToTry} </div>
        <div className="clues-points-container">
          <div className="showPoints">
            <ShowPoints />{" "}
          </div>{" "}
          {game.gameStatus === "win" && (
          <div className="clues-container">
            <Clues />{" "}
          </div>
        )}
        </div>
      </div>

      <div className="phrase-and-button-container">
        <ShowPhrase
          displayPhraseLink={game.gameStatus === "win"}
          showModal={showPhraseDetails}
          onModalClose={() => setShowPhraseDetails(false)}
        />
        {game.gameStatus === "win" && (
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
      {game.gameStatus != "win" && (
        <ShareButton
          gameStatus={game.gameStatus}
          phraseNumber={game.phraseNumber}
          attempts={game.currentTry}
          maxTries={game.maximumTries}
        />
      )}
    </div>
  );
};
GameComponent.propTypes = {
  oldPhraseNumber: PropTypes.number,
};
export default GameComponent;
