import "./ShowPoints.css";
import { useEffect, useState } from "react";
import { getUserPoints } from "../../shared/api";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { setUserPointsAction, setUserRankingAction } from "../../redux/user/user.actions";

const ShowPoints = () => {
  const userId = localStorage.getItem("laCitaDelDiaUserId");
  const [userPoints, setUserPoints] = useState(0);
  const [userRanking, setUserRanking] = useState(0);
  const [rankingContent, setRankingContent] = useState("");
  const { clues } = useSelector((state) => state.gameReducer);
  const dispatch=useDispatch();

  useEffect(() => {
    let isMounted = true; // Variable de bandera para rastrear si el componente está montado

    const fetchUserPoints = async () => {
      try {
        if (userId) {
          const data = await getUserPoints(userId);
          if (isMounted) {
            // Solo actualiza el estado si el componente está montado
            console.log(data);
            setUserPoints(data.points);
            setUserRanking(data.ranking);
            dispatch(setUserPointsAction(data.points))
            dispatch(setUserRankingAction(data.ranking));
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserPoints();

    return () => {
      isMounted = false; // Actualiza la bandera cuando el componente se desmonta
    };
  }, [userId, clues, dispatch]);
  useEffect(() =>{
  switch (userRanking) {
    case  1:
      setRankingContent(<img src="assets/rank1.gif"></img>);
      break;
    case  2:
      setRankingContent(<img src="assets/rank2.gif"></img>);
      break;
    case  3:
      setRankingContent(<img src="assets/rank3.gif"></img>);
      break;
    
    default:
      setRankingContent(userRanking > 3 ? userRanking : "N/A");
      break;
  }
},[userRanking])

 // Clase condicional basada en el valor de userRanking
  const rankingClass = userRanking > 3 && userRanking <= 10 ? "rank-medium" : userRanking > 10 && userRanking <50 ? "rank-low" : "";
  return (
    <div className="points-ranking-container">
      
        <p className="ranking">
        <img
            src="assets/points.png"
            alt="Points"
           
           
            width={30}
            height={30}
          /> {userPoints && (<span className="points">{userPoints}</span>)}
        </p>
        <p className="ranking"> <img
            src="assets/ranking.png"
            alt="Points"
           
           
            width={30}
            height={30}
          />
         {userRanking && ( <span className={`rank-data ${rankingClass}`} > {rankingContent} </span>)}
        </p>
    </div>
  );
};

export default ShowPoints;
