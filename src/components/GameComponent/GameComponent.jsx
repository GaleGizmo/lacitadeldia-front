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
import { getPhraseOfTheDayNumber, updateUserData } from "../../shared/api";

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
      if (userId) {
        dispatch(startGame(userId, phraseNumber));
        setIsInitialized(true);
      } else {
        console.error("Error: userId no está definido");
      }
    };
    initializeGame();

    localStorage.removeItem("oldPhraseToPlay");
  }, [userId]);

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
      let phrasesWon=null
      let phrasesLost=null
      if (game.gameStatus === "win") {
        toast.success("¡Bien hecho!", { style: { background: "#51e651" } });
        phrasesWon=game.phraseNumber
        setShowPhraseDetails(true);
      } else if (game.gameStatus === "lose") {
        toast.error("Has perdido, lo siento");
        phrasesLost=game.phraseNumber
      }
      const gameData = {
        gameResultNotification: true,
      };

      dispatch(updateGameData(gameId, gameData));
      if(phrasesWon) {
        updateUserData(userId,{phrasesWon})
      } else {
        updateUserData(userId,{phrasesLost})
      }
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
          {game.gameStatus === "playing" && (
          <div className="clues-container">
            <Clues />{" "}
          </div>
        )}
        {game.gameStatus === "win" && (
          <div className="phrase-link-container">
            <button
              className="phrase-link"
              onClick={() => setShowPhraseDetails(true)}
            >
              Detalles de la cita
            </button>
          </div>
        )}
        {game.gameStatus != "playing" && (
        <ShareButton
          gameStatus={game.gameStatus}
          phraseNumber={game.phraseNumber}
          attempts={game.currentTry}
          maxTries={game.maximumTries}
        />
      )}
        </div>
      </div>

      <div className="phrase-and-button-container">
        <ShowPhrase
          displayPhraseLink={game.gameStatus === "win"}
          showModal={showPhraseDetails}
          onModalClose={() => setShowPhraseDetails(false)}
        />
     {" "}
      </div>
      <Keyboard userId={userId} />
    
    </div>
  );
};
GameComponent.propTypes = {
  oldPhraseNumber: PropTypes.number,
};
export default GameComponent;
