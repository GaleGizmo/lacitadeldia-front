import { useEffect, useState } from "react";
import "./oldGames.css";
import { getUserPastPhrases } from "../../shared/api";
import { useNavigate } from "react-router-dom";
import UserStats from "../../components/UserStats/UserStats";

const OldGames = () => {
  const playerId = localStorage.getItem("laCitaDelDiaUserId");
  const [phrasesToShow, setPhrasesToShow] = useState(null);
  const navigate = useNavigate();
  const handleNavigate = (phraseToPlay) => {
    localStorage.setItem("oldPhraseToPlay", phraseToPlay);
    localStorage.removeItem("gameId");
    localStorage.removeItem("activeGame");
    navigate("/game");
  };
  useEffect(() => {
    const fetchPhrases = async (playerId) => {
      const oldPhrases = await getUserPastPhrases(playerId);
    
      setPhrasesToShow(oldPhrases);
    };
    if (playerId) {
      fetchPhrases(playerId);
    }
  }, [playerId]);

  if (phrasesToShow === null) {
    return <div className="loader"></div>;
  }
  if (phrasesToShow.message){
    return <div className="consumed-message"><h3>{phrasesToShow.message}</h3></div>
  }
  return (
    <>
      <div className="oldgames">
        {Object.entries(phrasesToShow).map(([number, status]) => (
          <div
            key={number}
            className={`phrase-box ${status}`}
            onClick={() => handleNavigate(number)}
          >
            {number}
          </div>
        ))}
       
      </div>
      <UserStats />
      <footer className="color-codes">
        <div className="phrase-box win footer-box"></div>
        <small>GANADA</small>
        <div className="phrase-box lose footer-box"></div>
        <small>PERDIDA</small>
        <div className="phrase-box np footer-box"></div>
        <small>NO JUGADA</small>
        <div className="phrase-box playing footer-box"></div>
        <small>JUGANDO</small>
      </footer>
    </>
  );
};

export default OldGames;
