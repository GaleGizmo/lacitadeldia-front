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
import MyLettersList from "../MyLettersList/MyLettersList";
import { buyPhraseDetailsAction } from "../../redux/user/user.actions";
import InfoModal from "../InfoModal/InfoModal";

const GameComponent = () => {
  let oldPhraseNumber = localStorage.getItem("oldPhraseToPlay");
  if (!localStorage.getItem("myLettersList")) {
    localStorage.setItem("myLettersList", "");
  }
  if (!oldPhraseNumber) {
    oldPhraseNumber = 0;
  }
  const dispatch = useDispatch();
  const [showPhraseDetails, setShowPhraseDetails] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [wordsToTry, setWordsToTry] = useState([]);
  const gameId = localStorage.getItem("gameId");
  const phraseNumber = oldPhraseNumber;
  const [isInitialized, setIsInitialized] = useState(false);
  // Estado para manejar el modal genérico
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({ title: "", message: "" });
  let game = useSelector((state) => state.gameReducer);
  const { userId, userPoints, userRanking, hasPlayingStrikeBonus, hasWinningStrikeBonus } = useSelector(
    (state) => state.userReducer
  );

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
      let phrasesWon = null;
      let phrasesLost = null;
      if (game.gameStatus === "win") {
        toast.success("¡Bien hecho!", { style: { background: "#51e651" } });
        phrasesWon = game.phraseNumber;
        setShowPhraseDetails(true);
      } else if (game.gameStatus === "lose") {
        toast.error("Has perdido, lo siento");
        phrasesLost = game.phraseNumber;
      }
      const gameData = {
        gameResultNotification: true,
      };

      dispatch(updateGameData(gameId, gameData));
      if (phrasesWon) {
        updateUserData(userId, gameId, { phrasesWon });
      } else {
        updateUserData(userId, gameId, { phrasesLost });
      }
      localStorage.setItem("myLettersList", "");
    }
  }, [game.gameStatus]);

  useEffect(() => {
    // Lógica para mostrar el modal en casos específicos
    const now = new Date();
    const isChristmas = now.getDate() === 6 && now.getMonth() === 0 && now.getHours >= 7;

    if (isChristmas) {
      setModalConfig({
        title: "¡Pistas gratis el Día de Reyes!",
        message: "🎄🎁 Los Reyes te han traído todas las pistas gratis en la Cita de hoy. ¡Disfrútalas! 🎄🎁",
      });
      setInfoModalOpen(true);
    } else if (hasPlayingStrikeBonus && game.isDailyPhrase) {
      setModalConfig({
        title: "¡Bonificación de racha de juego!",
        message: "🔥 Por tus diez citas consecutivas jugadas tienes las pistas de Actor y Director sin coste en la Cita de hoy. ¡Enhorabuena!  🔥",
      });
      setInfoModalOpen(true);
    } else if (hasWinningStrikeBonus && game.isDailyPhrase) {
      setModalConfig({
        title: "¡Bonificación de racha de victorias!",
        message: "🏆 Por tus diez victorias consecutivas tienes todas las pistas gratis en la Cita de hoy. ¡Enhorabuena!  🏆",
      });
      setInfoModalOpen(true);
    }
  }, [hasPlayingStrikeBonus, hasWinningStrikeBonus, game.isDailyPhrase]);

  const handleShowDetails = async () => {
    if (game.gameStatus === "lose" && !game.hasBoughtDetails) {
      setShowConfirmationModal(true); // Muestra el modal antes de proceder
      return;
    }
    setShowPhraseDetails(true);
  };

  const confirmShowDetails = async () => {
    try {
      if (game.gameStatus === "lose") {
        const response = await dispatch(buyPhraseDetailsAction(userId));
        console.log(response);
        if (response) {
          toast.error(response);
          dispatch(clearError());
        } else {
        const gameData = {
          hasBoughtDetails: true,
        };
        await dispatch(updateGameData(gameId, gameData)); // Marca la compra en la partida
      
      setShowPhraseDetails(true);}}
    } catch (error) {
      console.error(error);
    } finally {
      setShowConfirmationModal(false); // Cierra el modal
    }
  };

  const cancelShowDetails = () => {
    setShowConfirmationModal(false); // Cierra el modal sin realizar acción
  };
  if (game.loading) {
    return <div className="loader"></div>;
  }

  return (
    <div className="game">
       {/* Modal genérico para mostrar mensajes */}
       <InfoModal
        isOpen={infoModalOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        onClose={() => setInfoModalOpen(false)}
      />
      <div className="words-clues-points-container">
        <div className="words">{wordsToTry} </div>
        <div className="clues-points-container">
          <div className="right-div-container">
            <ShowPoints />{" "}
          </div>{" "}
          {game.gameStatus === "playing" && (
            <div className="clues-container helpers-container">
              <Clues />{" "}
            </div>
          )}
          {game.gameStatus === "playing" && (
            <div className="right-div-container helpers-container">
              <MyLettersList />
            </div>
          )}
          {game.gameStatus != "playing" && (
            <div className="right-div-container">
              <button className="phrase-link" onClick={handleShowDetails}>
                <span>Detalles de la cita</span>{" "}
                {game.gameStatus === "lose" && !game.hasBoughtDetails && (
                  <span className="clue-price show-phrase-price">20</span>
                )}
              </button>
            </div>
          )}
          {/* Modal de Confirmación */}
          {showConfirmationModal && (
            <div className="modal-backdrop">
              <div className="newuser-container">
                <p>¿Quieres ver los detalles de la cita por 20 puntos?</p>
                <div className="modal-buttons">
                  <button onClick={confirmShowDetails}>Sí</button>
                  <button onClick={cancelShowDetails}>No</button>
                </div>
              </div>
            </div>
          )}
          {game.gameStatus != "playing" && (
            <>
              <div className="right-div-container share-text-container">
                <p className="share-text">Compartir resultado:</p>
              </div>
              <ShareButton
                gameStatus={game.gameStatus}
                phraseNumber={game.phraseNumber}
                attempts={game.currentTry}
                maxTries={game.maximumTries}
                points={userPoints}
                ranking={userRanking}
              />
            </>
          )}
        </div>
      </div>

      <div className="phrase-and-button-container">
        <ShowPhrase
          displayPhraseLink={game.gameStatus != "playing"}
          showModal={showPhraseDetails}
          onModalClose={() => setShowPhraseDetails(false)}
        />{" "}
      </div>
      <Keyboard userId={userId} />
    </div>
  );
};
GameComponent.propTypes = {
  oldPhraseNumber: PropTypes.number,
};
export default GameComponent;
