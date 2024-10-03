import { useEffect, useState } from "react";
import "./oldGames.css";
import { getUserPastPhrases } from "../../shared/api";
import { useNavigate } from "react-router-dom";
import UserStats from "../../components/UserStats/UserStats";

const OldGames = () => {
  const playerId = localStorage.getItem("laCitaDelDiaUserId");
  const [percentages, setPercentages]= useState();
  const [phrasesPlaying, setPhrasesPlaying]=useState(0)
  const [notPlayed, setNotPlayed]=useState(0)
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
    
      setPhrasesToShow(oldPhrases.result);
      setPercentages(oldPhrases.percentages);
      setPhrasesPlaying(oldPhrases.playing);
      setNotPlayed(oldPhrases.np);
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
    <div className="oldgames-stats-container">
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
      <UserStats percentages={percentages} playing={phrasesPlaying} notPlayed={notPlayed}/>
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
    </div>
  );
};

export default OldGames;
