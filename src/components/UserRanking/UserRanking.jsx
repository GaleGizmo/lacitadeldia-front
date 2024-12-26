import { useSelector } from "react-redux";
import { getUserRanking } from "../../shared/api";
import "./UserRanking.css";
import { useEffect, useState } from "react";

const UserRanking = () => {
  const userId = localStorage.getItem("laCitaDelDiaUserId");
  const { userPoints } = useSelector((state) => state.userReducer);
  const [podiumScores, setPodiumScores] = useState([]);
  const [userRanking, setUserRanking] = useState(0);
  const [previousUserScore, sePreviousUserscore] = useState(0);
  const [nextUserScore, setNextUserscore] = useState(0);
  useEffect(() => {
    const fetchScores = async () => {
      const scores = await getUserRanking(userId);
      setPodiumScores(scores.podiumScores);
      setUserRanking(scores.ranking);
      setNextUserscore(scores.nextUser);
      sePreviousUserscore(scores.previousUser);
      console.log(scores.podiumScores);
    };
    if (userId) {
      fetchScores();
    }
  }, [userId]);

  return (
    <div className="user-stats user-ranking">
      <div className="top-three-container">
        <h2>TOP 3</h2>
        <ul className="top-three">
          {podiumScores.map((userScore, index) => (
            <li className="top-three_element" key={index}>
              <img src={`assets/rank${index + 1}.gif`}></img>
              <span className="user-points">{userScore}</span>
            </li>
          ))}
        </ul>{" "}
      </div>
      <div>
        <h2>MI POSICIÓN</h2>

        {userRanking!=1 ? ( <div className="rank rank-on-stats rank-close rank-medium">
          <><span className="close-ranking">{userRanking - 1}</span>
          <span className="close-points">{previousUserScore}</span></>
        </div>):"👏👏🎉🎉🥳🥳"}

        <div className="rank rank-on-stats rank-self">
          <span className="actual-ranking">{userRanking}</span>{" "}
          <span className="actual-points">{userPoints}</span>
        </div>

        <div className="rank rank-on-stats rank-close rank-medium">
          <span className="close-ranking">{userRanking +1}</span>
          <span className="close-points">{nextUserScore}</span>
        </div>
      </div>
    </div>
  );
};
export default UserRanking;
