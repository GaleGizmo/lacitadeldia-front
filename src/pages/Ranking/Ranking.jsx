import { useEffect, useState } from "react";
import { getUserPastPhrases } from "../../shared/api";
import UserStats from "../../components/UserStats/UserStats";
import UserRanking from "../../components/UserRanking/UserRanking";
import Footer from "../../components/Footer/Footer";
import "./Ranking.css";

const Ranking=()=>{
    const playerId = localStorage.getItem("laCitaDelDiaUserId");
    const [percentages, setPercentages]= useState();
    const [phrasesPlaying, setPhrasesPlaying]=useState(0)
    const [notPlayed, setNotPlayed]=useState(0)

     useEffect(() => {
        const fetchPhrases = async (playerId) => {
          const oldPhrases = await getUserPastPhrases(playerId);
          setPercentages(oldPhrases.percentages);
          setPhrasesPlaying(oldPhrases.playing);
          setNotPlayed(oldPhrases.np);
        };
        if (playerId) {
          fetchPhrases(playerId);
        }
      }, [playerId]);

      return (
        <div className="ranking-stats-container">
            <h1>Ranking</h1>
            <UserRanking/>
            <UserStats percentages={percentages} playing={phrasesPlaying} notPlayed={notPlayed}/>
            <Footer/>
        </div>
      );
}

export default Ranking;