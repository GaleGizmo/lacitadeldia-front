import { useEffect, useState } from "react";
import "./oldGames.css";
import { getUserPastPhrases } from "../../shared/api";
import { useNavigate } from "react-router-dom";

const OldGames = () => {
  const playerId = localStorage.getItem("userUUID");
  const [phrasesToShow, setPhrasesToShow] = useState({});
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
  return (
    <div className="oldgames">
      {Object.entries(phrasesToShow).map(([number, status]) => (
        <div
          key={number}
          className={`phrase-box ${status}`}
          onClick={()=>handleNavigate(number)}
        >
          {number}
        </div>
      ))}
    </div>
  );
};

export default OldGames;
