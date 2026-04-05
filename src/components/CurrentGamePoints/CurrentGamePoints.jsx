import { useSelector } from "react-redux";
import "./CurrentGamePoints.css";

const CurrentGamePoints = () => {
  const earnedPoints = useSelector((state) => state.gameReducer.earnedPoints);

  return (
    <div className="current-game-points right-div-container">
      <span className="current-game-points__label">PUNTOS GANADOS:</span>
      <span className="current-game-points__value">{earnedPoints}</span>
    </div>
  );
};

export default CurrentGamePoints;
