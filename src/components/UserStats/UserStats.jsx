import { useEffect, useState } from "react";
import { getUserStats } from "../../shared/api";
import "./UserStats.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserStatsAction } from "../../redux/user/user.actions";

const UserStats = () => {
  const [userStats, setUserStats] = useState(null);
  const userId = localStorage.getItem("laCitaDelDiaUserId");

  const storedUserStats = useSelector((state) => state.userReducer.userStats);
  const dispatch = useDispatch();
  useEffect(() => {
    const loadUserStats = async () => {
      const statsFromServer = await getUserStats(userId);
      if (storedUserStats === null) {
        setUserStats(statsFromServer);
        // Guardar las estadísticas en el reducer
        dispatch(setUserStatsAction(statsFromServer));
      } else {
        //Compara las stats del server y del reducer y usa las primeras si son distintas
        if (
          JSON.stringify(statsFromServer) !== JSON.stringify(storedUserStats)
        ) {
          setUserStats(statsFromServer);
          dispatch(setUserStatsAction(statsFromServer));
        } else {
          setUserStats(storedUserStats);
        }
      }
    };
    if (userId) loadUserStats();
  }, [userId, storedUserStats, dispatch]);
  if (!userStats) {
    return <div>Loading stats...</div>;
  }
  const totalGames = userStats.wins + userStats.losses;
  const winPercentage =
    totalGames > 0 ? Math.round((userStats.wins / totalGames) * 100) : "0";
  const lossPercentage =
    totalGames > 0 ? Math.round((userStats.losses / totalGames) * 100) : "0";
  return (
    <div className="user-stats">
      <h2>ESTADÍSTICAS</h2>
      {userStats && (
        <div className="stats-container">
          <p className="stats-data">
            <span>{winPercentage}%</span>GANADAS{" "}
          </p>
          <p className="stats-data">
            <span>{lossPercentage}%</span>PERDIDAS{" "}
          </p>
          <p className="stats-data">
            <span>{userStats.playing}</span>JUGANDO
          </p>
          <p className="stats-data">
            <span>
              {userStats.phrasesUntilToday -
                (userStats.wins + userStats.losses) -
                userStats.playing}
            </span>
            NO JUGADA
          </p>
        </div>
      )}
    </div>
  );
};

export default UserStats;
