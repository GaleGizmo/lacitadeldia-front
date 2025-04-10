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
import {
  getPhraseOfTheDayNumber,
  getUserNotifications,
  markNotificationAsRead,
} from "../../shared/api";
import MyLettersList from "../MyLettersList/MyLettersList";
import {
  buyPhraseDetailsAction,
  updatePlayerStrikeData,
} from "../../redux/user/user.actions";
import { setBonusModalShown, resetBonusModalShown } from "../redux/notifications/notifications.actions";
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
  const [pendingNotifications, setPendingNotifications] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPhraseDetails, setShowPhraseDetails] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [wordsToTry, setWordsToTry] = useState([]);
  const gameId = localStorage.getItem("gameId");
  const phraseNumber = oldPhraseNumber;
  const [isInitialized, setIsInitialized] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({ title: "", message: "" });
  const [currentNotification, setCurrentNotification] = useState(null);
  const bonusModalShown = useSelector(
    (state) => state.notifications.bonusModalShown
  );
  let game = useSelector((state) => state.gameReducer);
  const user = useSelector((state) => state.userReducer);

  useEffect(() => {
    const initializeGame = async () => {
      const phraseOfTheDayNumber = await getPhraseOfTheDayNumber();
      if (phraseOfTheDayNumber != game.phraseNumber) {
        localStorage.removeItem("gameId");
      }
      if (user.userId) {
        dispatch(startGame(user.userId, phraseNumber));
        setIsInitialized(true);
      } else {
        console.error("Error: user.userId no está definido");
      }
    };
    initializeGame();

    localStorage.removeItem("oldPhraseToPlay");
  }, [user.userId]);

  useEffect(() => {
    if (game.error) {
      toast.error(game.error);
      dispatch(clearError());
    }
  }, [game.error]);
  useEffect(() => {
    if (game.isDailyPhrase) {
      dispatch(resetBonusModalShown());
    }
  }, [game.phraseNumber]);
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
        dispatch(updatePlayerStrikeData(user.userId, gameId, { phrasesWon }));
      } else {
        dispatch(updatePlayerStrikeData(user.userId, gameId, { phrasesLost }));
      }
      localStorage.setItem("myLettersList", "");
    }
  }, [game.gameStatus]);

  useEffect(() => {
    // Lógica para mostrar el modal en el momento que completan la racha
    if (bonusModalShown) return;
    if (!game.isDailyPhrase) return;
   
     showInfoModal();

    function showInfoModal() {
      if (user.playingStrike === 7 && user.winningStrike !== 7) {
        setModalConfig({
          title: "¡Bonificación de partidas!",
          message: `🔥 Por tus siete citas consecutivas jugadas tendrás tres pistas gratis en la siguiente Cita del Día. ¡Enhorabuena! 🔥`,
        });
        setInfoModalOpen(true);
       dispatch(setBonusModalShown(true));
      } else if (user.winningStrike === 7) {
        setModalConfig({
          title: "¡Bonificación de victorias!",
          message:
            "🏆 Por sumar siete Citas acertadas tendrás todas las pistas gratis en la siguiente Cita del Día. ¡Enhorabuena!  🏆",
        });
        setInfoModalOpen(true);
       dispatch(setBonusModalShown(true));
      }
    }
  }, [user.playingStrike, user.winningStrike]);

  useEffect(() => {
    if (!user.userId) return;

    const checkNotifications = async () => {
      const notifications = await getUserNotifications(user.userId);

      if (notifications.length > 0) {
        setPendingNotifications(notifications);
        setCurrentIndex(0);
        setModalConfig({
          title: notifications[0].title,
          message: notifications[0].message,
        });
        setCurrentNotification(notifications[0]);
        setInfoModalOpen(true);
        
      }
    };

    checkNotifications();
  }, [user.userId]);

  const handleCloseInfoModal = async () => {
    const nextIndex = currentIndex + 1;

    // Marca como leída la notificación actual
    if (currentNotification){
    await markNotificationAsRead( user.userId, currentNotification._id);}

    if (nextIndex < pendingNotifications.length) {
      const nextNotif = pendingNotifications[nextIndex];
      setCurrentIndex(nextIndex);
      setCurrentNotification(nextNotif);
      setModalConfig({
        title: nextNotif.title,
        message: nextNotif.message,
      });
      // El modal sigue abierto, solo cambia el contenido
    } else {
      // Ya no hay más notificaciones
      setInfoModalOpen(false);
      setPendingNotifications([]);
      setCurrentIndex(0);
    }
  };

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
        const response = await dispatch(buyPhraseDetailsAction(user.userId));
        console.log(response);
        if (response) {
          toast.error(response);
          dispatch(clearError());
        } else {
          const gameData = {
            hasBoughtDetails: true,
          };
          await dispatch(updateGameData(gameId, gameData)); // Marca la compra en la partida

          setShowPhraseDetails(true);
        }
      }
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
        onClose={handleCloseInfoModal}
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
                  <span className="clue-price show-phrase-price">5</span>
                )}
              </button>
            </div>
          )}
          {/* Modal de Confirmación */}
          {showConfirmationModal && (
            <div className="modal-backdrop">
              <div className="newuser-container">
                <p>¿Quieres ver los detalles de la cita por 5 puntos?</p>
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
                points={user.userPoints}
                ranking={user.userRanking}
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
      <Keyboard userId={user.userId} />
    </div>
  );
};
GameComponent.propTypes = {
  oldPhraseNumber: PropTypes.number,
};
export default GameComponent;
